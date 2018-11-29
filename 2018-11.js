// November 26
// Unique email addresses
// https://leetcode.com/problems/unique-email-addresses/

var numUniqueEmails = function(emails) {
  let uniques = new Set();
  for (let email of emails) {
    let emailHalves = email.split('@');
    let beforePlus = emailHalves[0].split('+');
    beforePlus = beforePlus[0]
      .split('')
      .filter(c => c != '.')
      .join('');
    let fixedEmail = [beforePlus, emailHalves[1]].join('@');
    uniques.add(fixedEmail);
  }
  return uniques.size;
};

// November 26
// Robot return to origin
// https://leetcode.com/problems/robot-return-to-origin/

var judgeCircle = function(moves) {
  let vert = 0;
  let hori = 0;

  for (let mv of moves) {
    if (mv === 'U') vert += 1;
    else if (mv === 'D') vert -= 1;
    else if (mv === 'L') hori -= 1;
    else if (mv === 'R') hori += 1;
  }

  if (vert !== 0 || hori !== 0) return false;

  return true;
};

// Come back to
// https://leetcode.com/problems/counting-bits/

// November 27
// Delete duplicate emails
// https://leetcode.com/problems/delete-duplicate-emails/

DELETE FROM Person WHERE Id NOT IN
(SELECT * FROM (SELECT MIN(Id) FROM Person GROUP BY Email) AS Uniques);

// November 27
// Smallest range 1
// https://leetcode.com/problems/smallest-range-i/submissions/

var smallestRangeI = function(A, K) {
  let minA = Infinity;
  let maxA = -Infinity;
  for (let n of A) {
      minA = Math.min(minA, n);
      maxA = Math.max(maxA, n);
  }
  let diff = maxA - minA - (2 * K);
  return Math.max(diff, 0);
};

// November 27
// Maximum subarray
// https://leetcode.com/problems/maximum-subarray/

var maxSubArray = function(nums) {
  let largestSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
      currentSum = Math.max(nums[i], nums[i] + currentSum);
      
      largestSum = Math.max(currentSum, largestSum);
  }
  
  return largestSum;
};

// November 28
// Minimum path sum (DP)
// https://leetcode.com/problems/minimum-path-sum/

var minPathSum = function(grid) {
  let h = grid.length;
  let w = grid[0].length;
  
  for (let i = 0; i < h-1; i++) grid[i+1][0] += grid[i][0];
  for (let j = 0; j < w-1; j++) grid[0][j+1] += grid[0][j];
  
  for (let i = 1; i < h; i++) {
      for (let j = 1; j < w; j++) {
          grid[i][j] += Math.min(grid[i][j-1], grid[i-1][j])
      }
  }
  
  return grid[h-1][w-1]
  
}

// November 28
// Longest harmonious subsequence
// https://leetcode.com/problems/longest-harmonious-subsequence/

var findLHS = function(nums) {
  let hash = {};
  let best = 0;

  nums.forEach(num => num in hash ? hash[num]++ : hash[num] = 1)
  
  Object.keys(hash).forEach(el => {
      if (hash.hasOwnProperty(~~el+1)) {
          best = Math.max(best, hash[el]+hash[~~el+1])
      }
  })
      
  return best
};

// November 29
// Linked list components
// https://leetcode.com/problems/linked-list-components/

var numComponents = function(head, G) {
  let setG = new Set(G);
  let isMatch = false;
  let compCt = 0;
  
  while(head !== null) {
      v = head.val;
      if (setG.has(v)) {
          isMatch = true;
      } else if (isMatch === true) {
          isMatch = false;
          compCt += 1;
      }
      head = head.next;
  }
  
  if (isMatch) compCt += 1;
  return compCt;
};

// November 29
// Valid square
// https://leetcode.com/problems/valid-square/

function validSquare(...coords) {
  let distances = [];
  for (let i = 0; i < coords.length-1; i++) {
      for (let j = i+1; j < coords.length; j++) {
          distances.push(pythagSq(coords[i], coords[j]));
      }
  }

  let sideSz = Math.min(...distances);
  let crossSz = Math.max(...distances);
  let sideCt = 0;
  let crossCt = 0;

  for (let dist of distances) {
      if (dist === sideSz) sideCt++;
      else if (dist === crossSz) crossCt++;
      else return false;
  }
  
  return sideCt === 4 && crossCt === 2;
  
}

function pythagSq(m, n) {
  let sideA = (m[0]-n[0])**2
  let sideB = (m[1]-n[1])**2
  return sideA+sideB
}