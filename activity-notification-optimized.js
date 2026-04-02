/**
 * Heap class implementation.
 * @param {function} comparator - Comparator function for heap elements.
 * @property {function} cmp - Comparator function.
 */
import { Heap } from './priority-queue';
export class Heap2 {  
    constructor(comparator) { this.arr = []; this.cmp = comparator; }
    /**
     * Returns the size of the heap.
     * @returns {number} The size of the heap.
     */
    size() { return this.arr.length; }
    /**
     * Returns the top element of the heap.
     * @returns {number} The top element of the heap.
     */
    peek() { return this.arr[0]; }
    /**
     * Adds an element to the heap.
     * The element is added to the end of the array and then bubbled up to the correct position
     * based on the comparator and keeping them like the max heap or min heap
     * @param {number} x - The element to add.
     */
    push(x) {
      this.arr.push(x);
      // The current element is at index this.arr.length - 1.
      let currentElementPos = this.arr.length - 1;
      // While the current element is not the root, bubble up.
      while (currentElementPos > 0) {
        // The parent of the current element is at index (i - 1) / 2.
        const parentPos = Math.floor((currentElementPos - 1) / 2);
        // If the current element is greater than the parent, swap them.
        if (this.cmp(this.arr[currentElementPos], this.arr[parentPos])) {
          [this.arr[currentElementPos], this.arr[parentPos]] = [this.arr[parentPos], this.arr[currentElementPos]];
          currentElementPos = parentPos;
        } else break;
      }
    }

    /**
     * Removes and returns the top element of the heap.
     * The last element is moved to the root and then bubbled down to the correct position.
     * @returns {number} The top element of the heap.
     */
    pop() {
      if (!this.arr.length) return undefined;
      const top = this.arr[0];
      const last = this.arr.pop();
      // If the heap is not empty, the last element is moved to the root and then bubbled down to the correct position.
      if (this.arr.length) {
        this.arr[0] = last;
        let currentElementPos = 0;
        // While the current element has at least one child, bubble down.
        while (true) {
          // The left and right children of the current element are at indices 2 * currentElementPos + 1 and 2 * currentElementPos + 2.
          // The best child is the one with the smaller value.
          let leftChildPos = 2 * currentElementPos + 1, 
          rightChildPos = 2 * currentElementPos + 2, 
          best = currentElementPos;
          // If the left child is smaller than the current element, it is the best child.
          if (leftChildPos < this.arr.length && this.cmp(this.arr[leftChildPos], this.arr[best])) best = leftChildPos;
          // If the right child is smaller than the current element, it is the best child.
          if (rightChildPos < this.arr.length && this.cmp(this.arr[rightChildPos], this.arr[best])) best = rightChildPos;
          // If the current element is the best child, break.
          if (best === currentElementPos) break;
          // Swap the current element with the best child.
          [this.arr[currentElementPos], this.arr[best]] = [this.arr[best], this.arr[currentElementPos]];
          // Update the current element position to the best child.
          currentElementPos = best;
        }
      }
      return top;
    }
}
  
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
      if (maxHeap.size() > minHeap.size() + 1) {
        pruneDelayed(maxHeap);
        minHeap.push(maxHeap.pop());
      } else if (minHeap.size() > maxHeap.size()) {
        pruneDelayed(minHeap);
        maxHeap.push(minHeap.pop());
      }
    }
  
    // initialize first d elements
    for (let i = 0; i < d; i++) {
      if (!maxHeap.size() || data[i] <= maxHeap.peek()) maxHeap.push(data[i]);
      else minHeap.push(data[i]);
      rebalanceHeaps();
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
      // lazy remove out
      // mark outgoing value for lazy deletion
      updateMapCount(pendingRemovals, out, 1);
      maxHeap.remove(out);
      minHeap.remove(out);
      rebalanceHeaps();
      // add incoming
      if (incoming <= maxHeap.peek()) maxHeap.push(incoming);
      else minHeap.push(incoming);
      rebalanceHeaps();
    }
  
    return notifications;
}



// Backwards-compatible alias: keep the previous export name for existing imports/tests.
export { countActivityNotificationsUsingDualHeap as countActivityNotificationsHeaps };