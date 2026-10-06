export default function SearchView({ frame }) {
  const { values, left, right, mid, target, found } = frame;
  return (
    <div>
      <p className="target">Target: <strong>{target}</strong></p>
      <div className="cells" role="img" aria-label={`Sorted array ${values.join(', ')}`}>
        {values.map((v, i) => {
          const out = i < left || i > right;
          const cls = i === found ? 'found' : out ? 'out' : i === mid ? 'mid' : '';
          const ptr = [i === left && 'L', i === mid && 'M', i === right && 'R'].filter(Boolean).join(' ');
          return (
            <div className={`cell ${cls}`} key={i}>
              <b>{v}</b><small>{i}</small><span className="ptr">{ptr}</span>
            </div>
          );
        })}
      </div>
      <p className="muted">L = left, M = middle, R = right pointer. Struck-through cells are eliminated.</p>
    </div>
  );
}
