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

// December 10
// Array pertition I
// https://leetcode.com/problems/array-partition-i/

var arrayPairSum = function(nums) {
  return nums
    .sort((a, b) => a - b)
    .reduce((sum, num, i) => (i % 2 === 0 ? (sum += num) : sum));
};

// December 10
// Number of recent calls
// https://leetcode.com/problems/number-of-recent-calls/

var RecentCounter = function() {
  this.timestamps = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  this.timestamps.push(t);
  let calls = 0;
  for (let i = this.timestamps.length - 1; i >= 0; i--) {
    if (this.timestamps[i] + 3000 < t) break;
    calls++;
  }
  return calls;
};

// 2nd ver, almost half the runtime

var RecentCounter = function() {
  this.timestamps = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  this.timestamps.push(t);
  while (this.timestamps[0] + 3000 < t) {
    this.timestamps.shift();
  }
  return this.timestamps.length;
};

// December 11
// Flip equivalent binary trees
// https://leetcode.com/problems/flip-equivalent-binary-trees/

var flipEquiv = function(root1, root2) {
  if (!root1 && !root2) return true;
  if ((!root1 && root2) || (root1 && !root2)) return false;

  if (root1.val !== root2.val) return false;

  const llMatch =
    flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right);

  const lrMatch =
    flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left);

  return llMatch || lrMatch;
};

// December 11
// Battleships in a board
// https://leetcode.com/problems/battleships-in-a-board/

var countBattleships = function(board) {
  let shipCt = 0;

  board.forEach((row, i) => {
    row.forEach((slot, j) => {
      let noXAbove = i === 0 || board[i - 1][j] === '.';
      let noXLeft = j === 0 || board[i][j - 1] === '.';
      if (noXAbove && noXLeft && slot === 'X') shipCt++;
    });
  });

  return shipCt;
};

// Below: solved the wrong problem (is battleship board valid)
// var validBoard = function(board) {
//     return board.every((row,i) => {
//         return row.every((slot,j) => {
//             if (slot === '.') return true;
//             console.log(i, j)

//             if(((i-1>=0 && board[i-1][j] === 'x') || (i+1<board.length && board[i+1][j] === 'x')) &&
//                (board[i][j-1] === 'x' || board[i][j+1] === 'x')) return false;

//             return true;
//         })
//     })

// };

// December 11
// Complex number multiplication
// https://leetcode.com/problems/complex-number-multiplication/

var complexNumberMultiply = function(a, b) {
  a = a.split('+');
  b = b.split('+');
  const aR = +a[0];
  const aI = a[1][0] === '-' ? a[1].slice(1, -1) * -1 : a[1].slice(0, -1);
  const bR = +b[0];
  const bI = b[1][0] === '-' ? b[1].slice(1, -1) * -1 : b[1].slice(0, -1);
  const realProd = aR * bR - aI * bI;
  const imagProd = aR * bI + aI * bR;
  return `${realProd}+${imagProd}i`;
};

// December 11
// Projection area of 3D shapes
// https://leetcode.com/problems/projection-area-of-3d-shapes/

var projectionArea = function(grid) {
  let xySum = 0;
  let colMaxes = new Array(grid.length).fill(0);
  let rowMaxes = new Array(grid[0].length).fill(0);
  grid.forEach((row, y) => {
    row.forEach((cube, x) => {
      xySum += cube === 0 ? 0 : 1;
      rowMaxes[x] = Math.max(rowMaxes[x], cube);
      colMaxes[y] = Math.max(colMaxes[y], cube);
    });
  });
  const xzSum = colMaxes.reduce((acc, el) => acc + el);
  const yzSum = rowMaxes.reduce((acc, el) => acc + el);

  return xySum + xzSum + yzSum;
};

// December 11
// Subdomain visit count
// https://leetcode.com/problems/subdomain-visit-count/

