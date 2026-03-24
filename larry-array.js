let countCaller = 0;

function checkIsLarryArray(arr) {
    const len = arr.length;
    const testArr = [...arr, ...arr];
    let iterator = 0;
    let isLarryArray = false;
    do {
        let isThisLarryArray = true;
        for (let temp = iterator + 1; temp < iterator + len; temp++) {
            const a = testArr[temp - 1];
            const b = testArr[temp];
            if (b > a) {
                continue;
            }else {
                isThisLarryArray = false;
                break;
            }
        }
        isLarryArray = isLarryArray || isThisLarryArray;
        iterator += 1;
    } while (iterator < len);
    return isLarryArray;
}

function larryArrayWithNaturalSequence(arr) {
    const len = arr.length;
    let isLarryArray = true;
    for(let it = 0; it < len - 2; it++) {
        if(it + 1 === arr[it]) {
            continue;
        }
        const a = arr[it];
        const b = arr[it + 1];
        const c = arr[it + 2];
        const testArr = [a,b,c]
        countCaller += 1;
        const isLarryArrayResult = checkIsLarryArray(testArr);
        // console.log({ testArr, isLarryArrayResult });
        isLarryArray = isLarryArrayResult && isLarryArray;
    }
    return isLarryArray ? 'YES' : 'NO';
}

// const testCases = [
//     { arr: [1,2,3,4], larry: true },
//     { arr: [1,2,4,3], larry: false },
//     { arr: [1,3,2,4], larry: false },
//     { arr: [1,3,4,2], larry: true },
//     { arr: [1,4,2,3], larry: true },
//     { arr: [1,4,3,2], larry: false },
//     { arr: [2,1,3,4], larry: false },
//     { arr: [2,1,4,3], larry: true },
//     { arr: [2,3,1,4], larry: true },
//     { arr: [2,3,4,1], larry: false },
//     { arr: [2,4,1,3], larry: false },
//     { arr: [2,4,3,1], larry: true },
//     { arr: [3,1,2,4], larry: true },
//     { arr: [3,1,4,2], larry: false },
//     { arr: [3,2,1,4], larry: false },
//     { arr: [3,2,4,1], larry: true },
//     { arr: [3,4,1,2], larry: true },
//     { arr: [3,4,2,1], larry: false },  
//     { arr: [4,1,2,3], larry: false },
//     { arr: [4,1,3,2], larry: true },
//     { arr: [4,2,1,3], larry: true },
//     { arr: [4,2,3,1], larry: false },
//     { arr: [4,3,1,2], larry: false },
//     { arr: [4,3,2,1], larry: true }
// ];

// testCases.forEach((testCase) => {
//     countCaller = 0;
//     const output = larryArrayWithNaturalSequence(testCase.arr);
//     console.log({...testCase, output});
// })


function simulateLarryArray(A) {
    const n = A.length;

    // Loop to place each number (1, 2, 3...) in its correct index (0, 1, 2...)
    for (let target = 1; target <= n - 2; target++) {
        let currentIndex = A.indexOf(target);
        let targetIndex = target - 1;

        // While the number is not at its target index, rotate it left
        while (currentIndex > targetIndex) {
            // We need 3 elements to rotate. 
            // If the element is far enough, we rotate the triplet ending at currentIndex
            // If it's near the start, we shift the window to ensure we don't go out of bounds.
            let i = Math.max(targetIndex, currentIndex - 2);
            
            // Perform one 3-element rotation: [A, B, C] -> [B, C, A]
            let [a, b, c] = [A[i], A[i+1], A[i+2]];
            A[i] = b;
            A[i+1] = c;
            A[i+2] = a;
            // Update where our target number moved to
            currentIndex = A.indexOf(target);
        }
    }

    // After fixing N-2 elements, check if the last two are [N-1, N]
    if (A[n - 2] < A[n - 1]) {
        return "YES";
    } else {
        return "NO";
    }
}


function solveLarryArray(A) {
    const sz = A.length;

    for (let iteratorIndex = 0; iteratorIndex < sz - 2; iteratorIndex += 1) {
        const target = iteratorIndex + 1;
        let currentTargetIndex = A.indexOf(target);
        const expectedTargetIndex = iteratorIndex;

        while(currentTargetIndex > expectedTargetIndex) {
            const positionIndex = Math.max(expectedTargetIndex, currentTargetIndex - 2);
            const [a,b,c] = [A[positionIndex], A[positionIndex + 1], A[positionIndex + 2]];
            A[positionIndex] = b;
            A[positionIndex + 1] = c;
            A[positionIndex + 2] = a;

            currentTargetIndex = A.indexOf(target);
        }
    }

    const lastPositionValue = A[sz - 1];
    const previousToLastPositionValue = A[sz - 2];
    if(previousToLastPositionValue > lastPositionValue){
        return "NO";
    }else if(lastPositionValue > previousToLastPositionValue){
        return "YES";
    }else {
        return "YES";
    }

}

const arr = [1, 2, 3, 5, 6, 4];
const output = solveLarryArray(arr);
console.log(output);