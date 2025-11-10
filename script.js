//your JS code here.

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Question data is already defined
// (from the given problem statement)
const userAnswers =
  JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);

// ---------------------------
// Render Questions Function
// ---------------------------
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear existing (for rerender on refresh)

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");

    // Question text
    const qText = document.createElement("p");
    qText.textContent = q.question;
    questionDiv.appendChild(qText);

    // Options
    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");

      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;

      // Restore previous selection if any
      if (userAnswers[index] === choice) {
        input.checked = true;
      }

      // Save progress in sessionStorage when user selects an answer
      input.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// ---------------------------
// Calculate and Display Score
// ---------------------------
function calculateScore() {
  let score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  // Display score
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Store score in localStorage
  localStorage.setItem("score", score);
}

// ---------------------------
// Event: Submit Quiz
// ---------------------------
submitButton.addEventListener("click", () => {
  calculateScore();
});

// ---------------------------
// On Page Load: Restore Data
// ---------------------------
window.addEventListener("load", () => {
  // Restore previous score if it exists
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }

  renderQuestions();
});
