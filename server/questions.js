const questions = {
  0: {
    title: "Which operator is used to assign a value to a variable?",
    choices: {
      A: "*",
      B: "-",
      C: "x",
      D: "="
    }
  },
  1: {
    title: "How do you declare a JavaScript variable?",
    choices: {
      A: "v carName",
      B: "var carName",
      C: "variable carName"
    }
  }
}

const answers = {
  0: "D",
  1: "B"
}

function getQuestion(id) {
  return questions[id];
}

function checkAnswer(questionId, answer) {
  return {
    correct: answers[questionId] === answer,
    answer: answers[questionId]
  };
}

module.exports = {
  getQuestion: getQuestion, checkAnswer: checkAnswer
}
