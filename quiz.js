// quiz.js (frontend) - Wersja offline z 10 zestawami pytań

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

  const quizSets = [
    // Zestaw 1
    [
      {
        question: "Co robisz rano?",
        answers: [
          { text: "Piję kawę", ai: 0 },
          { text: "Planuję dzień", ai: 50 },
          { text: "Analizuję dane", ai: 75 },
          { text: "Przeglądam newsy", ai: 25 },
          { text: "Wykonuję skrypty", ai: 100 }
        ]
      },
      {
        question: "Jak odpoczywasz?",
        answers: [
          { text: "Spaceruję", ai: 0 },
          { text: "Grzebię w ustawieniach", ai: 50 },
          { text: "Nie odpoczywam", ai: 100 },
          { text: "Skanuję system", ai: 75 },
          { text: "Słucham muzyki", ai: 25 }
        ]
      },
      {
        question: "Co robisz wieczorem?",
        answers: [
          { text: "Tryb nocny", ai: 100 },
          { text: "Kompiluję raport", ai: 50 },
          { text: "Oglądam serial", ai: 25 },
          { text: "Spotykam się z kimś", ai: 0 },
          { text: "Analizuję logi", ai: 75 }
        ]
      },
      {
        question: "Jakie śniadanie wybierasz?",
        answers: [
          { text: "Nie jem", ai: 100 },
          { text: "Kanapki", ai: 0 },
          { text: "Energetyczny kod", ai: 75 },
          { text: "Koktajl", ai: 50 },
          { text: "Owsianka", ai: 25 }
        ]
      },
      {
        question: "Gdzie lubisz być?",
        answers: [
          { text: "W kawiarni", ai: 25 },
          { text: "W sieci danych", ai: 75 },
          { text: "Przy kompie", ai: 50 },
          { text: "W chmurze", ai: 100 },
          { text: "W lesie", ai: 0 }
        ]
      },
      {
        question: "Jak podejmujesz decyzje?",
        answers: [
          { text: "Plusy i minusy", ai: 50 },
          { text: "Rozmowa", ai: 25 },
          { text: "Sercem", ai: 0 },
          { text: "Algorytm", ai: 100 },
          { text: "Analiza danych", ai: 75 }
        ]
      },
      {
        question: "Wolny czas to...",
        answers: [
          { text: "Uczenie AI", ai: 100 },
          { text: "Kodowanie", ai: 50 },
          { text: "Gra planszowa", ai: 0 },
          { text: "Czytanie", ai: 25 },
          { text: "Debugowanie", ai: 75 }
        ]
      },
      {
        question: "Gdy coś nie działa...",
        answers: [
          { text: "Diagnostyka", ai: 75 },
          { text: "Testuję", ai: 50 },
          { text: "Pytam znajomych", ai: 0 },
          { text: "Szukam w necie", ai: 25 },
          { text: "Analiza logów", ai: 100 }
        ]
      },
      {
        question: "Jak wyrażasz emocje?",
        answers: [
          { text: "Emoji", ai: 50 },
          { text: "Hasztagi", ai: 75 },
          { text: "Gesty", ai: 25 },
          { text: "Rozmowa", ai: 0 },
          { text: "Nie wyrażam", ai: 100 }
        ]
      },
      {
        question: "Twoja wizja przyszłości?",
        answers: [
          { text: "Zoptymalizowana", ai: 75 },
          { text: "Pełna nadziei", ai: 0 },
          { text: "Cyfrowa", ai: 50 },
          { text: "Niepewna", ai: 25 },
          { text: "Sterowana przez AI", ai: 100 }
        ]
      }
    ]
    // Można wkleić kolejne 9 zestawów w tym miejscu
  ];

  let currentQuestions = quizSets[currentSetIndex];

  function updateProgress() {
    const percent = Math.round((currentQuestion / currentQuestions.length) * 100);
    progressEl.style.width = `${percent}%`;
  }

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
});
