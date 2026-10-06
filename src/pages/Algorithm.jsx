import { useState, useEffect, useRef } from 'react';
import { ALGORITHMS } from '../data/algorithms.js';
import { QUIZ } from '../data/quizzes.js';
import { defaultGraph, makeGraph } from '../algorithms/graph.js';
import BarsView from '../components/BarsView.jsx';
import SearchView from '../components/SearchView.jsx';
import GraphView from '../components/GraphView.jsx';
import Quiz from '../components/Quiz.jsx';

// [css class, symbol, label]
const legends = {
  sort: [['', '·', 'Unsorted'], ['compare', '?', 'Comparing'], ['swap', '⇄', 'Swapped'], ['marked', '●', 'Selected (minimum)'], ['sorted', '✓', 'Sorted region']],
  search: [['', '', 'In range'], ['out', '', 'Eliminated'], ['mid', 'M', 'Middle'], ['found', '', 'Found']],
  graph: [['', '', 'Unvisited (dashed)'], ['visited', '', 'Visited'], ['current', '', 'Current node'], ['edge', '', 'Edge being explored']],
};

const inputError = 'Enter 2 to 20 whole numbers between 1 and 99, separated by commas.';

function sortNumbers(list) {
  return [...list].sort((a, b) => a - b);
}

function shuffle(list) {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function readNumbers(text) {
  const numbers = text.split(/[\s,]+/).filter(Boolean).map(Number);
  const ok = numbers.length >= 2 && numbers.length <= 20 &&
    numbers.every(n => Number.isInteger(n) && n >= 1 && n <= 99);
  return ok ? numbers : null;
}

export default function Algorithm({ id }) {
  const info = ALGORITHMS[id];
  const kind = info.kind;

  const [data, setData] = useState(() => {
    if (kind === 'sort') return [38, 12, 45, 7, 29, 51, 3, 22, 60, 17];
    if (kind === 'search') return { values: [2, 5, 8, 12, 17, 21, 29], target: 21 };
    return defaultGraph();
  });
  const [text, setText] = useState(kind === 'sort' ? data.join(', ') : kind === 'search' ? data.values.join(', ') : '');
  const [targetText, setTargetText] = useState('21');
  const [error, setError] = useState('');
  const [start, setStart] = useState('A');
  const [speed, setSpeed] = useState(5);

  const [frame, setFrame] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const generator = useRef(null);

  function reset() {
    generator.current = info.run(data, start);
    setFrame(null);
    setPlaying(false);
    setDone(false);
  }

  function step() {
    const { value } = generator.current.next();
    setFrame(value);
    if (value.finished) {
      setDone(true);
      setPlaying(false);
    }
  }

  function replay() {
    reset();
    setPlaying(true);
  }

  // start over whenever the data (or the graph's start node) changes
  useEffect(reset, [data, start]);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(step, 1100 - speed * 100);
    return () => clearInterval(timer);
  }, [playing, speed]);

  function loadList(numbers) {
    setData(numbers);
    setText(numbers.join(', '));
    setError('');
  }

  function nearlySorted() {
    const numbers = sortNumbers(data);
    const i = Math.floor(Math.random() * (numbers.length - 1));
    [numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]];
    loadList(numbers);
  }

  function newSearchArray() {
    const values = [];
    while (values.length < 9) {
      const n = 1 + Math.floor(Math.random() * 99);
      if (!values.includes(n)) values.push(n);
    }
    values.sort((a, b) => a - b);
    const target = values[Math.floor(Math.random() * values.length)];
    setData({ values, target });
    setText(values.join(', '));
    setTargetText(String(target));
    setError('');
  }

  function applyInput(e) {
    e.preventDefault();
    const numbers = readNumbers(text);
    if (!numbers) {
      setError(inputError);
      return;
    }
    if (kind === 'sort') {
      loadList(numbers);
      return;
    }
    const target = Number(targetText);
    if (targetText.trim() === '' || !Number.isInteger(target)) {
      setError('Target must be a whole number.');
      return;
    }
    const values = sortNumbers(numbers); // binary search needs sorted data
    setText(values.join(', '));
    setData({ values, target });
    setError('');
  }

  // what to draw before the first step
  let current = frame;
  if (!current && kind === 'sort') {
    current = { values: data, active: [], marked: [], sorted: [], comparisons: 0, swaps: 0 };
  } else if (!current && kind === 'search') {
    current = { values: data.values, left: 0, right: data.values.length - 1, mid: -1, target: data.target, found: -1, checks: 0 };
  } else if (!current) {
    current = { current: null, edge: null, visited: [], order: [], structure: [] };
  }

  return (
    <main className="wrap">
      <p className="muted"><a href="#/algorithms">Algorithms</a> / {info.category}</p>
      <h1>{info.title}</h1>
      <p className="lede">{info.summary}</p>

      <section className="explain card">
        <div>
          <h2>What it does</h2>
          <p>{info.what}</p>
          {info.note && <p className="callout">{info.note}</p>}
        </div>
        <div>
          <h2>How it works</h2>
          <ol>{info.steps.map(s => <li key={s}>{s}</li>)}</ol>
        </div>
      </section>

      <section className="viz" aria-label="Visualization">
        {kind === 'sort' && (
          <p className="stats"><span>Comparisons <b>{current.comparisons}</b></span><span>Swaps <b>{current.swaps}</b></span></p>
        )}
        {kind === 'search' && (
          <p className="stats">
            <span>Middle checks <b>{current.checks}</b></span>
            <span>Most needed for {data.values.length} values <b>{Math.floor(Math.log2(data.values.length)) + 1}</b></span>
          </p>
        )}

        {kind === 'sort' && <BarsView frame={current} done={done} />}
        {kind === 'search' && <SearchView frame={current} />}
        {kind === 'graph' && (
          <>
            <GraphView graph={data} frame={current} start={start} onPick={setStart} />
            <div className="state">
              <p className="muted">Click a node to choose where {id.toUpperCase()} starts.</p>
              <p><strong>{info.structureLabel}:</strong> [{current.structure.join(', ')}]</p>
              <p><strong>{id.toUpperCase()} order:</strong> {current.order.length ? current.order.join(' → ') : '—'}</p>
            </div>
          </>
        )}

        <ul className="legend" aria-label="Legend">
          {legends[kind].map(([cls, symbol, label]) => (
            <li key={label}><span className={`sw ${kind} ${cls}`} aria-hidden="true">{symbol}</span>{label}</li>
          ))}
        </ul>
      </section>

      <div className="controls">
        {kind === 'sort' && (
          <>
            <button className="btn" onClick={() => loadList(shuffle(data))}>Shuffle</button>
            <button className="btn" onClick={nearlySorted}>Nearly sorted</button>
            <button className="btn" onClick={() => loadList(sortNumbers(data).reverse())}>Reversed</button>
          </>
        )}
        {kind === 'search' && <button className="btn" onClick={newSearchArray}>New array</button>}
        {kind === 'graph' && <button className="btn" onClick={() => setData(makeGraph())}>New graph</button>}

        <button className="btn primary" onClick={done ? replay : () => setPlaying(!playing)}>
          {playing ? 'Pause' : done ? 'Replay' : 'Start'}
        </button>
        <button className="btn" onClick={step} disabled={done || playing}>Step</button>
        <button className="btn" onClick={reset}>Reset</button>
        <label className="speed">Speed
          <input type="range" min="1" max="10" value={speed} onChange={e => setSpeed(Number(e.target.value))} />
        </label>
      </div>

      {kind !== 'graph' && (
        <form className="input" onSubmit={applyInput}>
          <label>Values <input value={text} onChange={e => setText(e.target.value)} placeholder="8, 3, 6, 1, 9, 2" /></label>
          {kind === 'search' && (
            <label>Target <input className="short" value={targetText} onChange={e => setTargetText(e.target.value)} inputMode="numeric" /></label>
          )}
          <button className="btn" type="submit">Apply</button>
          {kind === 'search' && <span className="muted">Values are sorted automatically.</span>}
          {error && <p role="alert" className="error">{error}</p>}
        </form>
      )}

      <p className="step" aria-live="polite">
        <strong>Current step</strong>
        {frame ? frame.msg : 'Press Start, or Step to go one operation at a time.'}
      </p>

      <div className="cols">
        <section>
          <h2>Pseudocode</h2>
          <pre><code>{info.pseudo}</code></pre>
        </section>
        <section>
          <h2>Complexity</h2>
          <table>
            <tbody>
              <tr><th scope="row">Time · Best</th><td>{info.time.best}</td></tr>
              <tr><th scope="row">Time · Average</th><td>{info.time.avg}</td></tr>
              <tr><th scope="row">Time · Worst</th><td>{info.time.worst}</td></tr>
              <tr><th scope="row">Space</th><td>{info.space}</td></tr>
            </tbody>
          </table>
          <p className="muted">{info.timeNote}</p>
        </section>
      </div>

      <Quiz quiz={QUIZ[id]} />
    </main>
  );
}
