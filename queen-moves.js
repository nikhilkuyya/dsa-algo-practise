function getMoves({ startPosition,
    constant,
    getPosition,
    updatePosition,
    conditionToCheck,
    registry,
    queenPosition,
    sizeOfBoard
}) {
    let count = 0;
    let startMovTemp = startPosition;
    let isObstacled = false;
    let position = getPosition(constant, startMovTemp, queenPosition);
    while (conditionToCheck({ position, startMovTemp, constant, queenPosition, sizeOfBoard }) && !isObstacled) {
        position = getPosition(constant, startMovTemp, queenPosition)
        if (registry) {
            const [row, col] = position;
            isObstacled = registry.has(row) && registry.get(row).has(col);
        }
        if (!isObstacled) {
            count++;
        }
        startMovTemp = updatePosition(startMovTemp);
    }
    return count;
}

/*
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */
function queensAttack(n, k, r_q, c_q, obstacles) {
    // Write your code here    
    const queenRow = r_q;
    const queenCol = c_q;
    const queenPosition = [queenRow, queenCol];
    const obstacleRegistry = obstacles.reduce((reg, obs) => {
        const [key, value] = obs;
        const alreadyValue = reg.get(key);
        if (alreadyValue) {
            alreadyValue.add(value);
        } else {
            const valueSet = new Set();
            reg.set(key, valueSet.add(value))
        }
        return reg;
    }, new Map());

    const queenMovestoLeft = getMoves({
        startPosition: queenCol - 1,
        constant: queenRow,
        getPosition: (constant, startMovTemp) => [constant, startMovTemp],
        updatePosition: (col) => col - 1,
        conditionToCheck: ({ position,  queenPosition, sizeOfBoard }) => {
            const [queenRow, queenCol] = queenPosition;
            const [ row, col ] = position;
            return row === queenRow && col < queenCol && col > 0;
        },
        registry: obstacleRegistry,
        queenPosition: queenPosition,
        sizeOfBoard: n,
    });

    const queenMovestoRight = getMoves({
        startPosition: queenCol + 1,
        constant: queenRow,
        getPosition: (constant, startMovTemp) => [constant, startMovTemp],
        updatePosition: (col) => col + 1,
        conditionToCheck: ({ position, queenPosition, sizeOfBoard }) => {
            const [queenRow, queenCol] = queenPosition;
            const [ row, col ] = position;
            return row === queenRow && col > queenCol && col <= sizeOfBoard;
        },
        registry: obstacleRegistry,
        queenPosition: queenPosition,
        sizeOfBoard: n
    });

    const queenMovesToUp = getMoves({
        startPosition: queenRow + 1,
        constant: queenCol,
        getPosition: (constant, startMovTemp) => [startMovTemp, constant],
        updatePosition: (row) => row + 1,
        conditionToCheck: ({ position, queenPosition, sizeOfBoard }) => {
            const [queenRow, queenCol] = queenPosition;
            const [ row, col ] = position;
            return col === queenCol && row > queenRow && row <= sizeOfBoard;
        },
        registry: obstacleRegistry,
        queenPosition: queenPosition,
        sizeOfBoard: n
    });

    const queenMovesToDown = getMoves({
        startPosition: queenRow - 1,
        constant: queenCol,
        getPosition: (constant, startMovTemp) => [startMovTemp, constant],
        updatePosition: (row) => row - 1,
        conditionToCheck: ({ position, queenPosition, sizeOfBoard }) => {
            const [queenRow, queenCol] = queenPosition;
            const [ row, col ] = position;
            return col === queenCol && row < queenRow && row > 0;
        },
        registry: obstacleRegistry,
        queenPosition: queenPosition,
        sizeOfBoard: n
    });

    const mainDiagnalDown = getMoves({
        startPosition: 1,
        constant: 0,
        conditionToCheck: ({ position, queenPosition, sizeOfBoard }) => {
            const [queenRow, queenCol] = queenPosition;
            const [ row, col ] = position;
            console.log({ row, col, queenRow, queenCol });
            return row < queenRow && col < queenCol && row > 0 && col > 0;
        },
        getPosition: (constant, startMovTemp, queenPosition) => { 
            return [queenPosition[0] - startMovTemp, queenPosition[1] - startMovTemp]; 
        },
        queenPosition,
        registry: obstacleRegistry,
        sizeOfBoard: n,
        updatePosition: (position) => position + 1
    })

    const mainDiagnalUps = getMoves({
        startPosition: 1,
        constant: 0,
        conditionToCheck: ({ startMovTemp, constant, queenPosition, sizeOfBoard }) => {
            const row = queenPosition[0];
            const col = queenPosition[1];
            return ((startMovTemp + row) <= sizeOfBoard) && (startMovTemp < col);
        },
        getPosition: (constant, startMovTemp, queenPosition) => {
             return [queenPosition[0] + startMovTemp, queenPosition[1] + startMovTemp]; 
        },
        queenPosition,
        registry: obstacleRegistry,
        sizeOfBoard: n,
        updatePosition: (position) => position + 1
    })

    const antiMainDiagnalDown = getMoves({
        startPosition: 1,
        constant: 0,
        conditionToCheck: ({ startMovTemp, constant, queenPosition, sizeOfBoard }) => {
            const row = queenPosition[0];
            const col = queenPosition[1];
            return (startMovTemp  < row) && ((startMovTemp + col) <= sizeOfBoard);
        },
        getPosition: (constant, startMovTemp, queenPosition) => { return [queenPosition[0] - startMovTemp, queenPosition[1] + startMovTemp]; },
        queenPosition,
        registry: obstacleRegistry,
        sizeOfBoard: n,
        updatePosition: (position) => position + 1
    })

    const antiMainDiagnalUps = getMoves({
        startPosition: 1,
        constant: 0,
        conditionToCheck: ({ startMovTemp, constant, queenPosition, sizeOfBoard }) => {
            const row = queenPosition[0];
            const col = queenPosition[1];
            return ((startMovTemp + row) <= sizeOfBoard) && (startMovTemp < col);
        },
        getPosition: (constant, startMovTemp, queenPosition) => { return [queenPosition[0] + startMovTemp, queenPosition[1] - startMovTemp]; },
        queenPosition,
        registry: obstacleRegistry,
        sizeOfBoard: n,
        updatePosition: (position) => position + 1
    })

    const totalMoves = [queenMovestoLeft, queenMovestoRight, queenMovesToUp, queenMovesToDown, mainDiagnalDown, mainDiagnalUps, antiMainDiagnalDown, antiMainDiagnalUps];
    return totalMoves.reduce((acc, curr) => acc + curr, 0);
}

