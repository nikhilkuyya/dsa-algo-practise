function absolutePermutation(n, k) {

    const arrN = (new Array(n)).fill(true).map((_, index) => index + 1);

    function getValToAcc(initialValue, val, counter) {
        let updatedValue = !initialValue ? [] : initialValue;
        return [...updatedValue, [val, counter]];
    }

    const accOfProbablePostion = arrN.reduce((acc, val) => {
        const negComp = val - k;
        const posComp = val + k;
        let counter = 0
        const isNegCompInRange = negComp >= 1 && negComp <= n;
        const isPosCompInRange = posComp >= 1 && posComp <= n;
        if (isNegCompInRange) {
            counter += 1;
        }
        if (isPosCompInRange) {
            counter += 1;
        }

        if (negComp == posComp && isNegCompInRange) {
            counter = 1;
            const initialValue = acc[negComp - 1];
            acc[negComp - 1] = getValToAcc(initialValue, val, counter);
        } else {
            if (isNegCompInRange) {
                const initialValue = acc[negComp - 1];
                acc[negComp - 1] = getValToAcc(initialValue, val, counter);
            }

            if (isPosCompInRange) {
                const initialValue = acc[posComp - 1];
                acc[posComp - 1] = getValToAcc(initialValue, val, counter);
            }
        }

        return acc;
    }, []);


    const sortedAccOfProbablePostion = accOfProbablePostion.map((posVal) => {
        return posVal.map((tmp) => { return [...tmp]; }).sort((a, b) => a[1] - b[1]);
    });

    const accumulator = new Set();
    const permuationArrWithInitialVal = sortedAccOfProbablePostion.map((v) => {
        const secondValueContainer = v[1];
        const firstValue = v[0][0];
        let value;
        if (!accumulator.has(firstValue)) {
            value = firstValue;
        } else if (secondValueContainer && !accumulator.has(secondValueContainer[0])) {
            value = secondValueContainer[0];
        }
        accumulator.add(value);
        return value;
    }).filter((item) => Boolean(item));


    if (accumulator.size < n) {
        return -1;
    }

    return permuationArrWithInitialVal;

}

console.log(absolutePermutation(10, 1));


/*** 
1 2 3 4 5 6 7 8 9 10
2 1 4 3 6 5 8 7 10 9 --> 10 1
1 2 3 4 5 6 7
-1
1 2 3 4 5 6 7 8 9
-1
3 4 1 2 7 8 5 6 --> 8 2
1 2 3 4 5 6 7 8
1 2 3 4 5 6 7
2 1 4 3 6 5 8 7 10 9
 */