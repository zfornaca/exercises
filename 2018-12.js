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

// December 8
// Sort array by parity
// https://leetcode.com/problems/sort-array-by-parity/

// version A: constant space, mutate input
var sortArrayByParity = function(A) {
  let left = 0;
  let right = A.length - 1;

  while (left < right) {
    if (A[left] % 2 === 0) left++;
    else if (A[right] % 2 === 1) right--;
    else {
      [A[left], A[right]] = [A[right], A[left]];
    }
  }

  return A;
};

// version B: pure function, O(n) space
var sortArrayByParity = function(A) {
  let odds = [];
  let evens = [];
  for (num of A) {
    if (num % 2 === 0) evens.push(num);
    else odds.push(num);
  }

  return evens.concat(odds);
};

// December 8
// Delete columns to make sorted
// https://leetcode.com/problems/delete-columns-to-make-sorted/

var minDeletionSize = function(A) {
  let deletions = 0;

  // for each column (letter position in word)
  for (let i = 0; i < A[0].length; i++) {
    // for each word
    for (let j = 0; j < A.length - 1; j++) {
      if (A[j][i] > A[j + 1][i]) {
        deletions++;
        break;
      }
    }
  }

  return deletions;
};

// December 8
// Insert into a binary search tree
// https://leetcode.com/problems/insert-into-a-binary-search-tree/

var insertIntoBST = function(root, val) {
  if (root.val > val) {
    // look left
    if (root.left) insertIntoBST(root.left, val);
    else root.left = new TreeNode(val);
  } else {
    // look right
    if (root.right) insertIntoBST(root.right, val);
    else root.right = new TreeNode(val);
  }

  return root;
};

// December 8
// Flipping an image
// https://leetcode.com/problems/flipping-an-image/

var flipAndInvertImage = function(A) {
  for (let row of A) {
    let l = 0;
    let r = row.length - 1;
    while (l < r) {
      [row[l], row[r]] = [1 - row[r], 1 - row[l]];
      l++;
      r--;
    }
    if (l === r) row[l] = 1 - row[l];
  }
  return A;
};

// faster
var flipAndInvertImage = function(A) {
  return A.map(row => row.reverse().map(num => (num === 1 ? 0 : 1)));
};

// December 8
// Find and replace pattern
// https://leetcode.com/problems/find-and-replace-pattern/

var findAndReplacePattern = function(words, pattern) {
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  abcWords = words.map(word => patternConvert(word, letters));
  abcPattern = patternConvert(pattern, letters);

  return words.filter((word, idx) => {
    return abcPattern === abcWords[idx];
  });
};

var patternConvert = function(word, letters) {
  const mappedWord = [];
  const usedLetters = new Map();
  for (let ltr of word) {
    if (!usedLetters.has(ltr)) {
      usedLetters.set(ltr, letters[usedLetters.size]);
    }
    mappedWord.push(usedLetters.get(ltr));
  }
  return mappedWord.join('');
};

// December 9
// Binary tree pruning
// https://leetcode.com/problems/binary-tree-pruning/

var pruneTree = function(root) {
  if (!root) return null;
  if (!pruneTree(root.left)) root.left = null;
  if (!pruneTree(root.right)) root.right = null;
  return root.val || root.left || root.right ? root : null;
};

// December 9
// Merge two binary trees
// https://leetcode.com/problems/merge-two-binary-trees/

var mergeTrees = function(t1, t2) {
  if (!t1 || !t2) return t1 || t2;
  const t3 = new TreeNode(t1.val + t2.val);
  t3.left = mergeTrees(t1.left, t2.left);
  t3.right = mergeTrees(t1.right, t2.right);
  return t3;
};

// December 10
// DI string match
// https://leetcode.com/problems/di-string-match/

var diStringMatch = function(S) {
  // const A = Array.from(Array(S.length+1).keys());
  const output = [];
  let lowest = 0;
  let highest = S.length;
  for (let dir of S) {
    if (dir === 'I') output.push(lowest++);
    if (dir === 'D') output.push(highest--);
  }
  output.push(highest);
  return output;
};

// December 10
// All paths from source to target
// https://leetcode.com/problems/all-paths-from-source-to-target/

var allPathsSourceTarget = function(graph) {
  const validPaths = [];
  const currentPath = [];

  function dfs(node) {
    currentPath.push(node);
    if (node === graph.length - 1) validPaths.push(currentPath.slice(0));
    else {
      for (let next in graph[node]) {
        dfs(graph[node][next]);
      }
    }
    currentPath.pop();
  }
  dfs(0);
  return validPaths;
};

// December 10
// Self-dividing numbers
// https://leetcode.com/problems/self-dividing-numbers/

var selfDividingNumbers = function(left, right) {
  const output = [];
  for (num = left; num <= right; num++) {
    let selfDividing = true;
    for (let d of num.toString()) {
      if (num % +d !== 0) {
        selfDividing = false;
        break;
      }
    }
    if (selfDividing) output.push(num);
  }
  return output;
};

// December 10
// Swap salary
// https://leetcode.com/problems/swap-salary/

/*
UPDATE salary
SET sex = CASE
WHEN sex='m' THEN 'f'
WHEN sex='f' THEN 'm'
END;
*/

// December 10
// Score after flipping matrix
// https://leetcode.com/problems/score-after-flipping-matrix/

var matrixScore = function(A) {
  let sum = 0;
  let columnSums = [];

  // flip any row starting w/ 0
  for (let i = 0; i < A.length; i++) {
    if (A[i][0] === 0) {
      for (let j = 0; j < A[i].length; j++) {
        A[i][j] = 1 - A[i][j];
      }
    }
  }

  // record # of 1s in column, or its complement
  for (let k = 0; k < A[0].length; k++) {
    let oneCt = 0;
    for (let l = 0; l < A.length; l++) {
      oneCt += A[l][k];
    }
    columnSums.push(Math.max(oneCt, A.length - oneCt));
  }

  // calculate value
  let exp = 0;
  while (columnSums.length) {
    sum += columnSums.pop() * 2 ** exp++;
  }

  return sum;
};