// Refactor the object properties to make it more readable.

// board start with bottom left corner and end with top right corner.
function printBoard(n, filteredDiagnalMoves, obstacles) {
    const board = (new Array(n)).fill(0).map((_, rowIndex) => rowIndex + 1).map((row) => {
        return (new Array(n)).fill(0).map((_, colIndex) => colIndex + 1).map((col) => {
            // update the includes logic to check if the position is in the filteredDiagnalMoves array
            const isInFilteredDiagnalMoves = filteredDiagnalMoves.some((filteredPos) => {
                return filteredPos[0] === row && filteredPos[1] === col;
            });
            if (isInFilteredDiagnalMoves) {
                return 'Q';
            }
            const isInObstacles = obstacles.some((obstacle) => {
                return obstacle[0] === row && obstacle[1] === col;
            });
            if (isInObstacles) {
                return 'X';
            }
            return '.';
        });
    });
    // reverse the ordering of the board
    //console.log(reversedBoard);
    const reversedRowBoard = board.reverse();
    return reversedRowBoard;
}


/**
 * 
 * 
 * console.log('test case 1 with board of 6 and queen at 3,3');
let possibleMoves = queensAttack(6, 0, 3, 3, []);
let boardWithMoves = console.log(printBoard(6, possibleMoves, []), possibleMoves, possibleMoves.length);

console.log('test case 2 with board of 5 and queen at 3,3');
possibleMoves = queensAttack(5, 1, 3, 3, []);
boardWithMoves = console.log(printBoard(5, possibleMoves, []), possibleMoves, possibleMoves.length);

console.log('test case 3 with board of 5 and queen at 3,3 and obstacle at 4,4');
possibleMoves = queensAttack(5, 1, 3, 3, [[4, 4]]);
boardWithMoves = console.log(printBoard(5, possibleMoves, [[4, 4]]), possibleMoves, possibleMoves.length);
console.log('test case 3 with board of 5 and queen at 3,3 and obstacle at 2,2');
possibleMoves = queensAttack(5, 1, 3, 3, [[2, 2]]);
boardWithMoves = console.log(printBoard(5, possibleMoves, [[2, 2]]), possibleMoves, possibleMoves.length);

// 4 0 4 4
console.log('test case 4 with board of 4 and queen at 4,4');
possibleMoves = queensAttack(4, 0, 4, 4, []);
boardWithMoves = console.log(printBoard(4, possibleMoves, []), possibleMoves, possibleMoves.length);
// 1 0 1 1
console.log('test case 5 with board of 1 and queen at 1,1');
possibleMoves = queensAttack(1, 0, 1, 1, []);
boardWithMoves = console.log(printBoard(1, possibleMoves, []), possibleMoves, possibleMoves.length);


// 5 3 4 3 5 5 4 2 2 3
console.log('test case 6 with board of 5 and queen at 4,3 and obstacles at 5,5, 4,2, 2,3');
possibleMoves = queensAttack(5, 3, 4, 3, [[5, 5], [4, 2], [2, 3]]);
boardWithMoves = console.log(printBoard(5, possibleMoves, [[5, 5], [4, 2], [2, 3]]), possibleMoves, possibleMoves.length);
 * 
 */

const expected = 308369;
const output = queensAttack(100000, 0, 4187, 3169, []);
console.log(output, expected);
