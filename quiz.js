// quiz.js (frontend) – przygotowany pod 10 zestawów po 10 pytań

window.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const clickSound = document.getElementById("clickSound");
  const endSound = document.getElementById("endSound");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const resultEl = document.getElementById("result");
  const nextBtn = document.getElementById("nextBtn");
  const endBtn = document.getElementById("endBtn");
  const progressEl = document.getElementById("progress");

  let currentQuestion = 0;
  let score = 0;
  let currentSetIndex = 0;

  function updateProgress() {
    const percent = Math.round((currentQuestion / currentQuestions.length) * 100);
    progressEl.style.width = `${percent}%`;
  }

  const quizSets = [];

  // 👇 W TYM MIEJSCU WPROWADŹ DANE ZESTAWY PYTAŃ (10 zestawów po 10 pytań)
  // quizSets.push([...]); // Zestaw 1
  // quizSets.push([...]); // Zestaw 2
  // ...
  // quizSets.push([...]); // Zestaw 10

  let currentQuestions = quizSets[currentSetIndex] || [];

  function showQuestion() {
    updateProgress();
    const q = currentQuestions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = '';
    const shuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5);
    shuffledAnswers.forEach((a) => {
      const btn = document.createElement('button');
      btn.textContent = a.text;
      btn.onclick = () => {
        clickSound.play();
        score += a.ai;
        currentQuestion++;
        if (currentQuestion < currentQuestions.length) {
          showQuestion();
        } else {
          showResult();
        }
      };
      answersEl.appendChild(btn);
    });
  }

  function showResult() {
    updateProgress();
    answersEl.innerHTML = '';
    questionEl.textContent = "Twój wynik:";
    let maxScore = currentQuestions.length * 100;
    let percentageAI = Math.min(100, Math.round((score / maxScore) * 100));
    let percentageHuman = 100 - percentageAI;
    resultEl.innerHTML = `<p>${percentageAI}% AI / ${percentageHuman}% człowieka</p><p>Chcesz więcej pytań?</p>`;
    endSound.play();
    nextBtn.textContent = "Tak, dalej!";
    nextBtn.style.display = 'block';
    endBtn.style.display = 'block';
  }

  nextBtn.addEventListener('click', () => {
    score = 0;
    resultEl.innerHTML = '';
    nextBtn.style.display = 'none';
    endBtn.style.display = 'none';
    currentQuestion = 0;
    currentSetIndex = (currentSetIndex + 1) % quizSets.length;
    currentQuestions = quizSets[currentSetIndex];
    showQuestion();
  });

  endBtn.addEventListener('click', () => {
    window.close();
  });

  document.body.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    bgMusic.play().catch(() => {});
  }, { once: true });

  if (currentQuestions.length > 0) {
    showQuestion();
  } else {
    questionEl.textContent = "Brak pytań do wyświetlenia.";
  }
});
