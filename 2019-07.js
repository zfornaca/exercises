// July 25
// Height Checker
// https://leetcode.com/problems/height-checker/

// Solution 1, just sort a copy and compare arrays for differences: O(n log n)

var heightChecker = function(heights) {
  let sortedHeights = heights.slice().sort((a, b) => a - b);
  let len = heights.length;
  let toMove = 0;

  for (let i = 0; i < len; i++) {
    if (heights[i] !== sortedHeights[i]) toMove++;
  }

  return toMove;
};

// Solution 2, tally heights and then use those tallies to determine what's out of place: O(n)

var heightChecker = function(heights) {
  let tally = new Array(101).fill(0);
  let outOfPlace = 0;

  heights.forEach(ht => tally[ht]++);

  tally.forEach((ct, idx) => {
    if (idx > 0) tally[idx] += tally[idx - 1];
  });

  heights.forEach((h, i) => {
    let minIdx = tally[h - 1];
    let maxIdx = tally[h] - 1;
    if (i > maxIdx || i < minIdx) outOfPlace++;
  });

  return outOfPlace;
};

// July 25
// Relative sort array
//

// Solution 1, generate head based on arr2 and tally of arr1, tail based on other arr1 elements: O(n log n) for the tail

var relativeSortArray = function(arr1, arr2) {
  const output = [];
  const tally = {};
  arr1.forEach(el => {
    tally.hasOwnProperty(el) ? tally[el]++ : (tally[el] = 1);
  });

  const set2 = new Set(arr2);

  const tail = arr1.filter(el => !set2.has(el)).sort((a, b) => a - b);

  arr2.forEach(val => {
    for (let i = 1; i <= tally[val]; i++) {
      output.push(val);
    }
  });

  return output.concat(tail);
};
