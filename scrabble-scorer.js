// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 };
 
	  }
	}
	return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word: ");
   return word;
}

const newPointStructure = transform(oldPointStructure);

function simpleScorer (word) {
   let value = 0;
   // for .. in only works in objects, to iterate through a string or array use of
   for (const letter of word) {
      value += 1;
   }
   return value;
}

function vowelBonusScorer (word) {
   let value = 0;
   let vowels = ['A','E','I','O','U'];
   word = word.toUpperCase();
   for (const letter of word) {
      if (vowels.includes(letter)) {
         value += 3;
      }
      else {
         value += 1;
      }
   };
   return value;
}

function scrabbleScorer (word) {
   let value = 0;
   word = word.toLowerCase();
   for (const letter of word) {
      value += newPointStructure[letter]
   }
   return value;
};

const scoringAlgorithms = [
   {
     name: "Simple Score",
     description: "Each letter is worth 1 point.",
     scorerFunction: simpleScorer
   },
   {
     name: "Bonus Vowels",
     description: "Vowels are 3 pts, consonants are 1 pt.",
     scorerFunction: vowelBonusScorer
   },
   {
     name: "Scrabble",
     description: "The traditional scoring algorithm.",
     scorerFunction: scrabbleScorer
   }
]


function scorerPrompt() {
   let choice =  ""
   console.log("Choose a Scoring Algorithm:");
   console.log("0 - ", scoringAlgorithms[0].name, ": ", scoringAlgorithms[0].description);
   console.log("1 - ", scoringAlgorithms[1].name, ": ", scoringAlgorithms[1].description);
   console.log("2 - ", scoringAlgorithms[2].name, ": ", scoringAlgorithms[2].description);
   // ask user for 0 1 or 2 for which algorithm they want and based on 0, 1, or 2 use if and else ifs to write the respective object over the string choice and return the object 
   choice = input.question("0, 1, or 2: ");
   if (choice == '0') {
      choice = scoringAlgorithms[0];
   }
   else if (choice == '1') {
      choice = scoringAlgorithms[1];
   }
   else if (choice == '2') {
      choice = scoringAlgorithms[2];
   }
   return choice;
}

// mneumonic for...in for keys foreign keys. Use For...of for value of elements in a string or array
function transform(old) {
   let newPoint = {};
   // 1st for...in loop iterate over every key in object old
   for (let key in old) {
      // set letters equal to old[key] value which is an array.
      let letters = old[key];
      // 2nd for loop iterate over every 'letter' element of array 'letters'.  Tried using in but can't use it because returns indexes instead of letter
      for (let letter of letters) {
         newPoint[letter.toLowerCase()] = parseInt(key);
      }
   }
   return newPoint;
}

function runProgram() {
   newWord = initialPrompt();
   choice = scorerPrompt();
   console.log(`Points for '${newWord}': ' ${choice.scorerFunction(newWord)}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
}
