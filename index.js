setInterval(function() {
  const star = document.createElement("div");
  star.classList.add("star");
  const size = Math.random() * 3 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = "0px";
  star.style.opacity = Math.random();
  document.body.appendChild(star);
  setTimeout(() => {
    star.remove();
  }, 5000);
}, 100);

const quiz = [
  {
    question: 'В каком году был Эрбол в России',
    answer: [2017, 2015, 2021, 2018],
    correct: 2018
  },
  {
    question: 'Любимый блюда',
    answer: ["Шаурма", "Манты", "Курдак", "Лагман"],
    correct: "Курдак"
  },
  {
    question: 'Любимый кино',
    answer: ["Аватар", "Властилин колец" , "Бригада", "Человек паук"],
    correct: "Властилин колец"
  },
  {
    question: 'Легендарный телефон какой был Эрбола',
    answer: ["Samsung j4", "iphone xr", "samsung j2", "redmi not 13"],
    correct: "Samsung j4"
  },
  {
    question: 'Любимый модель телефона',
    answer: ["Redmi", "iPhone", "Samsung", "Honor"],
    correct: "Samsung"
  },
  {
    question: 'Любимый персонаж  Властилин колец',
    answer: ["АРАГОРН", "ГЕНДАЛЬФ", "ЭЛЬРОНД", "ГИМЛИ"],
    correct: "ГЕНДАЛЬФ"
  },
  {
    question: 'Любимый напитки газированная',
    answer: ["PEPSI", "COCO-COLA", "МАКСЫМ", "КЫМЫЗ"],
    correct: "PEPSI"
  },
  {
    question: 'Какой марки машина предпочитает',
    answer: ["TAYOTA", "BMW", "MAZDA", "MERCEDES"],
    correct: "Tayota"
  },
  {
    question: 'В каком году получил права',
    answer: [2020, 2022, 2019, 2021],
    correct: 2021
  },
  {
    question: 'Любимый актер голливудские',
    answer: ['Джонни Депп', "Вуди Аллен", "Джеймс Франко", "Орланда Блум"],
    correct: "Орланда Блум"
  },
];


let currentQuestion = 0;
let score = 0;

function showQuestion() {
  if(currentQuestion >= quiz.length) {
    showResult();
    return;
  }

  const q = quiz[currentQuestion];

  document.getElementById("question").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answer.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.classList.add("answer-btn"); // вот тут класс


    btn.onclick = function() {
      checkAnswer(answer, btn);
    };

    answersDiv.appendChild(btn);
  });
}

function checkAnswer(userAnswer, buttonClicked) {
  const correctAnswer = quiz[currentQuestion].correct;

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(btn => btn.disabled = true);

  if (userAnswer === correctAnswer) {
    score += 10;
    buttonClicked.classList.add("correct-answer");

  } else {
    buttonClicked.classList.add("wrong-answer");
  }

  buttons.forEach(btn => {
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct-answer");
    }
  });

  document.getElementById("score").style.display = "block";
  document.getElementById("score").textContent = "Ваши баллы: " + score;

  currentQuestion++;

  setTimeout(() => {
    document.getElementById("result").textContent = "";
    showQuestion();
  }, 1000);
}

function showResult() {
  const name = localStorage.getItem("username") || "Пользователь";
  console.log("showResult запустилась")
  document.getElementById("question").textContent = "Викторина закончена!";
  document.getElementById("answers").textContent = "";
  document.getElementById("result").textContent = `${name} ваш итоговый счет: ${score}`;

  document.getElementById("score").style.display = "none"; // очистить тексть

  if (score >= 90) {
    document.getElementById("reward-btn").style.display = "block";
  }
}

let username;

window.onload = function () {
  let username = localStorage.getItem("username");

  if (!username) {
    username = prompt(" Как тебя зовут");
    if (username) {
      localStorage.setItem("username", username);
    } else {
      username = "Пользователь";
    }
  }
  document.getElementById("reward-btn").onclick = function() {
    document.getElementById("quiz-screen").style.display = "none";
    this.style.display = "none";

    const msg = document.getElementById("message");
    msg.style.display = "block";
    msg.innerHTML = ` <div class="div-btn">
    <h2>Друг мой ${username}</h2>
    <p>доступно 200сом</p>
    </div>`;
  };
};





//showQuestion();
document.getElementById("play-btn").addEventListener("click", function() {
  let attempts = parseInt(localStorage.getItem("attempts"));

  if (isNaN(attempts)) {
    attempts = 0;
  }

  if (attempts < 2 ) {
    startQuiz();
    localStorage.setItem("attempts", attempts + 1);
  } else {
    const password = prompt("Введите пароль чтобы пройти тест");
    if (password === "456") {
      startQuiz();
    } else {
      alert("Неверный пароль!");
      return;
    }
  }
});

function startQuiz() {
  currentQuestion = 0;
  score = 0;

  document.getElementById("bg-music").play();
  document.getElementById("play-btn").style.display = "none";
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'block';

  showQuestion();
}
