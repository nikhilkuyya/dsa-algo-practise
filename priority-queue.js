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