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
