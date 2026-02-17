import assert from 'node:assert';

function surfaceArea(arr) {

    const cellFrontAreaAccumulation = arr.map((row, rowIndex) => {
        const rowAreaAccumulation = row.map((cell, cellIndex, currentRow) => {
            let currentCellFrontAreaAccumulation = 0;
            if (cellIndex === 0) {
                currentCellFrontAreaAccumulation = cell;
            } else {
                const difference = (cell - currentRow[cellIndex - 1]);
                currentCellFrontAreaAccumulation = difference > 0 ? difference : 0
            }
            return currentCellFrontAreaAccumulation;
        });
        return rowAreaAccumulation;        
    });

    const frontSurfaceArea = cellFrontAreaAccumulation.reduce((frontAreaAcc, row) => {
        return frontAreaAcc + row.reduce((rowFrontAreaAcc, cell) => {
            return rowFrontAreaAcc + cell;
        }, 0);
    }, 0);
    
    console.log({ cellFrontAreaAccumulation, frontSurfaceArea });
    return 0;
}


const inputs = [
    [[1, 3, 4], [2, 2, 3], [1, 2, 4]],
    [[1]]
];

const expected = [
    60, 6
];


inputs.forEach((input, index) => {
    const output = surfaceArea(input);
    const expectedOutput = expected[index];
    try {
        assert.ok(output === expectedOutput, `Test case ${index + 1} failed`);
    } catch (err) {

    }

});

