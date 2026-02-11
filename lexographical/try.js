import { returnValueOfString, valueToStr, testSwappable, basicSortAscendingOrder } from './return-value-of-string.js';
import { it, describe } from 'node:test';
import assert from 'node:assert';

export function findNextLexographicalString(str) {

    const { wordValues } = returnValueOfString(str);
    const wordLength = str.length;
    const isSwappable = testSwappable(wordValues);

    if (isSwappable === false) {
        return "no answer"
    }

    let hasFound = false;
    let nextPossibleGreatWordValues;
    let positionSwappedIndex = -1;
    let newWordValue;
    for (let it = wordLength - 1; it > 0; it -= 1) {
        newWordValue = [...wordValues];
        const checkWordIndex = it;
        const testWordIndex = it -1;        
        const checkWord = newWordValue[checkWordIndex];
        const testWord = newWordValue[testWordIndex];
        if (checkWord > testWord) {
            newWordValue[testWordIndex] = checkWord;
            newWordValue[checkWordIndex] = testWord;
            positionSwappedIndex = it -1;
            hasFound = true;
            break;
        }
    }

    if (hasFound) {
        nextPossibleGreatWordValues = newWordValue;
    }

    if (positionSwappedIndex !== -1) {

        const sortedNextLexographical = nextPossibleGreatWordValues.filter((item, indx) => {
            return indx <= positionSwappedIndex;
        });

        const toSortLexographicalPart = nextPossibleGreatWordValues.filter((item, indx) => {
            return indx > positionSwappedIndex;
        });

        const sortedLexographicalPart = basicSortAscendingOrder(toSortLexographicalPart);
        const charCodes = [...sortedNextLexographical, ...sortedLexographicalPart];
        const value = valueToStr(charCodes);
        const { wordValues: resultWordValues } = returnValueOfString(value);
        return value;
    }
    return "no answer";
}


const input = "dkhc";
const expected = "hcdk";

describe('findNextLexographicalString', () => {
    it('should return the next lexographical string', () => {
        assert.strictEqual(findNextLexographicalString(input), expected, "not equal string");
    });
});

// test the findNextLexographicalString function based test-cases-input and validate the output with test-cases-expected
// read input from test-cases-input.txt and validate the output with test-cases-expected.txt using fs module
// read each line of the input and expected files and validate the output with the findNextLexographicalString function
import fs from 'node:fs';
let input1 = fs.readFileSync('test-case-input.txt', 'utf8').split('\n');
let expected1 = fs.readFileSync('test-case-output.txt', 'utf8').split('\n');
input1.forEach((inputTmp, index) => {
    const inputRes = inputTmp;
    const ouput = findNextLexographicalString(inputTmp);
    const expectedRes = expected1[index];
    if (ouput !== expectedRes) {
        console.log(inputRes, ouput, expectedRes);
    }
    assert.strictEqual(expectedRes, ouput, "not equal string  for index " + index + ' For input ' + inputRes + ' and expected ' + expectedRes);
});
