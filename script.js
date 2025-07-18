let nextBtn = document.getElementById("next-btn");
let result = document.getElementById("result");
let quizBox = document.querySelector(".quiz-box");

let score = 0;
let questions = [];
let currentQuestionIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch("./question.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      showQuestion();
    });
});

nextBtn.addEventListener("click", () => {
  let selectedOption = document.querySelector('input[name="answer"]:checked');

  if (!selectedOption) {
    alert("please select an aption");
    return;
  }

  let userAnswer = selectedOption.value.trim();
  let correctAnswer = questions[currentQuestionIndex].answer;

  const isCorrect = userAnswer == correctAnswer;
  if (isCorrect) score++;

  result.innerHTML += `
    <div class="answer-box ${
      userAnswer === correctAnswer ? "correct" : "incorrect"
    }">
      <p><strong>your answer:</strong> <span class="user-answer">${userAnswer}</span></p>
      <p><strong>correct answer:</strong> <span class="correct-answer">${correctAnswer}</span></p>
    </div>
  `;
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    setTimeout(() => {
      showScore();
    }, 150);
    nextBtn.disabled = true;
  }
});

const showQuestion = () => {
  let currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return;

  let optionsHtml = currentQuestion.options
    .map((opt) => {
      return `<li>
        <input class="input" type="radio" name="answer" value="${opt}" />
        <label>${opt}</label>
      </li>`;
    })
    .join("");

  quizBox.innerHTML = `
    <div>
      <h3>${currentQuestion.question}</h3>
      <ul>${optionsHtml}</ul>
    </div>
  `;
};

const showScore = () => {
  const scoreBox = document.getElementById("score-box");
  quizBox.style.display = "none";
  nextBtn.style.display = "none";
  scoreBox.innerHTML = `
    <div class="final-score">
      <h2>🎉 game is Done!</h2>
      <p> your score: <strong>${score}</strong> from <strong>${questions.length}</strong></p>
      <button id="restart-btn">restart</button>
    </div>
  `;

  document.getElementById("restart-btn").addEventListener("click", () => {
    location.reload();
  });
};
