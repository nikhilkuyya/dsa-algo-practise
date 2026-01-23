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
    const positions = (new Array(n)).fill(0).map((_, index) => index + 1);
    
    const obstacleRegistry = obstacles.reduce((reg,obs) => { 
        const [key,value] = obs;
        const alreadyValue = reg.get(key);
        if(alreadyValue) {
            alreadyValue.add(value);
        }else {
            const valueSet = new Set();
            reg.set(key, valueSet.add(value))
        }
        return reg;
    },new Map());

    const queenMovestoLeft = getMoves(queenCol, queenRow, (col) => col - 1, (col) => col >= 0, obstacleRegistry);

    const queenMovestoRight = [];    
    for (let startMovTemp = queenCol; startMovTemp <= n; startMovTemp++) {
        queenMovestoRight.push([queenRow, startMovTemp]);
    }

    const queenMovesToUp = [];
    for (let startMovTemp = queenRow; startMovTemp <= n; startMovTemp++) {
        queenMovesToUp.push([startMovTemp, queenCol]);
    }

    const queenMovesToDown = [];
    for (let startMovTemp = queenRow; startMovTemp >= 0; startMovTemp--) {
        queenMovesToDown.push([startMovTemp, queenCol]);
    }

    const centerForMainDiagnal = [queenRow, queenCol];
    const initialMainDiagnal = [centerForMainDiagnal];
    const mainDiagnal = positions.reduce((diagTemp, pos) => {
        const downSidePos = [queenRow - pos, queenCol - pos];
        const upSidePos = [queenRow + pos, queenCol + pos];
        const combinedPos = [downSidePos, upSidePos];
        diagTemp.push(combinedPos);
        return diagTemp;
    }, [initialMainDiagnal]);

    // TODO: Cleanup the logic for antiMainDiagnal
    const antiMainDiagnal = mainDiagnal.map((positionArr, index) => {
        if (index === 0) {
            return positionArr;
        }
        const [downSidePos, upSidePos] = positionArr;

        const mirrorDownSidePos = [downSidePos[0] + (2 * (index)), downSidePos[1]];
        const mirrorUpSidePos = [upSidePos[0] - (2 * index), upSidePos[1]];
        return [mirrorDownSidePos, mirrorUpSidePos];
    });


    const diagnalMoves = [...mainDiagnal, ...antiMainDiagnal].flat();
    // here we removing the same center position of the diagnal moves as it same reference.
    const uniqueDiagnalMoves = [...new Set(diagnalMoves)];
    const filteredDiagnalMoves = uniqueDiagnalMoves.filter((pos) => {
        const rowPos = pos[0];
        const colPos = pos[1];
        const rowInBox = rowPos >= 1 && rowPos <= n;
        const colInBox = colPos >= 1 && colPos <= n;
        const isInBox = rowInBox && colInBox;
        return isInBox;
    });

    const queenMoves = [...queenMovestoLeft, ...queenMovestoRight, ...queenMovesToUp,...queenMovesToDown, ...filteredDiagnalMoves];

    // plot the queen moves on the board    
    const board = printBoard(n, queenMoves, obstacles);
    console.log(board);

}

function getMoves(startPosition, constant, updatePosition, conditionToCheck,registry){
    const arr = [];
    let startMovTemp = startPosition;
    let isObstacled = false;
    while(conditionToCheck(startMovTemp) && !isObstacled) {
        const rowRegistry = registry.get(startMovTemp);
        if(rowRegistry) {
            isObstacled = rowRegistry.has(startMovTemp);
        }
        if(!isObstacled) {
            arr.push([constant, startMovTemp]);
        }        
        startMovTemp = updatePosition(startMovTemp);
    }
    return arr.slice();
}

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

queensAttack(5, 0, 4, 3, []);