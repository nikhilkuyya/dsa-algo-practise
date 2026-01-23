const s = [ 1, 2, 3, 4, 5, 6 ]; // input set (distinct integers)
const k = 3;                    // divisor

/**
 * Approach (step-by-step):
 * 1) Problem: find a largest subset S' of S such that for every pair (a, b) in S',
 *    (a + b) % k !== 0 (no pair sums to a multiple of k).
 * 2) High-level strategy: try subset sizes from largest to smallest. For each size,
 *    generate all combinations of that size and verify whether the combination
 *    satisfies the pairwise constraint. The first valid combination found (when
 *    sizes are checked descending) is guaranteed to be maximal, so we can stop.
 * 3) Generating combinations: use a recursive DFS to build combinations of
 *    indices. This keeps memory usage small and allows easy pruning.
 * 4) Validating a combination: check all unordered pairs inside the chosen
 *    combination; as soon as one pair sums to a multiple of k, reject it.
 * 5) Pruning and early exits:
 *    - If a valid subset is found for the current size, return immediately.
 *    - While generating combinations, stop deeper recursion once a valid subset
 *      has already been discovered (global early stop).
 * 6) Complexity: this is still exponential in the worst case. Generating all
 *    combinations of size m costs O(C(n,m)) and checking pairwise sums costs
 *    O(m^2) per combination. This approach is intended for learning and
 *    correctness, not large-scale performance.
 */

function maxNonDivisibleSubset(set, divisor) {
  // Number of elements in the input set
  const numberOfElements = set.length;

  // Try subset sizes from largest possible down to 1.
  // Checking larger sizes first allows an early return as soon as we find a maximal valid subset.
  for (let targetSize = numberOfElements; targetSize >= 1; targetSize--) {
    // This variable will hold a valid subset of the current target size if one is found.
    // We use `null` to mean "not found yet".
    let foundSubset = null;

    /**
     * Recursive helper to generate combinations of indices.
     * - startIndex: next index in S we can consider including
     * - remainingToPick: how many more indices we need to pick to reach targetSize
     * - currentIndexPath: array of chosen indices so far
     */
    function generateCombination(startIndex, remainingToPick, currentIndexPath) {
      // If we already found a valid subset elsewhere, stop further work (global early exit).
      if (foundSubset) return;

      // If we've chosen the required number of indices, validate this combination.
      if (remainingToPick === 0) {
        // Build the actual subset elements from the chosen indices.
        const candidateSubset = currentIndexPath.map(idx => set[idx]);

        // Validate the candidate by checking all unordered pairs.
        // If any pair sums to a multiple of k, the candidate is invalid.
        for (let i = 0; i < candidateSubset.length; i++) {
          for (let j = i + 1; j < candidateSubset.length; j++) {
            const sum = candidateSubset[i] + candidateSubset[j];
            if (sum % divisor === 0) {
              // Candidate is invalid; stop validation and backtrack.
              return;
            }
          }
        }

        // If validation passed, record the valid subset (make a shallow copy for safety).
        foundSubset = candidateSubset.slice();
        return;
      }

      // Pruning: ensure there are enough indices left to pick the remaining ones.
      // The last valid starting index is (numberOfElements - remainingToPick).
      for (let i = startIndex; i <= numberOfElements - remainingToPick; i++) {
        // Choose index i and recurse to choose the rest.
        currentIndexPath.push(i);
        generateCombination(i + 1, remainingToPick - 1, currentIndexPath);
        // Backtrack: remove the last chosen index before the next iteration.
        currentIndexPath.pop();
        // If a valid subset was found during deeper recursion, stop iterating.
        if (foundSubset) return;
      }
    }

    // Start generating combinations of the current target size.
    generateCombination(0, targetSize, []);

    // If we found a valid subset of this (maximal so far) size, return it immediately.
    if (foundSubset) return foundSubset;
  }

  // If no valid non-empty subset exists (edge case), return an empty array.
  return [];
}

// Example run: prints one maximal subset (array). For the given `s` and `k`
// the expected result size is 3 (one possible subset: [1, 4, 3] or [1,4,6] depending on search order).
console.log('Input set:', s);
console.log('Divisor k:', k);
const resultSubset = maxNonDivisibleSubset(s, k);
console.log('One maximal subset found:', resultSubset);
console.log('Size of subset:', resultSubset.length);