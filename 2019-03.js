// March 19
// Find common characters
// https://leetcode.com/problems/find-common-characters/

var commonChars = function(A) {
  // create master map from first word in input array
  // example value of this map: {b: 1, e: 1, l: 2. a: 1}
  const masterMap = mapWord(A[0]);

  // for each subsequent word...
  // create map
  // for each key in master map, set value to min of that and matching key in currMap
  // if currMap does not have that key, set to zero (or delete key/value pair from master)

  for (let i = 1; i < A.length; i++) {
    const curMap = mapWord(A[i]);
    for (let key in masterMap) {
      if (!curMap.hasOwnProperty(key)) {
        delete masterMap[key];
      } else {
        masterMap[key] = Math.min(masterMap[key], curMap[key]);
      }
    }
  }

  // create output array
  const output = [];

  // iterate through master map and push each key into output as many times as the value
  for (let key in masterMap) {
    for (let j = 0; j < masterMap[key]; j++) {
      output.push(key);
    }
  }

  // return output
  return output;
};

function mapWord(word) {
  const map = {};

  for (let i = 0; i < word.length; i++) {
    map[word[i]] ? map[word[i]]++ : (map[word[i]] = 1);
  }

  return map;
}

// March 20
// Sum of even numbers after queries
// https://leetcode.com/problems/sum-of-even-numbers-after-queries/

var sumEvenAfterQueries = function(A, queries) {
  // create output array
  const output = [0];

  // adjust A based on first query
  A[queries[0][1]] += queries[0][0];

  // push resulting sum to output
  A.forEach(num => {
    if (num % 2 == 0) output[0] += num;
  });

  // rather than re-sum for subsequent queries, just note adjustments
  for (let i = 1; i < queries.length; i++) {
    // set variable to 0
    let delta = 0;
    let [rx, idx] = queries[i];
    if (A[idx] % 2 == 0) delta -= A[idx];
    A[idx] += rx;
    if (A[idx] % 2 == 0) delta += A[idx];
    output.push(delta + output[output.length - 1]);
  }

  return output;
};

// March 29
// Codility GenomicRangeQuery
// (prefix sums)

function solution(S, P, Q) {
  // write your code in JavaScript (Node.js 8.9.4)
  const results = [];

  // create array of letter counts in string from idx 0 through idx i
  const counts = [];
  const impact = { A: 1, C: 2, G: 3, T: 4 };

  for (let i = 0; i < S.length; i++) {
    // start with (copy of) previous count...
    let curCount = counts.length
      ? [...counts[counts.length - 1]]
      : [0, 0, 0, 0];
    // account for latest letter in S
    curCount[impact[S[i]] - 1]++;
    // push updated count to counts
    counts.push(curCount);
  }

  // for each pair...
  for (let j = 0; j < P.length; j++) {
    const pCount = P[j] > 0 ? counts[P[j] - 1] : [0, 0, 0, 0];
    const qCount = counts[Q[j]];

    if (qCount[0] > pCount[0]) results.push(1);
    else if (qCount[1] > pCount[1]) results.push(2);
    else if (qCount[2] > pCount[2]) results.push(3);
    else results.push(4);
  }

  return results;
}

// March 29
// Codility min avg sum

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let minAvg = (A[0] + A[1]) / 2;
  let minStart = 0;

  let i;

  for (i = 0; i < A.length - 1; i++) {
    let newAvg = (A[i] + A[i + 1]) / 2;

    if (i < A.length - 2) {
      newAvg = Math.min(newAvg, (A[i] + A[i + 1] + A[i + 2]) / 3);
    }

    if (newAvg < minAvg) {
      minAvg = newAvg;
      minStart = i;
    }
  }

  return minStart;
}

// March 29
// CountDiv

function solution(A, B, K) {
  // write your code in JavaScript (Node.js 8.9.4)

  let ans = Math.floor(B / K) - Math.floor(A / K);
  if (A % K == 0) ans += 1;

  return ans;
}

// March 29
// Triangle
// sort

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  // const setA = new Set(A);
  // const uniqA = [...setA].sort((a,b)=>a-b);
  A.sort((a, b) => a - b);

  if (A.length < 3) return 0;

  for (let i = 0; i < A.length - 2; i++) {
    if (A[i] + A[i + 1] > A[i + 2]) return 1;
  }

  return 0;
}

// March 29
// Overlapping discs

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)

  const events = [];

  A.forEach((rad, i) => {
    let begin = i - rad;
    let end = i + rad;
    events.push([begin, 1]);
    events.push([end, -1]);
  });

  events.sort((a, b) => {
    if (a[0] == b[0]) return b[1] - a[1];
    else return a[0] - b[0];
  });

  let circles = 0;
  let intersections = 0;

  events.forEach(evt => {
    if (evt[1] == -1) circles--;
    if (evt[1] == 1) {
      intersections += circles;
      circles++;
    }
  });

  if (intersections > 10000000) return -1;
  return intersections;
}

// March 29
// Voracious fish

function solution(A, B) {
  // write your code in JavaScript (Node.js 8.9.4)
  const stack = [];
  let survivors = A.length;

  for (let P = 0; P < A.length; P++) {
    if (B[P] == 0) {
      // if fish heading west, it meets and eats eastbound fish until it's eaten
      while (stack.length) {
        let stackFish = stack[stack.length - 1];
        if (stackFish < A[P]) {
          stack.pop();
          survivors--;
        } else {
          survivors--;
          break;
        }
      }
    } else if (B[P] == 1) {
      // if fish heading east, it's now the vanguard; push it to stack
      stack.push(A[P]);
    }
  }

  return survivors;
}
