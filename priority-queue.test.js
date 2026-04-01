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

  it("maxHeap push should add in correct order for random data", () => {
    const maxHeap = new Heap((a,b) =>  a > b);
    expect(maxHeap.arr).toEqual([]);
    maxHeap.push(99);
    expect(maxHeap.arr).toEqual([99]);
    maxHeap.push(44);
    expect(maxHeap.arr).toEqual([99,44]);
    maxHeap.push(201);
    expect(maxHeap.arr).toEqual([201,44,99]);
  });

  it("maxHeap should pop the leftChild and remove the top element from two element", () => {
    const maxHeap = new Heap((a,b) =>  a > b);
    expect(maxHeap.arr).toEqual([]);
    maxHeap.push(99);
    expect(maxHeap.arr).toEqual([99]);
    maxHeap.push(44);
    expect(maxHeap.arr).toEqual([99,44]);
    expect(maxHeap.pop()).toEqual(99);
    expect(maxHeap.arr).toEqual([44]);
  });

  it("maxHeap should pop the rightChild and remove the top element from three element heap pushed", () => {
    const maxHeap = new Heap((a,b) =>  a > b);
    expect(maxHeap.arr).toEqual([]);
    maxHeap.push(99);
    expect(maxHeap.arr).toEqual([99]);
    maxHeap.push(44);
    expect(maxHeap.arr).toEqual([99,44]);
    maxHeap.push(201);
    expect(maxHeap.arr).toEqual([201,44,99]);
    expect(maxHeap.pop()).toEqual(201);
    expect(maxHeap.arr).toEqual([99,44]);
  })

  it("maxHeap should pop the leftChild and remove the top element from three element heap pushed", () => {
    const maxHeap = new Heap((a,b) =>  a > b);
    expect(maxHeap.arr).toEqual([]);
    maxHeap.push(201);
    expect(maxHeap.arr).toEqual([201]);
    maxHeap.push(10);
    expect(maxHeap.arr).toEqual([201, 10]);
    maxHeap.push(9);
    expect(maxHeap.arr).toEqual([201, 10, 9]);
    expect(maxHeap.pop()).toEqual(201);
    expect(maxHeap.arr).toEqual([10, 9]);
  })

  it('should push and pop elements for max heap', () => {
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

  it('should push and pop elements for min heap', () => {
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