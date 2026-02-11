
export function returnValueOfString(word) {
    const startCodeValue = 'a'.charCodeAt(0) - 1;

    const wordValues = word
        .split('')
        .map(character => character.charCodeAt(0) - startCodeValue);

    const positionBasedWordValue = wordValues
        .map((character, index, arr) => {
            const length = arr.length;
            return character * Math.pow(10, length - 1 - index);
        });

    const value = positionBasedWordValue
        .reduce((acc, v) => acc + v, 0);

    return {
        wordValues,
        positionBasedWordValue,
        wordValue: value
    };
}

export function valueToStr(word){
    const startCodeValue = 'a'.charCodeAt(0) - 1;
    const wordValues = word
    .map(character => character + startCodeValue)
    .map(character => String.fromCharCode(character));
return wordValues.join('')
}

export function testSwappable(wordValues) {
    let isSwappable = false;
    const wordLength = wordValues.length;
    for (let it = wordLength - 1; it > 0; it -= 1) {
        const currentCharValue = wordValues[it];
        const previousCharValue = wordValues[it - 1];
        if (currentCharValue > previousCharValue) {
            isSwappable = true;
            break;
        }
    }
    return isSwappable;
}

export function sortAscendingOrder(wordCharCodes) {
    let isSwapped = false;
    let size = wordCharCodes.length;
    let result = [...wordCharCodes];
    do {
        isSwapped = false;
        let temp = [...result];
        for (let it = 1; it < size; it += 1) {
            const comparsion = temp[it - 1];
            const comparator = temp[it];
            if(comparsion > comparator) {
                temp[it - 1] = comparator;
                temp[it] =  comparsion;
                isSwapped = true;
            }
        }
        result = [...temp];
    }while(isSwapped);
    return result;
}

export function basicSortAscendingOrder(wordCharCodes) {
    return wordCharCodes.map(x => x).sort((a, b) => a - b);
}

