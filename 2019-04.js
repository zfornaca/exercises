// April 1
// bracket matching

function solution(S) {
  // write your code in JavaScript (Node.js 8.9.4)
  const open = ['(', '{', '['];
  const close = [')', '}', ']'];
  const stack = [];

  for (let i = 0; i < S.length; i++) {
    let c = S[i];
    if (open.includes(c)) stack.push(c);
    else {
      let toMatch = stack.pop();
      let matchIdx = open.indexOf(toMatch);
      if (close[matchIdx] != c) return 0;
    }
  }

  if (stack.length > 0) return 0;
  return 1;
}

// April 1
// paren matching

function solution(S) {
  // write your code in JavaScript (Node.js 8.9.4)

  const stack = [];

  for (let i = 0; i < S.length; i++) {
    let c = S[i];
    if (c == '(') stack.push(c);
    else {
      if (stack.length == 0) return 0;
      stack.pop();
    }
  }

  if (stack.length > 0) return 0;
  return 1;
}

// April 1
// skyline blocks

function solution(H) {
  // write your code in JavaScript (Node.js 8.9.4)
  const stack = [];
  let blocks = 0;

  H.forEach(ht => {
    let newBlocks = new Set();
    while (stack.length && stack[stack.length - 1] > ht) {
      newBlocks.add(stack.pop());
    }
    blocks += newBlocks.size;
    stack.push(ht);
  });

  let lastBlocks = new Set(stack);
  blocks += lastBlocks.size;
  return blocks;
}

// April 1
// dominator

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let leader = -1;
  let leaderIdx = -1;
  let leaderCount = 0;

  A.forEach((num, i) => {
    if (leaderCount == 0) {
      leader = num;
      leaderIdx = i;
      leaderCount++;
    } else {
      leader == num ? leaderCount++ : leaderCount--;
    }
  });

  let numerator = 0;
  A.forEach(num => {
    if (num == leader) numerator++;
  });

  return A.length / 2 < numerator ? leaderIdx : -1;
}

// April 1
// EquiLeader

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)

  // first, figure out what the relevant leader value is
  let leader = -1;
  let leaderIdx = -1;
  let leaderCtr = 0;

  A.forEach((num, i) => {
    if (leaderCtr == 0) {
      leader = num;
      leaderIdx = i;
      leaderCtr++;
    } else {
      leader == num ? leaderCtr++ : leaderCtr--;
    }
  });

  // and how many of that leader value there are
  let leaderCount = 0;
  A.forEach(num => {
    if (num == leader) leaderCount++;
  });

  // now we have both "leader" and "leaderCount"

  let leftLdrCt = 0;
  let equiLeaders = 0;

  for (let i = 0; i < A.length - 1; i++) {
    if (A[i] == leader) {
      leftLdrCt++;
    }
    let rightLdrCt = leaderCount - leftLdrCt;
    let leftSqLen = i + 1;
    let rightSqLen = A.length - leftSqLen;
    if (leftLdrCt / leftSqLen > 0.5 && rightLdrCt / rightSqLen > 0.5)
      equiLeaders++;
  }

  return equiLeaders;
}

// April 1
// Max stock profit

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let minCost = A[0];
  let maxProfit = 0;

  for (let i = 1; i < A.length; i++) {
    maxProfit = Math.max(maxProfit, A[i] - minCost);
    minCost = Math.min(minCost, A[i]);
  }

  return maxProfit;
}

// April 1
// Max slice sum

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let maxSum = A[0];
  let prevSum = A[0];

  for (let i = 1; i < A.length; i++) {
    let curSum = Math.max(A[i], A[i] + prevSum);
    maxSum = Math.max(maxSum, curSum);
    prevSum = curSum;
  }

  return maxSum;
}

