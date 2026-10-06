// Purely decorative background: a faint graph, bar silhouettes and floating CS notation
const NODES = [[40, 60], [130, 30], [150, 120], [250, 70], [230, 170], [330, 130], [90, 200]];
const EDGES = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [2, 6], [4, 5]];
const BARS = [50, 90, 70, 120, 40, 100, 80, 140, 60];
const TOKENS = [['O(n log n)', 6, 20], ['[ 2 | 5 | 8 ]', 66, 10], ['A → B → C', 10, 64], ['mid = ⌊(l + r) / 2⌋', 58, 82],
  ['swap(a, b)', 84, 46], ['O(1)', 42, 93], ['queue', 24, 40], ['i++', 92, 88], ['visited = {A}', 36, 8]];

export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <svg className="net" viewBox="0 0 400 260">
        {EDGES.map(([a, b]) => <line key={a + '-' + b} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />)}
        {NODES.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="9" />)}
      </svg>
      <svg className="silh" viewBox="0 0 360 160">
        {BARS.map((h, i) => <rect key={i} x={i * 40} y={160 - h} width="30" height={h} className={i % 3 === 0 ? 'g' : ''} />)}
      </svg>
      {TOKENS.map(([t, x, y], i) => <span key={t} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `-${i * 2.3}s` }}>{t}</span>)}
    </div>
  );
}
