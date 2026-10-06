import { ALGORITHMS } from '../data/algorithms.js';

export function Catalog() {
  const categories = [...new Set(Object.values(ALGORITHMS).map(a => a.category))];
  return (
    <div>
      {categories.map(category => (
        <section key={category} className="group">
          <h2>{category}</h2>
          <ul className="cards">
            {Object.entries(ALGORITHMS).filter(([, a]) => a.category === category).map(([id, a]) => (
              <li key={id}><a href={`#/algorithm/${id}`}><strong>{a.title}</strong><span>{a.summary}</span></a></li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

// small picture of a sort in progress, using the same colours as the visualizer
const bars = [[30, 'ok'], [48, 'ok'], [66, 'ok'], [110, 's'], [72, 's'], [96, 'c'], [54, '']];

export default function Home() {
  return (
    <main className="wrap">
      <div className="heroBox">
        <div>
          <h1 className="hero">Understand algorithms by watching them work.</h1>
          <p className="lede">Explore sorting, searching, and graph traversal through interactive visualizations.</p>
        </div>
        <svg className="heroart" viewBox="0 0 220 160" aria-hidden="true">
          {bars.map(([height, state], i) => (
            <rect key={i} x={8 + i * 30} y={150 - height} width="20" height={height} className={state} />
          ))}
          <line x1="0" y1="152" x2="220" y2="152" stroke="#1d2129" strokeWidth="2" />
        </svg>
      </div>
      <Catalog />
    </main>
  );
}
