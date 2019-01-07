// January 2
// Monotonic array
// https://leetcode.com/problems/monotonic-array/

var isMonotonic = function(A) {
  if (A.length <= 2) return true;
  let dir;
  for (let i = 1; i < A.length; i++) {
    if (A[i - 1] === A[i]) continue;
    if (A[i - 1] > A[i]) {
      if (dir === 'pos') return false;
      dir = 'neg';
    } else {
      if (dir === 'neg') return false;
      dir = 'pos';
    }
  }
  return true;
};

// January 2
// Max area of island
// https://leetcode.com/problems/max-area-of-island/

var maxAreaOfIsland = function(grid) {
  let maxIsland = 0;

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (grid[i][j] === 1) {
        grid[i][j] = 0;
        let curIsland = chartIsland(grid, i, j);
        maxIsland = Math.max(curIsland, maxIsland);
      }
    });
  });

  return maxIsland;
};

function chartIsland(grid, i, j) {
  let curIsland = 0;
  let queue = [[i, j]];
  while (queue.length) {
    let coords = queue.shift();
    curIsland++;
    let [x, y] = [coords[0], coords[1]];
    if (x > 0 && grid[x - 1][y] === 1) {
      // north
      queue.push([x - 1, y]);
      grid[x - 1][y] = 0;
    }
    if (x < grid.length - 1 && grid[x + 1][y] === 1) {
      // south
      queue.push([x + 1, y]);
      grid[x + 1][y] = 0;
    }
    if (y > 0 && grid[x][y - 1] === 1) {
      // west
      queue.push([x, y - 1]);
      grid[x][y - 1] = 0;
    }
    if (y < grid[0].length - 1 && grid[x][y + 1] === 1) {
      // east
      queue.push([x, y + 1]);
      grid[x][y + 1] = 0;
    }
  }
  return curIsland;
}

// January 2
// Fair candy swap
// https://leetcode.com/problems/fair-candy-swap/

var fairCandySwap = function(A, B) {
  const setB = new Set(B);

  const sumA = A.reduce((acc, next) => acc + next);
  const sumB = B.reduce((acc, next) => acc + next);

  const target = (sumB - sumA) / 2;

  for (let bar of A) {
    if (setB.has(bar + target)) return [bar, bar + target];
  }
};

// January 2
// Max consecutive ones
// https://leetcode.com/problems/max-consecutive-ones/

var findMaxConsecutiveOnes = function(nums) {
  let curStreak = 0;
  let maxStreak = 0;

  nums.forEach(num => {
    if (num === 1) curStreak++;
    else {
      maxStreak = Math.max(curStreak, maxStreak);
      curStreak = 0;
    }
  });

  return Math.max(curStreak, maxStreak);
};

// January 3
// Product of array except self
// https://leetcode.com/problems/product-of-array-except-self/

var productExceptSelf = function(nums) {
  const output = new Array(nums.length).fill(1);

  let fore = 1;
  let aft = 1;

  for (let i = 0, j = nums.length - 1; i < nums.length; i++, j--) {
    output[i] *= fore;
    output[j] *= aft;
    fore *= nums[i];
    aft *= nums[j];
  }

  return output;
};

// January 3
// https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/
// Find all numbers disappeared in an array

var findDisappearedNumbers = function(nums) {
  nums.forEach(num => {
    let i = Math.abs(num) - 1;
    nums[i] = Math.abs(nums[i]) * -1;
  });

  const output = [];

  nums.forEach((num, j) => {
    if (num > 0) output.push(j + 1);
  });

  return output;
};

// January 3
// Teemo attacking
// https://leetcode.com/problems/teemo-attacking/

var findPoisonedDuration = function(timeSeries, duration) {
  let dot = 0;
  let fallOff = 0;

  timeSeries.forEach(startUp => {
    if (fallOff > startUp) {
      dot += duration + startUp - fallOff;
    } else {
      dot += duration;
    }
    fallOff = startUp + duration;
  });

  return dot;
};

// January 3
// Beautiful arrangement II
// https://leetcode.com/problems/beautiful-arrangement-ii/
// Struggled here b/c I didn't notice the absolute value pipes

var constructArray = function(n, k) {
  const output = [];
  for (let i = 1; i < n - k; i++) {
    output.push(i);
  }
  for (let j = 0; j <= k; j++) {
    if (j % 2 === 0) {
      // even
      output.push(n - k + Math.floor(j / 2));
    } else {
      // odd
      output.push(n - Math.floor(j / 2));
    }
  }
  return output;
};

// January 3
// Best time to buy and sell stock II
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/

var maxProfit = function(prices) {
  let profit = 0;
  let buyVal = prices[0];

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > buyVal) {
      profit += prices[i] - buyVal;
    }
    buyVal = prices[i];
  }
  return profit;
};

// January 4
// Array nesting
// https://leetcode.com/problems/array-nesting/

var arrayNesting = function(nums) {
  let maxSet = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === null) continue;

    let curIdx = i;
    let curSet = 0;
    curSet++;
    let nextIdx = nums[curIdx];
    nums[curIdx] = null;

    while (nextIdx !== i) {
      curIdx = nextIdx;
      curSet++;
      nextIdx = nums[curIdx];
      nums[curIdx] = null;
    }

    maxSet = Math.max(curSet, maxSet);
  }

  return maxSet;
};

// January 7
// Contains duplicate
// https://leetcode.com/problems/contains-duplicate/

var containsDuplicate = function(nums) {
  let seen = new Set();

  for (let num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
};