// April 1
// double slice sum

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)

  let leftBests = new Array(A.length).fill(0);
  let prevSum = 0;

  for (let i = 1; i < A.length - 1; i++) {
    let curSum = Math.max(0, A[i] + prevSum);
    leftBests[i] = curSum;
    prevSum = curSum;
  }

  prevSum = 0;

  let rightBests = new Array(A.length).fill(0);

  for (let i = A.length - 2; i > 0; i--) {
    let curSum = Math.max(0, A[i] + prevSum);
    rightBests[i] = curSum;
    prevSum = curSum;
  }

  let bestSum = 0;

  for (let i = 0; i < A.length - 2; i++) {
    bestSum = Math.max(bestSum, leftBests[i] + rightBests[i + 2]);
  }

  return bestSum;
}
// April 1
// number of factors

function solution(N) {
  // write your code in JavaScript (Node.js 8.9.4)
  let factors = 0;

  let i;

  for (i = 1; i < N ** 0.5; i++) {
    if (N % i == 0) factors += 2;
  }

  if (i ** 2 == N) factors++;

  return factors;
}

// April 1
// rectangle min perimeter from area

function solution(N) {
  // write your code in JavaScript (Node.js 8.9.4)

  let bestFactor = 1;
  let i;

  for (i = 1; i <= N ** 0.5; i++) {
    if (N % i == 0) bestFactor = i;
  }

  return 2 * (N / bestFactor + bestFactor);
}

// April 3
// Peaks

function solution(A) {
  // create peakCts parallel array which finds number of peaks by given idx
  const peakCounts = new Array(A.length).fill(0);
  let peaksSeen = 0;

  for (let i = 1; i < A.length - 1; i++) {
    if (A[i] > A[i - 1] && A[i] > A[i + 1]) peaksSeen++;
    peakCounts[i] = peaksSeen;
  }

  peakCounts[A.length - 1] = peaksSeen;

  // for each block count/length pair, check whether each block has a peak
  let maxBlockCt = 0;

  // for each block count/length pair (at idx i)
  for (let i = 1; i <= peaksSeen; i++) {
    if (A.length % i == 0) {
      let lastPeakCt = 0;
      let blockCount = i;
      let blockLength = A.length / i;
      let valid = true;
      for (let j = 1; j <= blockCount && valid; j++) {
        let blockEnd = blockLength * j - 1;
        if (peakCounts[blockEnd] == lastPeakCt) {
          valid = false;
        } else {
          lastPeakCt = peakCounts[blockEnd];
        }
      }
      maxBlockCt = valid ? blockCount : maxBlockCt;
    }
  }

  return maxBlockCt;
}

// April 3
// flags

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  // start by calculating # of peaks and array of next peak
  // is it possible to generate the array of next peaks without an intermediary?
  let peaks = 0;
  let nextPeak = new Array(A.length).fill(-1);
  let nextIdx = 0;
  A.forEach((num, i) => {
    if (i == 0) return;
    if (A[i] > A[i - 1] && A[i] > A[i + 1]) {
      peaks++;
      for (nextIdx; nextIdx < i; nextIdx++) {
        nextPeak[nextIdx] = i;
      }
    }
  });

  // next step: based on peaks and sqrt of A.length, determine max number of flags
  const flagMax = Math.min(peaks, Math.floor(A.length ** 0.5) + 1);

  for (let j = flagMax; j > 0; j--) {
    // if we can place j flags, return j
    // can we place j flags?
    let remainingFlags = j;
    let start = 0;
    while (remainingFlags > 0) {
      if (nextPeak[start] == -1 || start >= nextPeak.length) break;
      remainingFlags--;
      start = nextPeak[start] + j - 1;
    }
    if (remainingFlags <= 0) return j;
  }

  return 0;
}

// April 3
// semiprimes sieve

