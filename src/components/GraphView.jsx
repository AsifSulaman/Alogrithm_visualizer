import { POS } from '../algorithms/graph.js';

export default function GraphView({ graph, frame, start, onPick }) {
  const isActive = (a, b) => frame.edge &&
    ((frame.edge[0] === a && frame.edge[1] === b) || (frame.edge[0] === b && frame.edge[1] === a));
  return (
    <svg viewBox="0 0 290 280" role="group" aria-label="Graph with nodes A to F. Select a node to start from it.">
      {graph.edges.map(([a, b]) => (
        <line key={a + b} className={isActive(a, b) ? 'edge on' : 'edge'}
          x1={POS[a][0]} y1={POS[a][1]} x2={POS[b][0]} y2={POS[b][1]} />
      ))}
      {Object.entries(POS).map(([name, [x, y]]) => {
        const cls = name === frame.current ? 'current' : frame.visited.includes(name) ? 'visited' : '';
        return (
          <g key={name} className={`node ${cls}`} role="button" tabIndex={0} aria-label={`Start from ${name}`}
            onClick={() => onPick(name)} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onPick(name)}>
            <circle cx={x} cy={y} r="20" />
            <text x={x} y={y} dy=".35em">{name}</text>
            {name === start && <text className="startlbl" x={x} y={y + 34}>start</text>}
          </g>
        );
      })}
    </svg>
  );
}
