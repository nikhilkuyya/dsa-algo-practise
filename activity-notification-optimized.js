import { Heap } from './priority-queue';

/**
 * Count activity notifications using a dual-heap (max-heap + min-heap) sliding window median.
 *
 * This implementation maintains two heaps:
 * - maxHeap (lower half) implemented as a max-heap
 * - minHeap (upper half) implemented as a min-heap
 *
 * It uses a lazy-deletion map to handle removals from the sliding window efficiently.
 *
 * @param {number[]} data - Array of daily expenditures/activities.
 * @param {number} d - Size of the trailing window used to compute the median.
 * @returns {number} Number of notifications where an activity >= 2 * median of trailing d days.
 */
export function countActivityNotificationsUsingDualHeap(data, d) {

  if (data.length <= d) return 0;

  const maxHeap = new Heap((a, b) => a > b); // lower half
  const minHeap = new Heap((a, b) => a < b); // upper half
  const pendingRemovals = new Map(); // value -> count pending deletion
  let maxHeapValidSize = 0;
  let minHeapValidSize = 0;

  /**
   * Update a map counter by delta and remove the key if count hits zero.
   * @param {Map} m - Map from key to integer count.
   * @param {number} key - Key whose count to adjust.
   * @param {number} delta - Amount to add (can be negative).
   */
  function updateMapCount(m, key, delta) {
    m.set(key, (m.get(key) || 0) + delta);
    if (m.get(key) === 0) m.delete(key);
  }

  /**
   * Remove elements from the top of the heap that are marked for lazy deletion.
   * Uses the pendingRemovals map to skip over logically-deleted values.
   * @param {Heap} heap - Heap to prune.
   */
  function pruneDelayed(heap) {
    // not everytime we need to prune the top of heap as it can be anywhere in heap.
    while (heap.size() && pendingRemovals.has(heap.peek())) {
      updateMapCount(pendingRemovals, heap.peek(), -1);
      heap.pop();
    }
  }

  /**
   * Rebalance the two heaps so that their sizes differ by at most 1.
   * Always ensures maxHeap holds the lower half and may have one extra element
   * when the total number of elements is odd.
   */
  function rebalanceHeaps() {
    if (maxHeapValidSize > minHeapValidSize + 1) {
      pruneDelayed(maxHeap);
      minHeap.push(maxHeap.pop());
      maxHeapValidSize -= 1;
      minHeapValidSize += 1;
    } else if (minHeapValidSize > maxHeapValidSize) {
      pruneDelayed(minHeap);
      maxHeap.push(minHeap.pop());
      minHeapValidSize -= 1;
      maxHeapValidSize += 1;
    }
  }

  function addNumber(num) {
    pruneDelayed(maxHeap);
    if (!maxHeap.size() || num <= maxHeap.peek()) {
      maxHeap.push(num);
      maxHeapValidSize += 1;
    } else {
      minHeap.push(num);
      minHeapValidSize += 1;
    }
    rebalanceHeaps();
  }

  function removeNumber(num) {
    updateMapCount(pendingRemovals, num, 1);
    pruneDelayed(maxHeap);

    if (maxHeap.size() && num <= maxHeap.peek()) {
      maxHeapValidSize -= 1;
      if (num === maxHeap.peek()) {
        pruneDelayed(maxHeap);
      }
    } else {
      minHeapValidSize -= 1;
      if (minHeap.size() && num === minHeap.peek()) {
        pruneDelayed(minHeap);
      }
    }

    rebalanceHeaps();
  }

  // initialize first d elements
  for (let i = 0; i < d; i++) {
    addNumber(data[i]);
  }

  let notifications = 0;
  for (let i = d; i < data.length; i++) {

    // compute median
    pruneDelayed(maxHeap);
    pruneDelayed(minHeap);

    const median = (d % 2 === 1) ? maxHeap.peek() : (maxHeap.peek() + minHeap.peek()) / 2;
    if (data[i] >= 2 * median) notifications++;

    // slide window: remove outgoing, add incoming
    const out = data[i - d], incoming = data[i];
    removeNumber(out);
    addNumber(incoming);
  }

  return notifications;
}



// Backwards-compatible alias: keep the previous export name for existing imports/tests.
export { countActivityNotificationsUsingDualHeap as countActivityNotificationsHeaps };