
function returnValueOfString(str) {
    const startCodeValue = 'a'.charCodeAt(0) - 1;
    const indexBasedStringValue = str
        .split('')
        .map(s => s.charCodeAt(0) - startCodeValue)
        .map((val, index, arr) => {
            const length = arr.length;
            return val * Math.pow(10, length - 1 - index);
        });
    const result = indexBasedStringValue
        .reduce((acc, v) => acc + v, 0);
    return result;
}

console.log(returnValueOfString('ab'));
console.log(returnValueOfString('ba'));