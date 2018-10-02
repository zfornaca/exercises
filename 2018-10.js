// Oct 1: Minimum moves to equal array elements
// https://leetcode.com/problems/minimum-moves-to-equal-array-elements/description/

var minMoves = function(nums) {
  let min = Infinity;
  let sum = 0;
  for (let num of nums) {
    min = Math.min(min, num);
    sum += num;
  }
  return sum - min * nums.length;
};

// Oct 2: Maximum Product of Three Numbers
// https://leetcode.com/problems/maximum-product-of-three-numbers/description/

// This uses sort, which is better time complex. than triple-nested loops (or even double), but mutates the array. If I make a copy to avoid that I would instead worsen space complexity.
// The alternative would be to track the five relevant items (biggest 3, smallest 2, but dealing with short input arrays is trickier)
var maximumProduct = function(nums) {
  nums.sort((a, b) => a - b);
  const len = nums.length;
  let doubleNegProd = nums[0] * nums[1] * nums[len - 1];
  let noNegProd = nums[len - 1] * nums[len - 2] * nums[len - 3];
  return Math.max(doubleNegProd, noNegProd);
};
