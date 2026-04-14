export class Heap {

    #arr;
    #comparator;
    constructor(comparator) {
        this.#arr = [];
        this.#comparator = comparator;
    }

    get arr() {
        return this.#arr.map((item) => item);
    }

    peek() {
        return this.#arr[0];
    }

    size() {
        return this.#arr.length;
    }

    push(item) {
        this.#arr.push(item);
        const len = this.#arr.length;
        let currentIndex = len - 1, parentIndex  = Math.floor((currentIndex - 1) / 2);
        while(parentIndex >= 0 && this.#comparator(this.#arr[currentIndex], this.#arr[parentIndex])){
            
            if (this.#comparator(this.#arr[currentIndex], this.#arr[parentIndex])) {
                const [parentValue, currentValue] = [this.#arr[currentIndex], this.#arr[parentIndex]];
                this.#arr[parentIndex] = parentValue;
                this.#arr[currentIndex] = currentValue;
                currentIndex = parentIndex;
                parentIndex = (currentIndex - 1) / 2
            }
        } 
    }

    pop() {
        const item = this.#arr[0];
        let currentPosition  = 0;
        let leftChildPos = 2 * currentPosition + 1;
        let rightChildPos = 2 * currentPosition + 2;
        const limitPos = this.#arr.length - 1;
        while(leftChildPos <= limitPos) {
            const rightChildValue = this.#arr[rightChildPos];
            const leftChildValue = this.#arr[leftChildPos];
            if (rightChildPos > limitPos) {
                this.#arr[leftChildPos] = item;
                this.#arr[currentPosition] = leftChildValue;
                currentPosition = leftChildPos;
            } else {
                const maxChildPosition = this.#comparator(leftChildValue, rightChildValue) ? leftChildPos : rightChildPos;
                this.#arr[currentPosition] = this.#arr[maxChildPosition];
                this.#arr[maxChildPosition] = item;
                currentPosition = maxChildPosition;
            }
            leftChildPos = 2 * currentPosition + 1;rightChildPos = 2 * currentPosition + 2;
        }
        if(currentPosition !== limitPos) {
            this.#arr[currentPosition] = this.#arr[limitPos];
            this.#arr[limitPos] = item;
        }
        return this.#arr.pop();
        
    }

    remove(item) {
        const index = this.#arr.indexOf(item);
        if(index === -1) {
            return false;
        }
        let currentPosition = index;
        let leftChildPos = 2 * currentPosition + 1;
        let rightChildPos = 2 * currentPosition + 2;
        const limitPos = this.#arr.length - 1;
        while(leftChildPos <= limitPos) {
            const rightChildValue = this.#arr[rightChildPos];
            const leftChildValue = this.#arr[leftChildPos];
            if(rightChildPos > limitPos) {
                this.#arr[leftChildPos] = item;
                this.#arr[currentPosition] = leftChildValue;
                currentPosition = leftChildPos;
            } else {
                const newChildPosition = this.#comparator(leftChildValue, rightChildValue) ? leftChildPos : rightChildPos;
                this.#arr[currentPosition] = this.#arr[newChildPosition];
                this.#arr[newChildPosition] = item;
                currentPosition = newChildPosition;
            }
            leftChildPos = 2 * currentPosition + 1;rightChildPos = 2 * currentPosition + 2;
        }

        if(currentPosition !== limitPos) {
            this.#arr[currentPosition] = this.#arr[limitPos];
            this.#arr[limitPos] = item;
        }
        this.#arr.pop();
        return true;
    }
}

// just for reference
class GeneratedHeap {  
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