   // Write your code here
   const str = w.split('').join('');
   const { wordValues } = returnValueOfString(str);
    const wordLength = str.length;
    const isSwappable = testSwappable(wordValues);

    if (isSwappable === false) {
        return "no answer"
    }

    let hasFound = false;
    let nextPossibleGreatWordValues;
    let positionSwappedIndex = -1;
    for (let it = wordLength - 1; it >= 0; it -= 1) {
        const swapWord = wordValues[it];
        let newWordValue = [...wordValues];
        for (let temp = it - 1; temp >= 0; temp -= 1) {
            const testWord = wordValues[temp];
            if (swapWord > testWord) {
                newWordValue[temp] = swapWord;
                newWordValue[it] = testWord;
                positionSwappedIndex = temp;
                hasFound = true;
                break;
            }
        }

        if (hasFound) {
            nextPossibleGreatWordValues = newWordValue;
            break;
        }
    }

    if (positionSwappedIndex !== -1) {

        const sortedNextLexographical = nextPossibleGreatWordValues.filter((item, indx) => {
            return indx <= positionSwappedIndex;
        });

        const toSortLexographicalPart = nextPossibleGreatWordValues.filter((item, indx) => {
            return indx > positionSwappedIndex;
        });
        
        const sortedLexographicalPart = sortAscendingOrder(toSortLexographicalPart);
        const charCodes = [...sortedNextLexographical, ...sortedLexographicalPart];
        const value = valueToStr(charCodes);
        const { wordValues: resultWordValues } = returnValueOfString(value);
        return value;
    }
    return "no answer";