const alphabet = "abcdefghijklmnopqrstuvwxyz";
const key = "houstonnasa";
const plain = "morningguys";

let letters = plain.split("");

const getRow = position => {
  const otherLetter = key.charAt(position);
  const otherPos = alphabet.indexOf(otherLetter);
  const start = alphabet.substr(otherPos);
  const rest = alphabet.substr(0, otherPos);
  return start + rest;
};

const encodeLetter = (letter, position) => {
  const otherLetter = key.charAt(position);
  const otherPos = alphabet.indexOf(otherLetter);
  const start = alphabet.substr(otherPos);
  const rest = alphabet.substr(0, otherPos);
  const row = start + rest;

  const letterPos = alphabet.indexOf(letter);
  return row[letterPos];
};

const decodeLetter = (letter, position) => {};

const cipher = letters.map(encodeLetter);

console.log("cipher", cipher.join(""));

letters = cipher.split("");
const message = letters.map(decodeLetter);
