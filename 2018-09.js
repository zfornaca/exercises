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

// Tracking tardies and absences
// https://leetcode.com/problems/student-attendance-record-i/description/
var checkRecord = function(s) {
  let absences = 0;
  let tardies = 0;
  for (let ltr of s) {
    if (ltr === 'L') {
      tardies++;
      if (tardies > 2) {
        return false;
      }
    } else {
      tardies = 0;
    }
    if (ltr === 'A') {
      absences++;
      if (absences > 1) {
        return false;
      }
    }
  }
  return true;
};
