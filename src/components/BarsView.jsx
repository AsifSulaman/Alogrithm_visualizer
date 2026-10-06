const TAG = { swap: '⇄', compare: '?', marked: '●', sorted: '✓', '': '' };

export default function BarsView({ frame, done }) {
  const { values, active, marked, sorted, swap } = frame;
  const max = Math.max(...values);
  return (
    <div className={`bars${done ? ' done' : ''}`} role="img" aria-label={`Bars with values ${values.join(', ')}`}>
      {values.map((v, i) => {
        // The symbol under each bar repeats the state, so colour is never the only cue
        const state = active.includes(i) ? (swap ? 'swap' : 'compare')
          : marked.includes(i) ? 'marked' : sorted.includes(i) ? 'sorted' : '';
        return (
          <div className="col" key={i} style={{ '--i': i }}>
            <div className="barwrap"><div className={`bar ${state}`} style={{ height: `${(v / max) * 100}%` }} /></div>
            <span className="val">{v}</span>
            <span className="tag">{TAG[state]}</span>
          </div>
        );
      })}
    </div>
  );
}
