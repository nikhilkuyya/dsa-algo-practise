const s = [1, 2, 3, 4, 5, 6];
const k = 3;

function maxNonDivisibleSubset(S, k) {
  const numberOfElements = S.length;

  for (let targetSize = numberOfElements; targetSize >= 1; targetSize--) {
    let foundSubset = null;

    function generateCombination(startIndex, remainingToPick, currentIndexPath) {
      const indent = ' '.repeat(currentIndexPath.length * 2);
      console.log(`${indent}// generateCombination startIndex=${startIndex} remainingToPick=${remainingToPick} currentPath=[${currentIndexPath.join(', ')}]`);

      if (foundSubset) {
        console.log(`${indent}// already found; early exit`);
        return;
      }

      if (remainingToPick === 0) {
        const candidateSubset = currentIndexPath.map(idx => S[idx]);
        console.log(`${indent}// candidateSubset=[${candidateSubset.join(', ')}] -> validating...`);

        for (let i = 0; i < candidateSubset.length; i++) {
          for (let j = i + 1; j < candidateSubset.length; j++) {
            const sum = candidateSubset[i] + candidateSubset[j];
            if (sum % k === 0) {
              console.log(`${indent}  // reject: ${candidateSubset[i]} + ${candidateSubset[j]} = ${sum} is divisible by ${k}`);
              return;
            }
          }
        }

        foundSubset = candidateSubset.slice();
        console.log(`${indent}// valid subset FOUND: [${foundSubset.join(', ')}]`);
        return;
      }

      for (let i = startIndex; i <= numberOfElements - remainingToPick; i++) {
        console.log(`${indent}// choose i=${i} (element=${S[i]})`);
        currentIndexPath.push(i);
        generateCombination(i + 1, remainingToPick - 1, currentIndexPath);
        const popped = currentIndexPath.pop();
        console.log(`${indent}// backtrack from i=${popped}`);
        if (foundSubset) {
          console.log(`${indent}// stop iterating because foundSubset exists`);
          return;
        }
      }
    }

    console.log(`\n// targetSize = ${targetSize}`);
    generateCombination(0, targetSize, []);
    if (foundSubset) {
      console.log(`// returning subset of size ${targetSize}\n`);
      return foundSubset;
    } else {
      console.log(`// no valid subset of size ${targetSize} found`);
    }
  }

  return [];
}

// Example run
console.log('Input set:', s);
console.log('Divisor k:', k);
const resultSubset = maxNonDivisibleSubset(s, k);
console.log('One maximal subset found:', resultSubset);
console.log('Size of subset:', resultSubset.length);