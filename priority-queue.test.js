import {describe, it, expect} from 'vitest';
import { Heap } from './priority-queue';
describe('Heap', () => {

  it("maxHeap push should works if alreay in sorted order", () => {
    const maxHeap = new Heap((a,b) =>  a > b);
    expect(maxHeap.arr).toEqual([]);
    maxHeap.push(2);
    expect(maxHeap.arr).toEqual([2]);
    maxHeap.push(1);
    expect(maxHeap.arr).toEqual([2,1]);
    maxHeap.push(3);
    expect(maxHeap.arr).toEqual([3,1,2]);
  });

  it("maxHeap push should work if adding data in reversere sorted order", () => {
    const maxHeap = new Heap((a,b) =>  a > b);
    expect(maxHeap.arr).toEqual([]);
    maxHeap.push(1);
    expect(maxHeap.arr).toEqual([1]);
    maxHeap.push(2);
    expect(maxHeap.arr).toEqual([2,1]);
    maxHeap.push(-1);
    expect(maxHeap.arr).toEqual([2,1,-1]);
  });

  it.skip('should push and pop elements for max heap', () => {
    const heap = new Heap((a, b) => a > b);
    heap.push(1);
    heap.push(2);
    expect(heap.arr).toEqual([2, 1]);
    heap.push(3);
    expect(heap.arr).toEqual([3, 1, 2]);
    expect(heap.pop()).toEqual(3);
    expect(heap.arr).toEqual([2,1]);
    expect(heap.pop()).toEqual(2);
    expect(heap.arr).toEqual([1]);
    expect(heap.pop()).toEqual(1);    
  });

  it.skip('should push and pop elements for min heap', () => {
    const heap = new Heap((a, b) => a < b);
    heap.push(1);
    heap.push(2);
    expect(heap.arr).toEqual([1, 2]);
    heap.push(3);
    expect(heap.arr).toEqual([1, 2, 3]);
    expect(heap.pop()).toEqual(1);
    expect(heap.arr).toEqual([2, 3]);
    expect(heap.pop()).toEqual(2);
    expect(heap.arr).toEqual([3]);
    expect(heap.pop()).toEqual(3);
    expect(heap.arr).toEqual([]);
  });
});