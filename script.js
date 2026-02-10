const questions = [
    { 
        q: "HTML stands for?", 
        opt: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Text Machine Language"], 
        ans: 0 
    },
    { 
        q: "CSS is used for?", 
        opt: ["Styling", "Logic", "Database"], 
        ans: 0 
    },
    { 
        q: "JS stands for?", 
        opt: ["Java System", "JavaScript", "Just Script"], 
        ans: 1 
    },
    { 
        q: "Paragraph tag?", 
        opt: ["<p>", "<h1>", "<div>"], 
        ans: 0 
    },
    { 
        q: "CSS color property?", 
        opt: ["font", "color", "bg"], 
        ans: 1 
    },
    { 
        q: "NOT a programming language?", 
        opt: ["Python", "HTML", "Java"], 
        ans: 1 
    },
    { 
        q: "JS runs in?", 
        opt: ["Browser", "Compiler", "Printer"], 
        ans: 0 
    },
    { 
        q: "Bootstrap is?", 
        opt: ["CSS Framework", "Game", "OS"], 
        ans: 0 
    },
    { 
        q: "DOM stands for?", 
        opt: ["Document Object Model", "Data Object Module", "Digital Ordinance Model"], 
        ans: 0 
    },
    { 
        q: "What is JS?", 
        opt: ["Language", "Car", "Fruite"], 
        ans: 0 
    }
];

const instructionsPage = document.getElementById("instructionsPage");
const quizPage = document.getElementById("quizPage");
const startQuizBtn = document.getElementById("startQuizBtn");
const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const timerBox = document.getElementById("timerBox");
const optionsBox = document.getElementById("optionsBox");
const saveNextBtn = document.getElementById("saveNextBtn");
const prevBtn = document.getElementById("prevBtn");


let currentIndex = 0;
let score = 0;
let timer;

const userAnswers = [];
for (let i = 0; i < questions.length; i++) {
  userAnswers.push(null);
}

startQuizBtn.addEventListener("click", function () {
  instructionsPage.classList.add("d-none");
  quizPage.classList.remove("d-none");
  showQuestion();
});

function showQuestion() {
  console.log ("Question index:", currentIndex);
  const currentQuestion = questions[currentIndex];
  console.log("Question object:", currentQuestion);
  questionCount.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  questionText.textContent = currentQuestion.q;
  optionsBox.innerHTML = "";

  currentQuestion.opt.forEach((option, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("form-check", "mb-2");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "option" + index;
    radio.name = "option";
    radio.classList.add("form-check-input");
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "option" + index;
    label.classList.add("form-check-label");
    label.textContent = option;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    optionsBox.appendChild(inputGroup);

    radio.addEventListener("change", () => {
      saveNextBtn.disabled = false;
    });
  });

  if (currentIndex === 0) {
   prevBtn.classList.add("d-none");
} else {
   prevBtn.classList.remove("d-none");
}
  saveNextBtn.disabled = true;
  startTimer();
}

saveNextBtn.onclick = function() {
  checkAnswer();
};

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        showQuestion(currentIndex);
    }
});

   if (userAnswers[currentIndex] !== null) {

      document.getElementById("option" + userAnswers[currentIndex]).checked = true;
      saveNextBtn.disabled = false;
   }

function checkAnswer() {
  // const currentQuestion = questions[currentIndex];
  // const optionRadios = document.getElementsByName("option"); 

  // for (let i = 0; i < optionRadios.length; i++) {
  //   if (optionRadios[i].checked && i === currentQuestion.ans) {
  //     score++;
  //   }
  // }

  const optionRadios = document.getElementsByName("option");
  let selected = null;

  for (let i = 0; i < optionRadios.length; i++) {
    if (optionRadios[i].checked) {
      selected = i;
      break;
    }
  }

  console.log ("Selected answer:", selected);
  userAnswers[currentIndex] = selected;
  console.log("All user answers:", userAnswers);

  score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].ans) score++;
  }
  console.log("Current score:", score);

  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  currentIndex++;
  if (currentIndex >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  quizPage.innerHTML = "";

  const resultCard = document.createElement("div");
  resultCard.classList.add("card", "p-4", "text-center");

  const heading = document.createElement("h2");
  heading.textContent = "Quiz Finished!";

  const scoreElement = document.createElement("p");
  scoreElement.textContent = `Your Score: ${score} out of ${questions.length}`;

  const restartBtn = document.createElement("button");
  restartBtn.type = "submit";
  restartBtn.textContent = "Restart Quiz";
  restartBtn.classList.add("btn", "btn-primary", "mt-3");

  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  resultCard.appendChild(heading);
  resultCard.appendChild(scoreElement);

  const reviewList = document.createElement("div");
    reviewList.classList.add("mt-4", "text-start");

    questions.forEach((q, i) => {

      const item = document.createElement("div");
      item.classList.add("mb-2", "p-2", "border");

      const qText = document.createElement("p");
      console.log("Question Text:",qText);
      qText.innerHTML = `<strong>Q${i + 1}:</strong> ${q.q}`;
        
      const userAns = q.opt[userAnswers[i]] ?? "No answer";
      console.log("selected userAns:",userAns); 
      const correctAns = q.opt[q.ans];
      console.log("Correct answer:",correctAns);

      const ansText = document.createElement("p");
      ansText.textContent = `Your Answer: ${userAns}`;
      const correctText = document.createElement("p");
      correctText.textContent = `Correct Answer: ${correctAns}`;
        
      if (userAnswers[i] === q.ans) {
        ansText.style.color = "green";
        ansText.innerHTML += "    ✅Correct";
        }
        else {
           ansText.style.color = "red";
           ansText.innerHTML += "   ❌Wrong";
        }
        item.appendChild(qText);
        item.appendChild(ansText);
        item.appendChild(correctText);
        reviewList.appendChild(item);
    });

  resultCard.appendChild(reviewList);
  resultCard.appendChild(restartBtn);

  quizPage.appendChild(resultCard);
}

function startTimer() {
  clearInterval(timer);

  const endTime = Date.now() + 30000; 

  timer = setInterval(() => {
    let remaining = Math.floor((endTime - Date.now()) / 1000);
    if (remaining < 0) remaining = 0;

    timerBox.textContent = "Time: " + remaining + "s";

    if (remaining === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 500);
}








