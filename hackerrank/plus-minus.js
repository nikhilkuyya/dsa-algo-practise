'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
   function print(res){
	console.log(res.toFixed(6));
   }
    // Write your code here
   const len = arr.length;
   if(len){
     const positiveCount = arr.filter(item =>  item > 0).length;
     const negativeCount = arr.filter(item => item < 0).length;
     const zeroCount = arr.filter(item => item == 0).length;
     print(positiveCount/len);
     print(negativeCount/len);
     print(zeroCount/len);
   }
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}

