export const lilyHomeworkWithAscBubbleSort = (arr) => {
    const sz = arr.length;
    let swaps = 0;
    for (let it = 0; it < sz - 1; it += 1) {
        let pos = it;
        let posValue = arr[it];

        for (let innerIt = it + 1; innerIt < sz; innerIt += 1) {
            const innerValue = arr[innerIt];
            if (posValue < innerValue) {
                posValue = innerValue;
                pos = innerIt;
            }
        }
        if (pos !== it) {
            const newValue = arr[pos];
            arr[pos] = arr[it];
            arr[it] = newValue;
            swaps += 1;
        }

    }
    return swaps;
}



export function lilysHomeworkSolution(arr) {
    // We must check both ascending and descending orders
    const ascTarget = [...arr].sort((a, b) => a - b);
    const descTarget = [...arr].sort((a, b) => b - a);

    const getSwaps = (currentArr, targetArr) => {
        let swaps = 0;
        let tempArr = [...currentArr];

        // Map current values to their indices for O(1) lookup
        let posMap = {};
        for (let i = 0; i < tempArr.length; i++) {
            posMap[tempArr[i]] = i;
        }

        for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i] !== targetArr[i]) {
                swaps++;

                // Value currently at this position
                let currentVal = tempArr[i];
                // Value that should be at this position
                let targetVal = targetArr[i];
                // Where the target value is currently located
                let targetIdx = posMap[targetVal];

                // Perform the swap in the array
                [tempArr[i], tempArr[targetIdx]] = [tempArr[targetIdx], tempArr[i]];

                // Update the map with the new position of the swapped-out value
                posMap[currentVal] = targetIdx;
                // (Optional) Update map for targetVal, though not strictly 
                // needed since we won't visit index i again
                posMap[targetVal] = i;
            }
        }
        return swaps;
    };

    const swapsAsc = getSwaps(arr, ascTarget);
    const swapsDesc = getSwaps(arr, descTarget);
    return Math.min(swapsAsc, swapsDesc);
}


export function lilysHomeWork(arr) {

    const ascArr = arr.map(a => a).sort((a, b) => a - b);
    const descArr = arr.map(a => a).sort((a, b) => b - a);
 
     const getSwaps = (sortArr, dataArr) => {
         let countSwaps = 0;
         const posMap = {};
         for (let i = 0; i < dataArr.length; i++) {
             posMap[arr[i]] = i;
         }
         
         for (let it = 0; it < dataArr.length; it += 1) {
             const currentValue = dataArr[it];
             const sortValue = sortArr[it];
             if (!(sortValue === currentValue)) {
                 
                 const currentSortPosition = posMap[sortValue];
                 [dataArr[it], dataArr[currentSortPosition]] = [dataArr[currentSortPosition], dataArr[it]];
                 
                 posMap[currentValue] = currentSortPosition;
                 // optional as sortvalue is passed in iteration
                 // posMap[sortValue] = it;
 
                 countSwaps += 1;
             }
         }
         return countSwaps;
     };
 
     const ascSwaps = getSwaps(ascArr, [...arr]);
     const descSwaps = getSwaps(descArr, [...arr]);
     return Math.min(ascSwaps, descSwaps);
}