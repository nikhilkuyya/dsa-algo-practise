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
        return item;
    }
}