function solution(N, P, Q) {
  // write your code in JavaScript (Node.js 8.9.4)
  const sieve = new Array(N + 1).fill(true);
  sieve[0] = sieve[1] = false;

  for (let i = 2; i <= N ** 0.5; i++) {
    if (sieve[i]) {
      for (let j = Math.pow(i, 2); j <= N; j += i) {
        sieve[j] = false;
      }
    }
  }

  const primes = sieve.reduce((primes, num, idx) => {
    if (num) primes.push(idx);
    return primes;
  }, []);

  const semiprimesSet = new Set();

  for (let i = 0; i < primes.length; i++) {
    for (let j = i; j < primes.length; j++) {
      if (primes[i] * primes[j] <= N) semiprimesSet.add(primes[i] * primes[j]);
    }
  }

  semiprimes = [...semiprimesSet].sort((a, b) => a - b);

  const semiprimeCounts = new Array(N + 1).fill(0);
  let countsIdx = 0;

  for (let i = 0; i <= semiprimes.length; i++) {
    while (countsIdx < semiprimes[i]) {
      semiprimeCounts[countsIdx] = i;
      countsIdx++;
    }
  }

  if (semiprimes[semiprimes.length - 1] == semiprimeCounts.length - 1) {
    semiprimeCounts[semiprimeCounts.length - 1] =
      semiprimeCounts[semiprimeCounts.length - 2] + 1;
  }

  const output = [];

  for (let m = 0; m < P.length; m++) {
    output.push(semiprimeCounts[Q[m]] - semiprimeCounts[P[m] - 1]);
  }

  return output;
}

// April 4
// nondivisors

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)

  let maxInt = Math.max(...A);

  const counts = A.reduce((cts, el) => {
    cts[el] = cts[el] ? cts[el] + 1 : 1;
    return cts;
  }, {});

  const divisors = A.reduce((divs, el) => {
    divs[el] = [];
    return divs;
  }, {});

  let seen = new Set();

  A.forEach(el => {
    // could refactor to combine seen and counts
    if (seen.has(el)) return;
    seen.add(el);
    let multiple = el;
    while (multiple <= maxInt) {
      if (divisors.hasOwnProperty(multiple)) {
        divisors[multiple].push(el);
      }
      multiple += el;
    }
  });

  const output = [];

  A.forEach(el => {
    let nonDivisors = A.length;
    for (let div of divisors[el]) {
      nonDivisors -= counts[div];
    }
    output.push(nonDivisors);
  });

  // console.log(maxInt, counts, divisors, output)

  return output;
}

// April 5
// chocolates

function solution(N, M) {
  // write your code in JavaScript (Node.js 8.9.4)
  return N / gcd(N, M);
}

function gcd(N, M) {
  // console.log("in gcd", N, M)
  if (N % M == 0) return M;
  return gcd(M, N % M);
}

// April 5
// same prime divisors

function solution(A, B) {
  // write your code in JavaScript (Node.js 8.9.4)

  let count = 0;

  for (let i = 0; i < A.length; i++) {
    if (hasSamePrimes(A[i], B[i])) count++;
  }

  return count;
}

function hasSamePrimes(a, b) {
  const gcd = findGcd(a, b);

  while (a != 1) {
    let gcdVal = findGcd(a, gcd);
    if (gcdVal == 1) break;
    a /= gcdVal;
  }
  if (a != 1) return false;

  while (b != 1) {
    let gcdVal = findGcd(b, gcd);
    if (gcdVal == 1) break;
    b /= gcdVal;
  }

  return b == 1;
}

function findGcd(a, b) {
  if (a % b == 0) return b;
  return findGcd(b, a % b);
}

// April 5
// ladders

function solution(A, B) {
  // write your code in JavaScript (Node.js 8.9.4)
  let maxA = Math.max(...A);
  let maxB = Math.max(...B);

  let fibs = new Array(maxA + 1).fill(0);
  fibs[0] = fibs[1] = 1;
  for (let i = 2; i < fibs.length; i++) {
    fibs[i] = (fibs[i - 2] + fibs[i - 1]) % 2 ** maxB;
  }

  const output = [];

  for (let i = 0; i < A.length; i++) {
    output.push(fibs[A[i]] & (2 ** B[i] - 1));
  }

  return output;
}

