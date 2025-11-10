// ✅ Global questions array (Cypress reads it)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// ✅ Your code starts here
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Restore saved progress (sessionStorage)
let userAnswers =
  JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);

// ----------------------
// Render the quiz
// ----------------------
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");

    // Add question text
    const qText = document.createElement("p");
    qText.textContent = q.question;
    questionDiv.appendChild(qText);

    // Add options
    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;

      // Restore checked answers from sessionStorage
      if (userAnswers[index] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // ✅ Important for Cypress
      }

      // Save progress when changed
      input.addEventListener("change", (e) => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));

        // ✅ Update checked attributes for all radios in this question
        const radios = document.getElementsByName(`question-${index}`);
        radios.forEach((r) => r.removeAttribute("checked"));
        e.target.setAttribute("checked", "true");
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// ----------------------
// Calculate score
// ----------------------
function calculateScore() {
  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// ----------------------
// Event listeners
// ----------------------
submitButton.addEventListener("click", calculateScore);

// ----------------------
// On page load
// ----------------------
window.addEventListener("load", () => {
  // Restore score if exists
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }

  renderQuestions();
});
