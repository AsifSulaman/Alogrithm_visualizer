// "sorted" is the sorted prefix: ordered among itself, not necessarily in its final spot
export function* insertionSort(input) {
  const a = [...input];
  const n = a.length;
  let comparisons = 0;
  let swaps = 0;

  const frame = (active, prefix, msg, swap = false) => ({
    values: [...a], active, marked: [], sorted: a.slice(0, prefix).map((_, k) => k),
    swap, comparisons, swaps, msg,
  });

  for (let i = 1; i < n; i++) {
    yield frame([i], i, `Take ${a[i]} and insert it into the sorted part on its left`);

    let j = i;
    while (j > 0) {
      comparisons++;
      yield frame([j - 1, j], i, `Comparing ${a[j - 1]} and ${a[j]}`);

      if (a[j - 1] <= a[j]) {
        yield frame([], i + 1, `${a[j]} is in the right place`);
        break;
      }
      const message = `${a[j - 1]} > ${a[j]} → swap (move ${a[j]} left)`;
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      swaps++;
      yield frame([j - 1, j], i, message, true);
      j--;
    }
  }

  yield { ...frame([], n, 'Sorted: every value has been inserted'), finished: true };
}