// April 5
// fibfrog

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)

  // generate list of fibonacci numbers <= width of river
  let fibs = new Array(25).fill(0);
  fibs[0] = fibs[1] = 1;
  for (let i = 2; i < fibs.length; i++) {
    fibs[i] = fibs[i - 1] + fibs[i - 2];
  }

  // unshift A to allow for use of reached array
  A.unshift(0);

  // generate 'reached' array to keep track of most efficient way to reach given spot
  const reached = new Array(A.length).fill(-1);
  // reached[0] represents the left bank, b/c we can "reach" it in 0 jumps
  reached[0] = 0;

  // queue tracks valid frog locations we can jump from; to start, just the left bank
  const queue = [0];

  while (queue.length) {
    // console.log('reached', reached)
    let frogPos = queue.shift();
    for (let i = 0; i < fibs.length; i++) {
      let newPos = frogPos + fibs[i];
      // if we reached the bank exactly, since we're doing breadth first, I think that's the answer
      if (newPos == A.length) return reached[frogPos] + 1;
      // if we reach a leaf, then we note how many steps it took to reach, and add to queue
      if (A[newPos] == 1 && reached[newPos] == -1) {
        reached[newPos] = reached[frogPos] + 1;
        queue.push(newPos);
      }
    }
  }

  return -1;
}

// April 8
// minmaxdivision

function solution(K, M, A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let lowerBound = Math.max(...A);
  let upperBound = A.reduce((acc, next) => acc + next);
  let result = upperBound;

  if (K == 1) return upperBound;
  if (K >= A.length) return lowerBound;

  while (lowerBound <= upperBound) {
    let midPoint = parseInt((lowerBound + upperBound) / 2);
    let blockCount = blockCounter(A, midPoint);
    if (blockCount <= K) {
      upperBound = midPoint - 1;
      result = midPoint;
    } else {
      lowerBound = midPoint + 1;
    }
  }

  return result;
}

function blockCounter(A, blockSize) {
  let blockCount = 1;
  let curBlockSize = A[0];
  for (let i = 1; i < A.length; i++) {
    if (curBlockSize + A[i] <= blockSize) curBlockSize += A[i];
    else {
      blockCount++;
      curBlockSize = A[i];
    }
  }
  return blockCount;
}

// April 8
// planks
// slightly too slow, I guess

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A, B, C) {
  // write your code in JavaScript (Node.js 8.9.4)
  const nails = C.map((nail, idx) => [idx, nail]).sort((a, b) => a[1] - b[1]);
  let neededNail = -1;

  for (let i = 0; i < A.length; i++) {
    neededNail = findNeededNail(A[i], B[i], nails, neededNail);
    if (neededNail == -1) return -1;
  }
  return neededNail + 1;
}

function findNeededNail(pBegin, pEnd, nails, prevNail) {
  let result = -1;
  let resultPos = -1;
  let lower = 0;
  let upper = nails.length - 1;
  let midpoint;

  while (lower <= upper) {
    midpoint = parseInt((lower + upper) / 2);
    nailMidVal = nails[midpoint][1];
    if (nailMidVal < pBegin) lower = midpoint + 1;
    else if (nailMidVal > pEnd) upper = midpoint - 1;
    else {
      upper = midpoint - 1;
      result = nails[midpoint][0];
      resultPos = midpoint;
    }
  }

  if (result == -1) return -1;

  resultPos++;
  while (resultPos < nails.length) {
    if (nails[resultPos][1] > pEnd) break;
    result = Math.min(result, nails[resultPos][0]);
    resultPos++;
    if (prevNail >= result) return prevNail;
  }
  return Math.max(result, prevNail);
}

// April 9
// planks, not binary search

