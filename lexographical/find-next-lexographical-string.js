import { returnValueOfString, valueToStr, sortAscendingOrder } from './return-value-of-string.js';
import { it, describe } from 'node:test';
import assert from 'node:assert';

function biggerIsGreater(w) {
    // Write your code here
    const str = w.split('').join('');
    const wordValues = str.split('');
    const wordLength = str.length;
    let pivotIndex = -1;

    // finding the pivotIndex
    let it = wordLength - 1;
    do {
        const swapWord = wordValues[it];
        const testWord = wordValues[it - 1];
        if (testWord < swapWord) {
            pivotIndex = it - 1;
        }
        it -= 1;
    } while (pivotIndex === -1 && it > 0);

    if (!(pivotIndex === -1)) {
        // finding the smallest word.
        let pivotValue = wordValues[pivotIndex];
        const list = wordValues.map((testWord, index) => {
            const checkIndex = index > pivotIndex;
            return !!checkIndex && testWord > pivotValue ? { word: testWord, index} : undefined;
        }).filter(Boolean).sort((a,b) =>  b.word > a.word);

        const smallestWord = list[list.length - 1];
        const testGenerationWordValues = [...wordValues];
        testGenerationWordValues[smallestWord.index] = pivotValue;
        testGenerationWordValues[pivotIndex] = smallestWord.word;

        // find the elements and sort
        const sortedNextLexographical = testGenerationWordValues.filter((item, indx) => {
            return indx <= pivotIndex;
        });

        const toSortLexographicalPart = testGenerationWordValues.filter((item, indx) => {
            return indx > pivotIndex;
        });

        const sortedLexographicalPart = sortAscendingOrder(toSortLexographicalPart);
        const value = [...sortedNextLexographical, ...sortedLexographicalPart];

        return value.join('');
    }
    return "no answer"
}

let input = "dkhc";
let expected = "hcdk";
let output = biggerIsGreater(input);
console.log(input, output, expected);
assert.strictEqual(output, expected, "not equal string");

/**
let input =  "biehzcmjckznhwrfgglverxsezxuqpj";
let expected =  "biehzcmjckznhwrfgglverxsjepquxz";
const output = biggerIsGreater(input);
assert.strictEqual(output, expected, "not equal string");
 */

/**

    let input = 'rebjvsszebhehuojrkkhszxltyqfdvayusylgmgkdivzlpmmtvbsavxvydldmsym';
    let expected = 'rebjvsszebhehuojrkkhszxltyqfdvayusylgmgkdivzlpmmtvbsavxvydldmyms';

    describe('biggerIsGreater', () => {
        it('should return the next lexographical string', () => {
            assert.strictEqual(biggerIsGreater(input), expected, "not equal string");
        });
    });

    input = "dkhc";
    expected = "hcdk";

    describe('findNextLexographicalString', () => {
        it('should return the next lexographical string', () => {
            assert.strictEqual(biggerIsGreater(input), expected, "not equal string");
        });
    });

*/

// test the findNextLexographicalString function based test-cases-input and validate the output with test-cases-expected
// read input from test-cases-input.txt and validate the output with test-cases-expected.txt using fs module
// read each line of the input and expected files and validate the output with the findNextLexographicalString function
/** 
  
 import fs from 'node:fs';
let input1 = fs.readFileSync('test-case-input.txt', 'utf8').split('\n');
let expected1 = fs.readFileSync('test-case-output.txt', 'utf8').split('\n');
input1.forEach((inputTmp, index) => {
    const inputRes = inputTmp;
    const ouput = biggerIsGreater(inputTmp);
    const expectedRes = expected1[index];
    if (ouput !== expectedRes) {
        console.log(inputRes, ouput, expectedRes);
    }
    assert.strictEqual(expectedRes, ouput, "not equal string  for index " + index + ' For input ' + inputRes + ' and expected ' + expectedRes);
});
 * 
*/


 