import { bubbleSort } from '../algorithms/bubbleSort.js';
import { selectionSort } from '../algorithms/selectionSort.js';
import { insertionSort } from '../algorithms/insertionSort.js';
import { binarySearch } from '../algorithms/binarySearch.js';
import { bfs } from '../algorithms/bfs.js';
import { dfs } from '../algorithms/dfs.js';

const n2 = { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)' };
const VE = { best: 'O(V + E)', avg: 'O(V + E)', worst: 'O(V + E)' };

export const ALGORITHMS = {
  'bubble-sort': {
    title: 'Bubble Sort', category: 'Sorting', kind: 'sort', run: bubbleSort,
    summary: 'Compare adjacent values and repeatedly move the largest unsorted value toward the end.',
    what: 'Bubble Sort walks through an array and compares each pair of neighbouring values, swapping them if they are in the wrong order. After each full pass, the largest remaining value has "bubbled" to the end of the array.',
    steps: ['Compare the first two values; swap them if the left one is larger.', 'Move one position right and repeat until the end of the unsorted part.', 'The last value of that pass is now in its final position.', 'Repeat on the shorter unsorted part. Stop when a pass makes no swaps.'],
    time: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)' }, space: 'O(1)',
    timeNote: 'Best case O(n) assumes the early-exit check (stop if a pass has no swaps) on already sorted input.',
    pseudo: `for pass = 0 to n-2:
  swapped = false
  for i = 0 to n-2-pass:
    if A[i] > A[i+1]:
      swap A[i], A[i+1]
      swapped = true
  if not swapped: stop`,
  },
  'selection-sort': {
    title: 'Selection Sort', category: 'Sorting', kind: 'sort', run: selectionSort,
    summary: 'Repeatedly select the smallest unsorted value and place it at the front.',
    what: 'Selection Sort splits the array into a sorted part (on the left) and an unsorted part. Each pass scans the unsorted part to find its minimum, then swaps that minimum into the first unsorted position. It makes at most n − 1 swaps.',
    steps: ['Assume the first unsorted value is the minimum.', 'Scan the rest of the unsorted part; update the minimum whenever a smaller value is found.', 'Swap the minimum with the first unsorted position.', 'Grow the sorted part by one and repeat.'],
    time: n2, space: 'O(1)',
    timeNote: 'It always scans the whole unsorted part, so even sorted input costs O(n²) comparisons.',
    pseudo: `for i = 0 to n-2:
  min = i
  for j = i+1 to n-1:
    if A[j] < A[min]: min = j
  swap A[i], A[min]`,
  },
  'insertion-sort': {
    title: 'Insertion Sort', category: 'Sorting', kind: 'sort', run: insertionSort,
    summary: 'Grow a sorted section by inserting each new value into its correct place.',
    what: 'Insertion Sort works like sorting playing cards in your hand. The left part of the array is always sorted; each new value is moved left until it sits in the right place. It is efficient on arrays that are already nearly sorted.',
    steps: ['Treat the first value as a sorted section of length 1.', 'Take the next value and compare it with the value on its left.', 'While the left value is larger, swap them (the value moves left).', 'Stop when the left value is smaller or the front is reached; repeat for the next value.'],
    time: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)' }, space: 'O(1)',
    timeNote: 'Best case O(n) happens on already sorted input; worst case is reverse-sorted input.',
    pseudo: `for i = 1 to n-1:
  j = i
  while j > 0 and A[j-1] > A[j]:
    swap A[j-1], A[j]
    j = j - 1`,
  },
  'binary-search': {
    title: 'Binary Search', category: 'Searching', kind: 'search', run: d => binarySearch(d.values, d.target),
    summary: 'Find a value in a sorted array by repeatedly halving the search space.',
    what: 'Binary Search checks the middle element of a sorted array. If it is not the target, the comparison tells us which half the target can be in, so the other half is discarded. Each step halves the remaining range.',
    steps: ['Set left = 0 and right = last index.', 'Compute mid, the middle index of left..right.', 'If A[mid] equals the target, return mid.', 'If A[mid] is smaller, set left = mid + 1; otherwise set right = mid − 1.', 'Repeat while left ≤ right; if the range is empty, the target is absent.'],
    time: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' }, space: 'O(1)',
    timeNote: 'Space is O(1) for this iterative version (a recursive version uses O(log n) stack space).',
    note: 'Why sorted data? Discarding half the array is only valid because everything left of the middle is ≤ it and everything right is ≥ it. On unsorted data that guarantee does not hold, so the target could be in the half we threw away.',
    pseudo: `left = 0; right = n-1
while left <= right:
  mid = floor((left + right) / 2)
  if A[mid] == target: return mid
  if A[mid] < target: left = mid + 1
  else: right = mid - 1
return not found`,
  },
  bfs: {
    title: 'Breadth-First Search', category: 'Graph traversal', kind: 'graph', run: bfs,
    structureLabel: 'Queue (front → back)',
    summary: 'Explore a graph level by level, visiting all neighbours before going deeper.',
    what: 'BFS starts at a node and visits all of its neighbours, then all of their unvisited neighbours, and so on. A queue (first in, first out) holds the nodes waiting to be explored, so closer nodes are always processed before farther ones.',
    steps: ['Mark the start node visited and put it in the queue.', 'Remove the node at the front of the queue.', 'For each unvisited neighbour: mark it visited and add it to the back of the queue.', 'Repeat until the queue is empty.'],
    time: VE, space: 'O(V)',
    timeNote: 'V = number of nodes, E = number of edges, using an adjacency list. BFS finds shortest paths in unweighted graphs.',
    note: 'BFS → explores level by level, using a Queue.',
    pseudo: `BFS(start):
  mark start visited; enqueue start
  while queue is not empty:
    u = dequeue
    for each neighbour v of u:
      if v not visited:
        mark v visited; enqueue v`,
  },
  dfs: {
    title: 'Depth-First Search', category: 'Graph traversal', kind: 'graph', run: dfs,
    structureLabel: 'Call stack (top on the right)',
    summary: 'Explore a graph as deeply as possible before backtracking.',
    what: 'DFS follows one path from the start node as far as it can. When it reaches a node with no unvisited neighbours, it backtracks to the previous node and tries the next neighbour. It is naturally written with recursion, where the call stack remembers the path.',
    steps: ['Mark the current node visited.', 'Pick an unvisited neighbour and call DFS on it (go deeper).', 'When a call finishes, return (backtrack) to the previous node.', 'Continue with its remaining neighbours until none are left.'],
    time: VE, space: 'O(V)',
    timeNote: 'V = number of nodes, E = number of edges. Space is O(V) for the visited set and, in the worst case, a call stack as deep as the graph.',
    note: 'DFS → explores as deeply as possible before backtracking, using a Stack (or recursion).',
    pseudo: `DFS(u):
  mark u visited
  for each neighbour v of u:
    if v not visited:
      DFS(v)`,
  },
};