function solution(A, B, C) {
  // write your code in JavaScript (Node.js 8.9.4)
  let result = -1;

  // make ordered list of planks
  const planks = [];
  for (let i = 0; i < A.length; i++) {
    planks.push([A[i], B[i]]);
  }
  planks.sort((a, b) => a - b);

  // make ordered list of nails
  const nails = C.map((nail, idx) => [idx, nail]).sort((a, b) => a[1] - b[1]);
  let nailsIdx = 0;

  for (let i = 0; i < planks.length; i++) {
    let plank = planks[i];

    if (nailsIdx >= nails.length) return -1;
    while (nailsIdx < nails.length) {
      if (nails[nailsIdx][1] < plank[0]) nailsIdx++;
      else if (nails[nailsIdx][1] > plank[1]) return -1;
      else break;
    }

    let tempRes;
    let tempIdx;

    if (i != 0 && plank[0] == planks[i - 1][0]) {
      // if cur and prev planks have same start
      continue;
    } else {
      tempRes = nails.length;
      tempIdx = nailsIdx;
    }

    while (
      tempIdx < nails.length &&
      plank[0] <= nails[tempIdx][1] &&
      nails[tempIdx][1] <= plank[1]
    ) {
      tempRes = Math.min(tempRes, nails[tempIdx][0]);
      tempIdx++;
      if (tempRes <= result) break;
    }
    result = Math.max(result, tempRes);
  }
  return result + 1;
}

// April 9
// planks, simple binary

function solution(A, B, C) {
  let begin = 0;
  let end = C.length - 1;
  let res = -1;
  while (begin <= end) {
    let mid = parseInt((begin + end) / 2);
    if (check(A, B, C, mid + 1)) {
      end = mid - 1;
      res = mid + 1;
    } else {
      begin = mid + 1;
    }
  }
  return res;
}

function check(a, b, c, num) {
  const pNails = new Array(2 * c.length + 1).fill(0);
  for (let i = 0; i < num; ++i) {
    ++pNails[c[i]];
  }
  for (let i = 1; i < pNails.length; ++i) {
    pNails[i] += pNails[i - 1];
  }
  for (let i = 0; i < a.length; ++i) {
    if (pNails[b[i]] <= pNails[a[i] - 1]) return false;
  }
  return true;
}

// April 10
// count distinct slices

function solution(M, A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let count = 0;
  let prevPos = new Array(M + 1).fill(-1);
  let start = 0;

  for (let i = 0; i < A.length; i++) {
    let val = A[i];
    if (prevPos[val] >= start) {
      start = prevPos[val] + 1;
    }
    prevPos[val] = i;
    count += i - start + 1;
    if (count > 1000000000) break;
  }

  return Math.min(count, 1000000000);
}

// April 10
// absdistinct

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let setA = new Set();

  A.forEach(num => setA.add(Math.abs(num)));

  return setA.size;
}

// April 10
// count triangles, failed

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  if (A.length < 3) return 0;

  let count = 0;

  let tail = 0;

  A.sort((a, b) => a - b);

  for (let head = 2; head < A.length; head++) {
    // if not tri, and only 3 nums in window, tail inches up and so does head
    // if not tri, and over 3 in window, tail inches up, try again with same head
    // if tri, add n * (n+1) / 2 to count, where n==1 corresponds to 3 nums in window, move only head
    while (head - tail > 1 && head < A.length) {
      let isTriangle = A[tail] + A[tail + 1] > A[head];
      if (!isTriangle) {
        tail++;
      } else {
        let n = head - tail - 1;
        count += (n * (n + 1)) / 2;
        head++;
      }
    }
  }

  return count;
}

// count triangles, nested for

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  A.sort((a, b) => a - b);
  let count = 0;

  for (let a = 0; a < A.length - 2; a++) {
    let c = a + 2;
    for (let b = a + 1; b < A.length - 1; b++) {
      while (c < A.length && A[a] + A[b] > A[c]) {
        c++;
      }
      count += c - b - 1;
    }
  }
  return count;
}

