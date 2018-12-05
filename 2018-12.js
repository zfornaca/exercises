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
