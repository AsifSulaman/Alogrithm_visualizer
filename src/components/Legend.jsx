const ITEMS = {
  sort: [['', '·', 'Unsorted'], ['compare', '?', 'Comparing'], ['swap', '⇄', 'Swapped'], ['marked', '●', 'Selected (minimum)'], ['sorted', '✓', 'Sorted region']],
  search: [['', '', 'In range'], ['out', '', 'Eliminated'], ['mid', 'M', 'Middle'], ['found', '', 'Found']],
  graph: [['', '', 'Unvisited (dashed)'], ['visited', '', 'Visited'], ['current', '', 'Current node'], ['edge', '', 'Edge being explored']],
};
export default function Legend({ kind }) {
  return (
    <ul className="legend" aria-label="Legend">
      {ITEMS[kind].map(([cls, tag, label]) =>
        <li key={label}><span className={`sw ${kind} ${cls}`} aria-hidden="true">{tag}</span>{label}</li>)}
    </ul>
  );
}
