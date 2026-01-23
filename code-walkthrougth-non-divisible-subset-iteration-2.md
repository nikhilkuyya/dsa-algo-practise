# maxNonDivisibleSubset 

const s = [ 1, 2, 3, 4, 5, 6 ]; 
const k = 3;    

/ maxNonDivisibleSubset
const set = [ 1, 2, 3, 4, 5, 6 ]; 
const divisor = 3;
const numberOfElements = 6;

/ for iteration
targetSize = 6; check targeSize >= 1
foundSubset = null;

/ generateCombination
startIndex = 0
remainingToPick = 6
currentIndexPath = []

/ for iteration
i = 0; check: i <= (6 - 6) = true
currentIndexPath = [0]
  // generateCombination 
    startIndex = 1
    remainingToPick = 5
    currentIndexPath = [0, 1]
    // for
    i = 1; i <= (6 - 5) = true
        /// generateCombination
        2, 4 , [0 ,1 ]
        


    


