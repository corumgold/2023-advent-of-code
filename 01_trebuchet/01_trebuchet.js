// --- Day 1: Trebuchet?! ---
// Something is wrong with global snow production, and you've been selected to take a look.
// The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.
// You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.
// Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

// You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky")
// and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky
// ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet
// ("please hold still, we need to strap you in").

// As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf
// who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

// The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value
// that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit
// (in that order) to form a single two-digit number.

// For example:
// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet

// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

// Consider your entire calibration document. What is the sum of all of the calibration values?

const fs = require("fs");

function findStartingPrefix(input, prefixes) {
  for (const prefix of prefixes) {
    if (input.startsWith(prefix)) {
      return prefix;
    }
  }
  return null; // Return null if no matching prefix is found
}

function findEndingPrefix(input, prefixes) {
  for (const prefix of prefixes) {
    if (input.endsWith(prefix)) {
      return prefix;
    }
  }
  return null; // Return null if no matching prefix is found
}

function getFirstAndLastNumInString(input) {
  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  let firstDig;
  let secondDig;

  for (let i = 0; i < input.length; i++) {
    if (!isNaN(input[i])) {
      firstDig = input[i];
      break;
      // see if the substring starts with a spelled number
    } else if (findStartingPrefix(input.substring(i), numbers)) {
      // if it does, make the first digit equal to the number
      firstDig =
        (numbers.indexOf(findStartingPrefix(input.substring(i), numbers)) + 1);
      break;
    }
  }

  for (let i = input.length; i > 0; i--) {
    if (!isNaN(input[i])) {
      secondDig = input[i];
      break;
      // see if the substring ends with a spelled number
    } else if (findEndingPrefix(input.substring(0, i), numbers)) {
      // if it does, make the second digit equal to the number
      secondDig =
        numbers.indexOf(findEndingPrefix(input.substring(0, i), numbers)) + 1;
      break;
    }
  }

  return parseInt(firstDig) + parseInt(secondDig);
}

function getCalibrationDocSum() {
  const filePath = "calibrationDoc.txt";
  let strings = [];
  let sum = 0;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    strings = data.split("\n");

    for (let i = 0; i < strings.length; i++) {
      sum += parseInt(getFirstAndLastNumInString(strings[i]));
    }
  });

  return sum;
}

console.log(getCalibrationDocSum());
console.log(getFirstAndLastNumInString('18cfour'))
