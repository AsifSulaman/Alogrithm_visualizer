export function* selectionSort(input) {
  const a = [...input];
  const n = a.length;
  const sorted = [];
  let comparisons = 0;
  let swaps = 0;

  const frame = (active, marked, msg, swap = false) =>
    ({ values: [...a], active, marked, sorted: [...sorted], swap, comparisons, swaps, msg });

  for (let i = 0; i < n - 1; i++) {
    let min = i;
    yield frame([], [min], `Pass ${i + 1}: assume ${a[min]} is the smallest unsorted value`);

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      yield frame([j], [min], `Comparing ${a[j]} with current minimum ${a[min]}`);
      if (a[j] < a[min]) {
        min = j;
        yield frame([], [min], `${a[min]} is smaller → new minimum`);
      }
    }

    if (min !== i) {
      const message = `Swap minimum ${a[min]} with ${a[i]} at position ${i}`;
      [a[i], a[min]] = [a[min], a[i]];
      swaps++;
      yield frame([i, min], [], message, true);
    }
    sorted.push(i);
    yield frame([], [], `${a[i]} is now in its final position`);
  }

  sorted.push(n - 1);
  yield { ...frame([], [], 'Sorted: the last value is automatically in place'), finished: true };
}