var subdomainVisits = function(cpdomains) {
  let domCts = {};
  cpdomains.forEach(cpd => {
    const [ct, dom] = cpd.split(' ');
    const domFrags = dom.split('.');
    for (let i = 0; i < domFrags.length; i++) {
      const subDom = domFrags.slice(i).join('.');
      domCts[subDom] ? (domCts[subDom] += +ct) : (domCts[subDom] = +ct);
    }
  });

  let pairs = Object.entries(domCts);
  for (let j = 0; j < pairs.length; j++) {
    pairs[j] = `${pairs[j][1]} ${pairs[j][0]}`;
  }

  return pairs;
};

// December 11
// Reverse string
// https://leetcode.com/problems/reverse-string/

var reverseString = function(s) {
  const arr = s.split('');
  for (let i = 0; i < arr.length / 2; i++) {
    [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
  }
  return arr.join('');
};

// December 11
// Number of lines to write string
// https://leetcode.com/problems/number-of-lines-to-write-string/

var numberOfLines = function(widths, S) {
  let remaining = 100;
  let lines = 1;

  for (let i = 0; i < S.length; i++) {
    const idx = S.charCodeAt(i) - 97;
    if (remaining >= widths[idx]) {
      remaining -= widths[idx];
    } else {
      lines++;
      remaining = 100 - widths[idx];
    }
  }
  return [lines, 100 - remaining];
};

// December 12
// Shortest distance to a character
// https://leetcode.com/problems/shortest-distance-to-a-character/
// Alternate solution I saw and liked made two passes through the array capturing "distance from left C" and then comparing that to the "distance from right C" on the return trip

var shortestToChar = function(S, C) {
  let cA = S.indexOf(C);
  let cB = Math.max(S.indexOf(C, cA + 1), cA);
  let distances = [];

  for (let i = 0; i < S.length; i++) {
    if (i >= cB) {
      let cNext = Math.max(S.indexOf(C, cB + 1), cB);
      [cA, cB] = [cB, cNext];
    }
    distances.push(Math.min(Math.abs(cA - i), Math.abs(cB - i)));
  }
  return distances;
};

// December 12
// Number complement
// https://leetcode.com/problems/number-complement/

var findComplement = function(num) {
  let allBinOnes = 1;
  while (allBinOnes <= num) {
    allBinOnes = allBinOnes * 2;
  }
  return allBinOnes - num - 1;
};

// December 12
// Keyboard row
// https://leetcode.com/problems/keyboard-row/

var findWords = function(words) {
  let keyRows = {
    q: 1,
    w: 1,
    e: 1,
    r: 1,
    t: 1,
    y: 1,
    u: 1,
    i: 1,
    o: 1,
    p: 1,
    a: 2,
    s: 2,
    d: 2,
    f: 2,
    g: 2,
    h: 2,
    j: 2,
    k: 2,
    l: 2,
    z: 3,
    x: 3,
    c: 3,
    v: 3,
    b: 3,
    n: 3,
    m: 3
  };

  return words.filter(word => {
    word = word.toLowerCase();
    let row = keyRows[word[0]];
    for (let i = 1; i < word.length; i++) {
      if (keyRows[word[i]] !== row) return false;
    }
    return true;
  });
};

// December 12
// Groups of special-equivalent strings
// https://leetcode.com/problems/groups-of-special-equivalent-strings/
// Good sort-less alternative I saw relied on building a 52-element array that counted odd instances and even instances
// and then converting those arrays to strings and comparing those, using a set the same way I did.

var numSpecialEquivGroups = function(A) {
  let groups = new Set();
  A.forEach(str => {
    const evens = [];
    const odds = [];
    for (let i = 0; i < str.length; i++) {
      if (i % 2 === 0) evens.push(str[i]);
      else odds.push(str[i]);
    }
    evens.sort();
    odds.sort();
    const sortString = [...evens, ...odds].join('');
    groups.add(sortString);
  });

  return groups.size;
};

// December 12
// Not boring movies
// https://leetcode.com/problems/not-boring-movies/

/*
SELECT * FROM cinema
WHERE id%2=1
AND description != 'boring'
ORDER BY rating DESC;
*/

// December 13
// Custom sort string
// https://leetcode.com/problems/custom-sort-string/

var customSortString = function(S, T) {
  const hash = {};

  for (let i = 0; i < S.length; i++) {
    hash[S[i]] = i;
  }

  function sSort(a, b) {
    let aVal = hash[a] || 0;
    let bVal = hash[b] || 0;
    return aVal - bVal;
  }

  return [...T].sort((a, b) => sSort(a, b)).join('');
};

var customSortString = function(S, T) {
  return [...T].sort((a, b) => S.indexOf(a) - S.indexOf(b)).join('');
};

// December 13
// Baseball game
// https://leetcode.com/problems/baseball-game/

var calPoints = function(ops) {
  const stack = [];
  ops.forEach(e => {
    if (e === '+') {
      stack.push(stack[stack.length - 1] + stack[stack.length - 2]);
    } else if (e === 'D') {
      stack.push(stack[stack.length - 1] * 2);
    } else if (e === 'C') {
      stack.pop();
    } else stack.push(+e);
  });

  return stack.reduce((sum, num) => num + sum);
};

// December 13
// Island perimeter
// https://leetcode.com/problems/island-perimeter/

var islandPerimeter = function(grid) {
  let perimeter = 0;

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) {
        perimeter += grid[y][x - 1] === 1 ? 1 : 0;
        perimeter += grid[y - 1] && grid[y - 1][x] === 1 ? 1 : 0;
      } else {
        // cell === 1
        if (y === 0) perimeter++;
        if (y === grid.length - 1) perimeter++;
        if (x === 0) perimeter++;
        if (x == row.length - 1) perimeter++;
        if (grid[y][x - 1] === 0) perimeter++;
        if (grid[y - 1] && grid[y - 1][x] === 0) perimeter++;
      }
    });
  });
  return perimeter;
};

