export function* bfs(graph, start = 'A') {
  const visited = [start], queue = [start], order = [];
  const frame = (current, edge, msg, finished = false) =>
    ({ current, edge, visited: [...visited], order: [...order], structure: [...queue], msg, finished });

  yield frame(null, null, `Mark ${start} as visited and add it to the queue`);
  while (queue.length > 0) {
    const u = queue.shift();           // front of the queue = oldest discovered node
    order.push(u);
    yield frame(u, null, `Remove ${u} from the front of the queue and explore its neighbours`);
    for (const v of graph.adj[u]) {
      if (visited.includes(v)) {
        yield frame(u, [u, v], `${v} was already visited → skip`);
      } else {
        visited.push(v);
        queue.push(v);                 // new nodes go to the back
        yield frame(u, [u, v], `${v} is new → mark visited and add to the back of the queue`);
      }
    }
  }
  yield frame(null, null, 'Queue is empty → traversal complete', true);
}
