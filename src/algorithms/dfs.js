// Recursive DFS written as a generator; the "stack" shown is the recursion call stack.
export function* dfs(graph, start = 'A') {
  const visited = [], order = [], stack = [];
  const frame = (current, edge, msg, finished = false) =>
    ({ current, edge, visited: [...visited], order: [...order], structure: [...stack], msg, finished });

  function* visit(u, from) {
    visited.push(u); order.push(u); stack.push(u);
    yield frame(u, from ? [from, u] : null, `Visit ${u} (call DFS(${u}))`);
    for (const v of graph.adj[u]) {
      if (visited.includes(v)) {
        yield frame(u, [u, v], v === from ? `${v} is where we came from → skip` : `${v} was already visited → skip`);
      } else {
        yield frame(u, [u, v], `Go deeper along edge ${u}–${v}`);
        yield* visit(v, u);
        yield frame(u, null, `Backtrack to ${u}`);
      }
    }
    stack.pop();
  }
  yield* visit(start, null);
  yield frame(null, null, 'Every reachable node has been visited', true);
}