// April 11
// min abs pair sum

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  A.sort((a, b) => a - b);

  let minun = 0;
  let plusle = A.length - 1;
  let minAbs = Math.abs(A[minun] + A[plusle]);

  while (minun <= plusle) {
    let curSum = A[minun] + A[plusle];
    if (curSum == 0) return curSum;
    minAbs = Math.min(minAbs, Math.abs(curSum));
    if (curSum < 0) minun++;
    else plusle--;
  }

  return minAbs;
}

// April 11
// tieropes

function solution(K, A) {
  // write your code in JavaScript (Node.js 8.9.4)

  let longRopes = 0;
  let curRope = 0;

  A.forEach(el => {
    curRope += el;
    if (curRope >= K) {
      longRopes++;
      curRope = 0;
    }
  });

  return longRopes;
}

// April 11
// nonoverlapping segments

function solution(A, B) {
  // write your code in JavaScript (Node.js 8.9.4)
  let segments = 0;
  let curEnd = -1;

  for (let i = 0; i < A.length; i++) {
    if (A[i] > curEnd) {
      segments++;
      curEnd = B[i];
    }
  }
  return segments;
}

// April 11
// solitaire

function solution(A) {
  for (let i = 1; i < A.length; i++) {
    let start = Math.max(0, i - 6);
    A[i] += Math.max(...A.slice(start, i));
  }

  return A[A.length - 1];
}

// April 11
// minAbsSum

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)

  if (!A.length) return 0;

  A = A.map(num => Math.abs(num)).sort((a, b) => b - a);

  for (let i = 1; i < A.length; i++) {
    A[i] = Math.abs(A[i] - A[i - 1]);
  }

  return A[A.length - 1];
}

// April 11
// minAbsSum, based on solution

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  const N = A.length;
  let M = 0;
  for (let i = 0; i < N; i++) {
    A[i] = Math.abs(A[i]);
    M = Math.max(M, A[i]);
  }

  const S = A.reduce((acc, next) => acc + next, 0);

  const count = new Array(M + 1).fill(0);
  for (let i = 0; i < N; i++) {
    count[A[i]]++;
  }

  const dp = new Array(S + 1).fill(-1);
  dp[0] = 0;

  for (let a = 1; a <= M; a++) {
    if (count[a] > 0) {
      for (let j = 0; j < S; j++) {
        if (dp[j] >= 0) dp[j] = count[a];
        else if (j >= a && dp[j - a] > 0) dp[j] = dp[j - a] - 1;
      }
    }
  }

  let res = S;
  for (let i = 0; i < parseInt(S / 2) + 1; i++) {
    if (dp[i] >= 0) result = Math.min(res, S - 2 * i);
  }

  return result;
}

// April 11
// indeed 2015 long pass

function solution(S) {
  // write your code in JavaScript (Node.js 8.9.4)
  let words = S.split(' ');
  let maxPass = -1;

  words.forEach(word => {
    let ltrCt = 0;
    let numCt = 0;

    for (let c of word) {
      if (/[a-zA-Z]/.test(c)) ltrCt++;
      else if (/\d/.test(c)) numCt++;
      else return;
    }
    if (ltrCt % 2 == 0 && numCt % 2 == 1) {
      maxPass = Math.max(maxPass, word.length);
    }
  });
  return maxPass;
}

// April 12
// max flood depth

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let maxDepth = 0;
  let leftWall = 0;
  let rightWall = 0;
  const stack = [];

  A.forEach(block => {
    if (block <= leftWall) {
      stack.push(block);
      return;
    }
    if (block > leftWall) {
      while (stack.length) {
        maxDepth = Math.max(maxDepth, leftWall - stack.pop());
      }
      leftWall = block;
      stack.push(block);
    }
  });

  while (stack.length) {
    let block = stack.pop();
    rightWall = Math.max(rightWall, block);
    maxDepth = Math.max(rightWall - block, maxDepth);
  }

  return maxDepth;
}
