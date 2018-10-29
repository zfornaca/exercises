// Oct 1: Minimum moves to equal array elements
// https://leetcode.com/problems/minimum-moves-to-equal-array-elements/description/

var minMoves = function(nums) {
  let min = Infinity;
  let sum = 0;
  for (let num of nums) {
    min = Math.min(min, num);
    sum += num;
  }
  return sum - min * nums.length;
};

// Oct 2: Maximum Product of Three Numbers
// https://leetcode.com/problems/maximum-product-of-three-numbers/description/

// This uses sort, which is better time complex. than triple-nested loops (or even double), but mutates the array. If I make a copy to avoid that I would instead worsen space complexity.
// The alternative would be to track the five relevant items (biggest 3, smallest 2, but dealing with short input arrays is trickier)
var maximumProduct = function(nums) {
  nums.sort((a, b) => a - b);
  const len = nums.length;
  let doubleNegProd = nums[0] * nums[1] * nums[len - 1];
  let noNegProd = nums[len - 1] * nums[len - 2] * nums[len - 3];
  return Math.max(doubleNegProd, noNegProd);
};

// Oct 3: Linked List Cycle
// https://leetcode.com/problems/linked-list-cycle/description/

var hasCycle = function(head) {
  let move1 = head;
  let move2 = head;
  while (move2 && move2.next) {
    move1 = move1.next;
    move2 = move2.next.next;
    if (move1 === move2) return true;
  }
  return false;
};

// Oct 15: Remove duplicates from sorted array
// https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/

var removeDuplicates = function(nums) {
  if (nums.length <= 1) return nums.length;

  let i = 0;
  let j = 1;

  while (j < nums.length) {
    if (nums[j] === nums[i]) j++;
    else {
      i++;
      nums[i] = nums[j];
      j++;
    }
  }
  return i + 1;
};

// Oct 15: Middle of the Linked List
// https://leetcode.com/problems/middle-of-the-linked-list/description/

var middleNode = function(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

// Oct 28: Duplicate Emails
// https://leetcode.com/problems/duplicate-emails/description/

/*
SELECT Email FROM Person GROUP BY Email HAVING COUNT(Email)>1;
*/

// Oct 28: First Unique Character in a String
// https://leetcode.com/submissions/detail/186176517/

var firstUniqChar = function(s) {
  let map = {};

  for (let i = 0; i < s.length; i++) {
    if (map.hasOwnProperty(s[i])) {
      map[s[i]] += 1;
    } else {
      map[s[i]] = 1;
    }
  }
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === 1) return i;
  }

  return -1;
};