var islandPerimeter = function(grid) {
  let perimeter = 0;

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 1) {
        if (grid[y][x + 1] !== 1) perimeter++;
        if (grid[y][x - 1] !== 1) perimeter++;
        if (!grid[y - 1] || grid[y - 1][x] !== 1) perimeter++;
        if (!grid[y + 1] || grid[y + 1][x] !== 1) perimeter++;
      }
    });
  });
  return perimeter;
};

// December 13
// Stone game
// https://leetcode.com/problems/stone-game/

// There's a DP solution I don't fully grok.

var stoneGame = function(piles) {
  return true;
};

// December 14
// Find all duplicates in an array
// https://leetcode.com/problems/find-all-duplicates-in-an-array/

var findDuplicates = function(nums) {
  nums.push(0);
  const dupes = [];
  let i = 0;
  while (i < nums.length) {
    if (nums[i] === i) {
      i++;
    } else {
      if (nums[nums[i]] === nums[i]) {
        dupes.push(nums[i]);
        i++;
      } else {
        const dupeSwap = i > nums[i];
        let temp = nums[i];
        nums[i] = nums[temp];
        nums[temp] = temp;
        if (dupeSwap) i++;
      }
    }
  }
  return dupes;
};

// December 14
// Verifying an alien dictionary
// https://leetcode.com/problems/verifying-an-alien-dictionary/

var isAlienSorted = function(words, order) {
  for (let i = 0; i < words.length - 1; i++) {
    if (!pairOrdered(words[i], words[i + 1], order)) return false;
  }
  return true;
};

function pairOrdered(wordA, wordB, order) {
  const lenA = wordA.length;
  const lenB = wordB.length;

  for (let i = 0; i < Math.min(lenA, lenB); i++) {
    if (order.indexOf([wordA[i]]) > order.indexOf([wordB[i]])) return false;
    if (order.indexOf([wordA[i]]) < order.indexOf([wordB[i]])) return true;
  }
  if (lenA > lenB) return false;
  return true;
}

