// December 3
// Peak index in a mountain array
// https://leetcode.com/problems/peak-index-in-a-mountain-array/

var peakIndexInMountainArray = function(A) {
  let left = 0;
  let right = A.length - 1;

  while (true) {
    let i = Math.floor((left + right) / 2);

    if (A[i] < A[i - 1]) {
      // if we need to move left
      right = i;
    } else if (A[i] < A[i + 1]) {
      // if we need to move right
      left = i;
    } else {
      // we found it and can return
      return i;
    }
  }
};

// December 3
// Majority element
// https://leetcode.com/problems/majority-element/

var majorityElement = function(nums) {
  let topCt = 0;
  let topEl;
  let hash = {};

  for (let num of nums) {
    hash[num] = hash[num] + 1 || 1;
    if (topCt < hash[num]) {
      topEl = num;
      topCt = hash[num];
    }
    if (topCt > nums.length / 2) break;
  }
  return topEl;
};

var majorityElement = function(nums) {
  let candidate;
  let ct = 0;

  for (let num of nums) {
    if (ct == 0) candidate = num;
    ct += num === candidate ? 1 : -1;
  }

  return candidate;
};

// December 4
// Counting bits
// https://leetcode.com/problems/counting-bits/

var countBits = function(num) {
  let output = [0];

  let power2 = 0.5;

  if (num == 0) return output;

  for (let i = 1; i <= num; i++) {
    if (i == power2 * 2) {
      power2 = power2 * 2;
      output[i] = 1;
    } else {
      output[i] = output[power2] + output[i - power2];
    }
  }

  return output;
};

// December 5
// Minimum add to make parentheses valid
// https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/

var minAddToMakeValid = function(S) {
  let missing = 0;
  let unpaired = [];

  for (let c of S) {
    if (c === '(') unpaired.push(c);
    else {
      if (unpaired.length) {
        unpaired.pop();
      } else missing++;
    }
  }
  return (missing += unpaired.length);
};

// December 5
// Sort characters by frequency
// https://leetcode.com/problems/sort-characters-by-frequency/

var frequencySort = function(s) {
  const map = {};
  const arr = [];

  [...s].forEach(c => (map[c] = map[c] + 1 || 1));

  for (let [key, val] of Object.entries(map)) {
    arr.push(key.repeat(val));
  }

  return arr.sort((a, b) => b.length - a.length).join('');
};

// December 6
// Sort array by parity II
// https://leetcode.com/problems/sort-array-by-parity-ii/

var sortArrayByParityII = function(A) {
  const strayOdds = [];
  const strayEvens = [];

  for (let i = 0; i < A.length; i++) {
    const evenIdx = i % 2 === 0;
    const evenVal = A[i] % 2 === 0;

    if (evenIdx && !evenVal) strayOdds.push(i);
    if (!evenIdx && evenVal) strayEvens.push(i);
  }

  while (strayOdds.length) {
    const m = strayOdds.pop();
    const n = strayEvens.pop();
    [A[m], A[n]] = [A[n], A[m]];
  }

  return A;
};

// December 6
// Hamming distance
// https://leetcode.com/problems/hamming-distance/

var hammingDistance = function(x, y) {
  let hamming = 0;
  const xor = (x ^ y).toString(2);
  for (let digit of xor) {
    if (digit === '1') hamming++;
  }
  return hamming;
};
