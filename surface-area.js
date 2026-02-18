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

    const frontSurfaceArea = computeMatrix(cellFrontAreaAccumulation);

    const topFrontAreaAccumulation = arr.map((row) => {
        const rowAreaAccumulation = row.map((cell) => {
            const currentCellFrontAreaAccumulation = cell > 0 ? 1 : 0;
            return currentCellFrontAreaAccumulation;
        })
        return rowAreaAccumulation
    });

    const topSurfaceArea = computeMatrix(topFrontAreaAccumulation);

    const lateralAreaAccumulation = arr.map((row, rowIndex, mat) => {
        if(rowIndex === 0) {return row;}
        const previousRow = mat[rowIndex - 1];
        return row.map((cell, cellIndex) => {
            return cell > previousRow[cellIndex] ? cell - previousRow[cellIndex] : 0;            
        });        
    });

    const lateralSurfaceArea = computeMatrix(lateralAreaAccumulation);
    return (2 * frontSurfaceArea  + (2 * topSurfaceArea) + (2 * lateralSurfaceArea));
}

function computeMatrix(mat) {
    return mat.reduce((acc, row) => {
        return acc + row.reduce((rowFrontAreaAcc, cell) => {
            return rowFrontAreaAcc + cell;
        }, 0);
    }, 0);
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
        console.log({ output, expectedOutput });
        assert.ok(output === expectedOutput, `Test case ${index + 1} failed`);
    } catch (err) {

    }

});