// December 14
// Binary gap
// https://leetcode.com/problems/binary-gap/

var binaryGap = function(N) {
  const binN = N.toString(2);
  let maxGap = 0;
  let prev1 = binN.indexOf('1');

  for (let i = prev1 + 1; i < binN.length; i++) {
    if (binN[i] === '1') {
      maxGap = Math.max(maxGap, i - prev1);
      prev1 = i;
    }
  }
  return maxGap;
};

// December 14
// Distribute candies
// https://leetcode.com/problems/distribute-candies/

var distributeCandies = function(candies) {
  candySet = new Set(candies);
  return Math.min(candySet.size, candies.length / 2);
};

// December 14
// Fizz buzz
// https://leetcode.com/problems/fizz-buzz/

var fizzBuzz = function(n) {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    const fizz = i % 3 === 0;
    const buzz = i % 5 === 0;
    if (fizz && buzz) arr.push('FizzBuzz');
    else if (fizz) arr.push('Fizz');
    else if (buzz) arr.push('Buzz');
    else arr.push(i.toString());
  }
  return arr;
};

// December 14
// Keys and rooms
// https://leetcode.com/problems/keys-and-rooms/

var canVisitAllRooms = function(rooms) {
  const visited = new Set();
  visited.add(0);
  const stack = [...rooms[0]];
  while (stack.length) {
    const key = stack.pop();
    if (!visited.has(key)) {
      visited.add(key);
      stack.push(...rooms[key]);
    }
  }
  return visited.size === rooms.length;
};

// December 17
// Reshape the matrix
// https://leetcode.com/problems/reshape-the-matrix/

var matrixReshape = function(nums, r, c) {
  if (r * c !== nums.length * nums[0].length) return nums;

  const newMatrix = [];
  for (let i = 0; i < r; i++) {
    const row = [];
    for (let j = 0; j < c; j++) {
      row.push(extractNext(nums));
    }
    newMatrix.push(row);
  }
  return newMatrix;
};

function extractNext(matrix) {
  if (matrix[0].length > 1) return matrix[0].shift();
  const num = matrix[0].shift();
  matrix.shift();
  return num;
}

// December 17
// Single number
// https://leetcode.com/problems/single-number/

var singleNumber = function(nums) {
  const uniques = new Set();
  nums.forEach(num => {
    if (uniques.has(num)) {
      uniques.delete(num);
    } else {
      uniques.add(num);
    }
  });
  return uniques.values().next().value;
};

var singleNumber = function(nums) {
  return nums.reduce((res, next) => res ^ next);
};

// December 17
// Search in a binary search tree
// https://leetcode.com/problems/search-in-a-binary-search-tree/

var searchBST = function(root, val) {
  if (root === null) return null;
  else if (val === root.val) return root;
  else if (val < root.val) return searchBST(root.left, val);
  else return searchBST(root.right, val);
};

// December 17
// Leaf-similar trees
// https://leetcode.com/problems/leaf-similar-trees/

var leafSimilar = function(root1, root2) {
  const leaves1 = [];
  const leaves2 = [];

  function leafLister(root, leaves) {
    if (!root.left && !root.right) leaves.push(root.val);
    else {
      if (root.left) leafLister(root.left, leaves);
      if (root.right) leafLister(root.right, leaves);
    }
  }

  leafLister(root1, leaves1);
  leafLister(root2, leaves2);

  return leaves1.join('') === leaves2.join('');
};

// December 17
// Increasing order search tree
// https://leetcode.com/problems/search-in-a-binary-search-tree/

// Theoretically works, but out of memory

var increasingBST = function(root) {
  const inOrderNodes = [];

  function inner(root) {
    if (root.left) inner(root.left);
    inOrderNodes.push(root);
    if (root.right) inner(root.right);
  }

  inner(root);

  for (let i = 0; i < inOrderNodes.length - 1; i++) {
    inOrderNodes[i].left = null;
    inOrderNodes[i].right = inOrderNodes[i + 1];
  }

  return inOrderNodes[0];
};

