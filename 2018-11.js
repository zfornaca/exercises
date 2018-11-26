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
