var fs = require('fs');

var contents = fs.readFileSync('assets/Bias Corrector App - English.tsv', 'utf8');
const lines = contents.split("\r\n");

const [title, ...rulesAsLines] = lines
const rulesParsed = rulesAsLines.map ( line => {
  const splitByTab = line.split("\t");
  const [DIVERSITY, BAD_WORD, REPLACEMENT, REASON] = splitByTab
  return {
    DIVERSITY,
    BAD_WORD,
    REPLACEMENT,
    REASON
  }
}).filter(a =>
  a.BAD_WORD !== undefined &&
  a.REPLACEMENT !== undefined
).map(({
  DIVERSITY,
  BAD_WORD,
  REPLACEMENT,
  REASON
}) => {
  return {
    "DIVERSITY": DIVERSITY.toLowerCase(),
    "BAD_WORD": BAD_WORD.toLowerCase(),
    "REPLACEMENT": REPLACEMENT.toLowerCase(),
    REASON
  }
}
)

console.log("Loaded the following rules:")

rulesParsed.map( ({
  DIVERSITY,
  BAD_WORD,
  REPLACEMENT,
  REASON
}) => {
  console.log("--------------")
  const mainBadWordExample = BAD_WORD.split(",")[0]
  const mainReplacementExample = REPLACEMENT.split(",")[0]
  if (DIVERSITY)
  console.log("For " + DIVERSITY + " change from " + mainBadWordExample + " to " + mainReplacementExample);
  else
  console.log("Change from " + mainBadWordExample + " to " + mainReplacementExample);
})

const femaleOnlyRules = rulesParsed.filter(a => a.DIVERSITY == "she")
const maleOnlyRules = rulesParsed.filter(a => a.DIVERSITY == "he")
const generalRules = rulesParsed.filter(a => a.DIVERSITY != "he" && a.DIVERSITY != "she")

// ES6
const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);
const BIAS_CORRECTION = messageMaybeInUppercase => {
  const message = messageMaybeInUppercase.toLowerCase()
  let suggestions = []
  // priority 1
  suggestions = [...suggestions, (message.includes("she")) ?
    femaleOnlyRules.filter( a => message.includes(a.BAD_WORD))
   : []]
  // priority 2
  suggestions = [...suggestions, (message.includes("he")) ?
    maleOnlyRules.filter( a => message.includes(a.BAD_WORD))
  :  []]
  // priority 3
  suggestions = [...suggestions, generalRules.filter( a => message.includes(a.BAD_WORD))]

  return flatten(suggestions)
}

exports.BIAS_CORRECTION = BIAS_CORRECTION


console.log(BIAS_CORRECTION("she is cold"))
console.log(BIAS_CORRECTION("he is a Bugger (n.)"))
console.log(BIAS_CORRECTION("he is a Emotive"))
console.log(BIAS_CORRECTION("she is a Emotive"))
console.log(BIAS_CORRECTION("they all are Emotive and she is cold."))