// Revised and now works. Difference is that it only stores values in array and build new nodes.

var increasingBST = function(root) {
  const inOrderVals = [];

  function inner(root) {
    if (root.left) inner(root.left);
    inOrderVals.push(root.val);
    if (root.right) inner(root.right);
  }

  inner(root);

  const dummyRoot = new TreeNode(-1);
  let current = dummyRoot;
  for (let val of inOrderVals) {
    current.right = new TreeNode(val);
    current = current.right;
  }

  return dummyRoot.right;
};

// December 17
// Maximum depth of binary tree
// https://leetcode.com/problems/maximum-depth-of-binary-tree/

var maxDepth = function(root) {
  if (!root) return 0;
  else {
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  }
  // one liner version:
  // return root ? 1+Math.max(maxDepth(root.left), maxDepth(root.right)) : 0;
};

// December 18
// Next greater element
// https://leetcode.com/problems/next-greater-element-i/

var nextGreaterElement = function(findNums, nums) {
  const hashMap = nums.reduce((obj, key, idx) => {
    obj[key] = idx;
    return obj;
  }, {});

  console.log(hashMap);

  return findNums.reduce((arr, num) => {
    let idx = hashMap[num] + 1;
    let nextGreater = -1;
    while (idx < nums.length) {
      if (nums[idx] > num) {
        nextGreater = nums[idx];
        break;
      }
      idx++;
    }
    arr.push(nextGreater);
    return arr;
  }, []);
};

// December 18
// Reverse words in a string III
// https://leetcode.com/problems/reverse-words-in-a-string-iii/

var reverseWords = function(s) {
  const words = s.split(' ');

  return words
    .map(w => {
      const word = w.split('');
      for (let i = 0; i < word.length / 2; i++) {
        [word[i], word[word.length - 1 - i]] = [
          word[word.length - 1 - i],
          word[i]
        ];
      }
      return word.join('');
    })
    .join(' ');
};

var reverseWords = function(s) {
  return s
    .split(' ')
    .map(w =>
      w
        .split('')
        .reverse()
        .join('')
    )
    .join(' ');
};

// December 18
// Toeplitz matrix
// https://leetcode.com/problems/toeplitz-matrix/

var isToeplitzMatrix = function(matrix) {
  const diags = {};

  return matrix.every((row, i) => {
    return row.every((cell, j) => {
      if (!diags.hasOwnProperty(i - j)) diags[i - j] = cell;
      else if (diags[i - j] !== cell) return false;
      return true;
    });
  });
};

// December 18
// Queue reconstruction by height
// https://leetcode.com/problems/queue-reconstruction-by-height/

var reconstructQueue = function(people) {
  const newQ = [];
  // sort tallest to shortest, with ties going to fewest tall people ahead
  people.sort((a, b) => b[0] - a[0] || a[1] - b[1]);

  // positions of short people dependent on positions of tall, so insert in sorted order
  people.forEach(p => newQ.splice(p[1], 0, p));

  return newQ;
};

// December 18
// Trim a binary search tree
// https://leetcode.com/problems/trim-a-binary-search-tree/

var trimBST = function(root, L, R) {
  if (!root) return root;
  if (root.val < L) return trimBST(root.right, L, R);
  if (root.val > R) return trimBST(root.left, L, R);

  root.left = trimBST(root.left, L, R);
  root.right = trimBST(root.right, L, R);
  return root;
};

// December 18
// Daily temperatures
// https://leetcode.com/problems/daily-temperatures/

var dailyTemperatures = function(T) {
  const output = new Array(T.length);
  const stack = [];
  for (i = T.length - 1; i >= 0; i--) {
    while (stack.length && T[i] >= T[stack[stack.length - 1]]) {
      stack.pop();
    }
    output[i] = stack.length ? stack[stack.length - 1] - i : 0;
    stack.push(i);
  }
  return output;
};
