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

// December 7
// Range sum of BST
// https://leetcode.com/problems/range-sum-of-bst/

var rangeSumBST = function(root, L, R) {
  let sum = 0;
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();

    if (node.val >= L && node.val <= R) sum += node.val;

    if (node.val < L) {
      if (node.right) stack.push(node.right);
    } else if (node.val > R) {
      if (node.left) stack.push(node.left);
    } else {
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }
  return sum;
};

// December 7
// Max increase to keep city skyline
// https://leetcode.com/problems/max-increase-to-keep-city-skyline/

var maxIncreaseKeepingSkyline = function(grid) {
  let increase = 0;
  // horiMax is max value per row. e.g. [8, 7, 9, 3]
  let horiMax = new Array(grid.length).fill(0);
  // vertMax is max value per column. e.g. [9, 4, 8, 7]
  let vertMax = new Array(grid[0].length).fill(0);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      horiMax[i] = Math.max(grid[i][j], horiMax[i]);
      vertMax[j] = Math.max(grid[i][j], vertMax[j]);
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      increase += Math.min(horiMax[i], vertMax[j]) - grid[i][j];
    }
  }

  return increase;
};

// December 7
// Unique morse code worse
// https://leetcode.com/problems/unique-morse-code-words/
// alternate solutions included turning the morse array into a map, adding a second array with alpha letters to make a pseudo-map (both avoiding charCodeAt)
// and also using reduce

var uniqueMorseRepresentations = function(words) {
  const morse = [
    '.-',
    '-...',
    '-.-.',
    '-..',
    '.',
    '..-.',
    '--.',
    '....',
    '..',
    '.---',
    '-.-',
    '.-..',
    '--',
    '-.',
    '---',
    '.--.',
    '--.-',
    '.-.',
    '...',
    '-',
    '..-',
    '...-',
    '.--',
    '-..-',
    '-.--',
    '--..'
  ];

  const transformations = new Set();

  for (let word of words) {
    const morsified = [];
    for (let ltr of word) {
      morsified.push(morse[ltr.charCodeAt(0) - 97]);
    }
    transformations.add(morsified.join(''));
  }
  return transformations.size;
};

// December 7
// Maximum binary tree
// https://leetcode.com/problems/maximum-binary-tree/

var constructMaximumBinaryTree = function(nums) {
  if (!nums.length) return null;
  const bigIdx = nums.reduce((maxIdx, val, idx) => {
    return nums[maxIdx] > val ? maxIdx : idx;
  }, 0);

  const node = new TreeNode(nums[bigIdx]);
  node.left = constructMaximumBinaryTree(nums.slice(0, bigIdx));
  node.right = constructMaximumBinaryTree(nums.slice(bigIdx + 1));

  return node;
};

// December 8
// Reveal cards in increasing order
// https://leetcode.com/problems/reveal-cards-in-increasing-order/

var deckRevealedIncreasing = function(deck) {
  let indices = Array.from({ length: deck.length }, (v, i) => i);
  let output = new Array(deck.length);
  deck.sort((a, b) => a - b);

  for (let card of deck) {
    output[indices.shift()] = card;
    if (indices.length) indices.push(indices.shift());
  }

  return output;
};
