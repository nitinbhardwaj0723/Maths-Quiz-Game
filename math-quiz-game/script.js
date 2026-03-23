let score = 0;
let time = 10;
let timer;
let correctAnswer;

// Game start
function startGame() {
  score = 0;
  document.getElementById("score").innerText = score;
  document.getElementById("game").classList.remove("hidden");
  generateQuestion();
}

// Question generate karna
function generateQuestion() {
  let difficulty = document.getElementById("difficulty").value;

  let num1, num2;

  if (difficulty === "easy") {
    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);
  } else if (difficulty === "medium") {
    num1 = Math.floor(Math.random() * 50);
    num2 = Math.floor(Math.random() * 50);
  } else {
    num1 = Math.floor(Math.random() * 100);
    num2 = Math.floor(Math.random() * 100);
  }

  let operators = ["+", "-", "*"];
  let operator = operators[Math.floor(Math.random() * operators.length)];

  if (operator === "+") correctAnswer = num1 + num2;
  if (operator === "-") correctAnswer = num1 - num2;
  if (operator === "*") correctAnswer = num1 * num2;

  document.getElementById("question").innerText =
    `${num1} ${operator} ${num2}`;

  startTimer();
}

// Timer start
function startTimer() {
  time = 15;
  document.getElementById("time").innerText = time;

  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    document.getElementById("time").innerText = time;

    if (time === 0) {
      clearInterval(timer);
      generateQuestion();
    }
  }, 1000);
}

// Answer check karna
function checkAnswer() {
  let userAnswer = Number(document.getElementById("answer").value);

  if (userAnswer === correctAnswer) {
    score++;
    document.getElementById("score").innerText = score;
  }

  document.getElementById("answer").value = "";
  generateQuestion();
}

// Leaderboard save
function saveScore() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(score);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 5);

  localStorage.setItem("scores", JSON.stringify(scores));
  displayLeaderboard();
}

// Leaderboard show
function displayLeaderboard() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  let list = document.getElementById("leaderboard");
  list.innerHTML = "";

  scores.forEach(s => {
    let li = document.createElement("li");
    li.innerText = s;
    list.appendChild(li);
  });
}

// Page load par leaderboard
displayLeaderboard();