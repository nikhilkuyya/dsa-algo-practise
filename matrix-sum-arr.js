const arr = [1,7,2,4];
const k = 3;

const len = arr.length;
const mat = (new Array(len)).fill(0);


mat.forEach((_, it) => {
    mat[it] = new Array(len).fill(0);
});

for (let row = 0; row < len; row++) {
    let sum = arr[row];
    for (let col = row; col < len; col++) {
        if (col > row) {
            sum += arr[col];
        }
        mat[row][col] = sum;
    }
}

let maxSubSet = 0;
for (let row = 0; row < len; row++) {
    for (let col = row; col < len; col++) {
        const value = mat[row][col];
        const remainder = value % k;
        const subSetCount = col + 1 - row;
        if (remainder === 0) {
            if (subSetCount > maxSubSet) {
                maxSubSet = subSetCount;
            }
            // console.log({ mat, value, col, row, remainder, subSetCount, maxSubSet })
        }
    }
}
console.log(maxSubSet,mat);

