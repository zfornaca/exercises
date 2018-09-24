// Roman > Integer conversion
// https://leetcode.com/problems/roman-to-integer/description/

var romanToInt = function(s) {
  let sum = 0;
  let prevVal = 0;
  let romanVals = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };
  for (let i = s.length - 1; i >= 0; i--) {
    let currentVal = romanVals[s[i]];
    if (currentVal < prevVal) {
      sum -= currentVal;
    } else {
      sum += currentVal;
    }
    prevVal = currentVal;
  }
  return sum;
};
