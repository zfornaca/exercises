// Feb 18
// Largest perimeter triangle
// https://leetcode.com/problems/largest-perimeter-triangle/

var largestPerimeter = function(A) {
  A.sort((a, b) => b - a);
  let i = 0;
  let output = 0;
  while (output === 0 && A.length >= i + 3) {
    if (A[i] < A[i + 1] + A[i + 2]) {
      output = A[i] + A[i + 1] + A[i + 2];
    }
    i++;
  }
  return output;
};

// Feb 18
// Longest uncommon subsequence I
// https://leetcode.com/problems/longest-uncommon-subsequence-i/

var findLUSlength = function(a, b) {
  if (a === b) return -1;
  else return Math.max(a.length, b.length);
};
