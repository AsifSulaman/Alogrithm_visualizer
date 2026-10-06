// Fixed node positions (SVG coordinates); only the edges change between graphs.
export const POS = { A: [170, 40], B: [90, 140], C: [250, 140], D: [40, 240], E: [140, 240], F: [250, 240] };
const NAMES = Object.keys(POS);

function build(edges) {
  const adj = Object.fromEntries(NAMES.map(n => [n, []]));
  for (const [a, b] of edges) { adj[a].push(b); adj[b].push(a); }
  NAMES.forEach(n => adj[n].sort()); // alphabetical neighbour order → predictable traversal
  return { edges, adj };
}

export const defaultGraph = () =>
  build([['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F']]);

// Random connected graph: each node links to an earlier node, plus up to 2 extra edges (cycles)
export function makeGraph() {
  const edges = [];
  const has = (a, b) => edges.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  for (let i = 1; i < NAMES.length; i++)
    edges.push([NAMES[Math.floor(Math.random() * i)], NAMES[i]]);
  for (let k = 0; k < 2; k++) {
    const a = NAMES[Math.floor(Math.random() * 6)], b = NAMES[Math.floor(Math.random() * 6)];
    if (a !== b && !has(a, b)) edges.push([a, b]);
  }
  return build(edges);
}
