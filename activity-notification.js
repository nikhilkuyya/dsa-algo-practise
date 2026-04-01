export function countActivityNotifications(data, trainData) {
    
    if (data.length <= trainData) {
        return 0;
    }

    function getNewSortedArray(sortedInput, item, runningIndex) {
        let res = [];
        let isAdded = false;
        for (let it = 0; it < runningIndex; it += 1) {
            res.push(sortedInput[it]);
        }
        for (let it = runningIndex; it < sortedInput.length; it += 1) {
            const val = sortedInput[it];
            if (!isAdded && item < val) {
                res.push(item);
                isAdded = true;
            } 
            res.push(val);
        }
        if (!isAdded) {
            res.push(item);
        }
        return res;
    }

    let sortedData = [];
    let countNofitication = 0;
    let runningIndex = 0;
    for (let it = 0; it < data.length; it += 1) {
        const value = data[it];
        let median = 0;

        if (it >= trainData) {
            
            if(trainData % 2 !== 0) {
                const pos = (Math.ceil(trainData / 2) - 1) + runningIndex;
                median = sortedData[pos];
            }else {
                const pos = ((trainData / 2) - 1) + runningIndex;
                median = (sortedData[pos] + sortedData[pos + 1]) / 2;
            }

            if (value >= 2 * median) {
                countNofitication += 1;
            }

        }
        
        if (sortedData.length >= trainData) {
            runningIndex += 1;
        }
        sortedData = getNewSortedArray(sortedData, value, runningIndex);

    }
    return countNofitication;
}