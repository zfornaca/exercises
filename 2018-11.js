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

// November 29
// conference room booking
// (no link)

function confRoomTest(events) {
  let booked = new Set();

  for (let evt of events) {
    let nums = [];
    for (let i = evt.start; i <= evt.end; i++) {
      nums.push(i);
    }

    for (let num of nums) {
      if (booked.has(num)) {
        return false;
      }
      booked.add(num);
    }

  }
  return true;
}

// November 30
// Partition labels
// https://leetcode.com/problems/partition-labels/

var partitionLabels = function(S) {
  const lastIndex = {};
  
  for (let i = 0; i < S.length; i++) {
      lastIndex[S[i]] = i;
  }
  
  const partitionLengths = [];
  let partitionStart = 0;
  let partitionEnd = lastIndex[S[0]] // 8
  
  if (partitionEnd === partitionStart) {
      // necessary if first char is complete partition
      partitionLengths.push(1);
      partitionStart += 1;
  }
  
  for (let j = 1; j < S.length; j++) {
      partitionEnd = Math.max(partitionEnd, lastIndex[S[j]]); // 8
      if (partitionEnd <= j) {
          // this is a complete eligible partition
          partitionLengths.push(partitionEnd - partitionStart + 1);
          partitionStart = partitionEnd + 1;
      
      }
  }
  
  return partitionLengths;
  
};

// November 30
// Masking personal information
// https://leetcode.com/problems/masking-personal-information/

var maskPII = function(S) {
    
  if (/[a-zA-Z]/.test(S[0])) {
      // treat as email
      const [name, domain] = S.split('@')
      let masked = `${name[0]}*****${name[name.length-1]}@${domain}`;
      return masked.toLowerCase();

  } else {
      // treat as phone number
      const digits = [];
      const formatted = [];
      for (let c of S) {
          if (/[0-9]/.test(c)) digits.push(c);
      }
      if (digits.length > 10) formatted.push('+');
      while (digits.length) {
          let rem = digits.length
          if (rem <= 4) formatted.push(digits.shift())
          else {
              formatted.push('*')
              digits.shift()
          }
          // formatted.push(digits.shift());
          if ([11, 8, 5].includes(rem)) formatted.push('-')
      }
      return formatted.join('')
  }
};