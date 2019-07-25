// June 4
// RectangleBuilderGreaterArea
// https://app.codility.com/demo/results/training94RRZF-SPM/

function solution(A, X) {
  // write your code in JavaScript (Node.js 8.9.4)
  let counts = {};
  let lengths = [];
  let output = 0;
  A.forEach(num => {
    counts[num] = counts[num] ? ++counts[num] : 1;
  });

  Object.keys(counts).forEach(num => {
    if (counts[num] <= 1) delete counts[num];
    else lengths.push(num);
  });

  lengths.sort((a, b) => b - a);

  lengths.forEach((len, idx) => {
    if (len < X ** 0.5) return;
    if (counts[len] >= 4) output++;
    for (let i = idx + 1; i < lengths.length; i++) {
      if (len ** lengths[i] >= X) output++;
      else break;
    }
  });

  return output;
}

// bug in line 25; ** should be *

function solution(A, X) {
  // write your code in JavaScript (Node.js 8.9.4)
  let counts = {};
  let lengths = [];
  let output = 0;
  A.forEach(num => {
    counts[num] = counts[num] ? ++counts[num] : 1;
  });

  Object.keys(counts).forEach(num => {
    if (counts[num] <= 1) delete counts[num];
    else lengths.push(num);
  });

  lengths.sort((a, b) => b - a);

  lengths.forEach((len, idx) => {
    if (len < X ** 0.5) return;
    if (counts[len] >= 4) output++;
    let lastWidthIdx = findLastWidth(lengths, idx, X / lengths[idx]);
    for (let i = idx + 1; i < lengths.length; i++) {
      if (len * lengths[i] >= X) output++;
      else break;
    }
  });

  return output;
}

function findLastWidth(lengths, idx, target) {
  let midpoint = idx + (lengths.length - 1) / 2;
  console.log(midpoint);
}

// This got most of the way there but the nested loop is just too slow.
// Probably want to binary search to find the first too-small value, and then bulk add based on the length

// so inside lengths.forEach...
// (1) check value halfway between idx and lengths.length-1
// is it big enough? check further right
// is it not big enough? is valuue to immediate left big enough? if so, calculate distance from idx to there. if not, check further left

function solution(A, X) {
  // write your code in JavaScript (Node.js 8.9.4)
  let counts = {};
  let spans = [];
  let output = 0;
  A.forEach(num => {
    counts[num] = counts[num] ? ++counts[num] : 1;
  });

  Object.keys(counts).forEach(num => {
    if (counts[num] <= 1) delete counts[num];
    else spans.push(parseInt(num));
    if (counts[num] >= 4 && num ** 2 >= X) output++;
  });

  spans.sort((a, b) => a - b);

  spans.forEach((len, i) => {
    let begin = i + 1;
    let end = spans.length - 1;
    let mid = Math.floor((begin + end) / 2);
    while (begin <= end) {
      mid = Math.floor((begin + end) / 2);
      if (spans[mid] * len >= X) end = mid - 1;
      else begin = mid + 1;
    }
    output += spans.length - 1 - end;
  });

  return output;
}

//

function solution(A, X) {
  // write your code in JavaScript (Node.js 8.9.4)
  let counts = {};
  let spans = [];
  let output = 0;
  A.forEach(num => {
    counts[num] = counts[num] ? ++counts[num] : 1;
  });

  Object.keys(counts).forEach(num => {
    if (counts[num] <= 1) delete counts[num];
    else spans.push(parseInt(num));
    if (counts[num] >= 4 && num ** 2 >= X) output++;
  });

  spans.sort((a, b) => a - b);

  spans.forEach((len, i) => {
    let begin = i + 1;
    let end = spans.length - 1;
    let mid = Math.floor((begin + end) / 2);
    while (begin <= end) {
      mid = Math.floor((begin + end) / 2);
      if (spans[mid] * len >= X) end = mid - 1;
      else begin = mid + 1;
    }
    output += spans.length - 1 - end;
  });

  return output > 1000000000 ? -1 : output;
}

// June 30
// SocksLaundering
//

function solution(K, C, D) {
  // write your code in JavaScript (Node.js 8.9.4)
  let cleans = new Array(51).fill(0);
  let dirties = new Array(51).fill(0);
  let tally = 0;
  let dirtyPairs = 0;
  let remaining = K;

  C.forEach(sock => {
    cleans[sock]++;
    if (cleans[sock] > 1) {
      cleans[sock] = 0;
      tally++;
    }
  });

  if (K == 0) return tally;

  D.forEach(sock => {
    dirties[sock]++;
    if (dirties[sock] > 1) {
      dirties[sock] = 0;
      dirtyPairs++;
    }
  });

  for (let i = 0; i < dirties.length; i++) {
    if (dirties[i] == 1 && cleans[i] == 1) {
      tally++; // following logic is wrong
      remaining--;
    }
  }

  while (remaining > 1 && dirtyPairs > 0) {
    dirtyPairs -= 1;
    remaining -= 2;
    tally++;
  }

  return tally;
}

// failed:
// (1, [1, 1, 3], [3, 3, 2]) got 1 expected 2
// (2, [1], [3, 2, 5, 5]) got 0 expected 1.
// okay, I see the problem. I have some pairs I'm counting in dirtyPairs that I could use one of when I couldn't use both. e.g.
// (1, [1, 1, 3], [3, 3, 2])
// Here, the algo can't see that there are 2 dirty 3s to pair with the 1 clean 3, since the 2 dirty 3s got removed and counted in dirtyPairs
// I can't pair them prematurely like that
// instead, in the dirty/clean matching pass, if there's a match and the remaining # of dirty socks, minus 1, is nonzero, then add half rounded down to dirtypairs

function solution(K, C, D) {
  // write your code in JavaScript (Node.js 8.9.4)
  let cleans = new Array(51).fill(0);
  let dirties = new Array(51).fill(0);
  let tally = 0;
  let dirtyPairs = 0;
  let remaining = K;

  C.forEach(sock => {
    cleans[sock]++;
    if (cleans[sock] > 1) {
      cleans[sock] = 0;
      tally++;
    }
  });

  if (K == 0) return tally;

  D.forEach(sock => {
    dirties[sock]++;
  });

  for (let i = 0; i < dirties.length; i++) {
    if (dirties[i] > 0 && cleans[i] == 1) {
      tally++;
      remaining--;
      dirties[i]--;
      dirtyPairs += Math.floor(dirties[i] / 2);
    }
  }

  while (remaining > 1 && dirtyPairs > 0) {
    dirtyPairs -= 1;
    remaining -= 2;
    tally++;
  }

  return tally;
}

function solution(K, C, D) {
  // write your code in JavaScript (Node.js 8.9.4)
  let cleans = new Array(51).fill(0);
  let dirties = new Array(51).fill(0);
  let tally = 0;
  let dirtyPairs = 0;
  let remaining = K;

  C.forEach(sock => {
    cleans[sock]++;
    if (cleans[sock] > 1) {
      cleans[sock] = 0;
      tally++;
    }
  });

  if (K == 0) return tally;

  D.forEach(sock => {
    dirties[sock]++;
  });

  for (let i = 0; i < dirties.length; i++) {
    if (dirties[i] > 0) {
      if (cleans[i] == 1) {
        tally++;
        remaining--;
        dirties[i]--;
      }
      dirtyPairs += Math.floor(dirties[i] / 2);
    }
  }

  while (remaining > 1 && dirtyPairs > 0) {
    dirtyPairs -= 1;
    remaining -= 2;
    tally++;
  }

  return tally;
}

// WRONG ANSWER,  got 29 expected 20
