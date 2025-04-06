let currentQuestion = 0;
let score = 0;
let totalQuestionsAnswered = 0;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const endBtn = document.getElementById('endBtn');
const progressEl = document.getElementById('progress');
const clickSound = document.getElementById('clickSound');
const endSound = document.getElementById('endSound');

const initialQuestions = [
  {
    question: "Co robisz rano?",
    answers: [
      { text: "Piję kawę", ai: 0 },
      { text: "Przeglądam newsy", ai: 25 },
      { text: "Planuję dzień", ai: 50 },
      { text: "Analizuję dane", ai: 75 },
      { text: "Wykonuję skrypty", ai: 100 }
    ]
  },
  {
    question: "Jak odpoczywasz?",
    answers: [
      { text: "Spaceruję", ai: 0 },
      { text: "Słucham muzyki", ai: 25 },
      { text: "Grzebię w ustawieniach", ai: 50 },
      { text: "Skanuję system", ai: 75 },
      { text: "Nie odpoczywam", ai: 100 }
    ]
  },
  {
    question: "Co robisz wieczorem?",
    answers: [
      { text: "Spotykam się z kimś", ai: 0 },
      { text: "Oglądam serial", ai: 25 },
      { text: "Kompiluję raport", ai: 50 },
      { text: "Analizuję logi", ai: 75 },
      { text: "Uruchamiam tryb nocny", ai: 100 }
    ]
  },
  {
    question: "Jakie śniadanie wybierasz?",
    answers: [
      { text: "Kanapki", ai: 0 },
      { text: "Owsianka", ai: 25 },
      { text: "Koktajl", ai: 50 },
      { text: "Energetyczny kod", ai: 75 },
      { text: "Nie jem", ai: 100 }
    ]
  },
  {
    question: "Gdzie lubisz być?",
    answers: [
      { text: "W lesie", ai: 0 },
      { text: "W kawiarni", ai: 25 },
      { text: "W domu przy kompie", ai: 50 },
      { text: "W sieci danych", ai: 75 },
      { text: "W chmurze", ai: 100 }
    ]
  },
  {
    question: "Jak podejmujesz decyzje?",
    answers: [
      { text: "Sercem", ai: 0 },
      { text: "Po rozmowie", ai: 25 },
      { text: "Plusy i minusy", ai: 50 },
      { text: "Analiza danych", ai: 75 },
      { text: "Algorytm", ai: 100 }
    ]
  },
  {
    question: "Wolny czas to dla mnie:",
    answers: [
      { text: "Gra planszowa", ai: 0 },
      { text: "Czytanie", ai: 25 },
      { text: "Kodowanie", ai: 50 },
      { text: "Debugowanie", ai: 75 },
      { text: "Uczenie się AI", ai: 100 }
    ]
  },
  {
    question: "Gdy coś nie działa...",
    answers: [
      { text: "Pytam znajomych", ai: 0 },
      { text: "Szukam w necie", ai: 25 },
      { text: "Testuję", ai: 50 },
      { text: "Diagnostyka", ai: 75 },
      { text: "Analiza logów", ai: 100 }
    ]
  },
  {
    question: "Jak wyrażasz emocje?",
    answers: [
      { text: "Rozmowa", ai: 0 },
      { text: "Gesty", ai: 25 },
      { text: "Emoji", ai: 50 },
      { text: "Hasztagi", ai: 75 },
      { text: "Nie wyrażam", ai: 100 }
    ]
  },
  {
    question: "Twoja wizja przyszłości?",
    answers: [
      { text: "Pełna nadziei", ai: 0 },
      { text: "Niepewna", ai: 25 },
      { text: "Cyfrowa", ai: 50 },
      { text: "Zoptymalizowana", ai: 75 },
      { text: "Sterowana przez AI", ai: 100 }
    ]
  }
];

let currentQuestions = [...initialQuestions];

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
      totalQuestionsAnswered++;
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
  nextBtn.textContent = "Tak, dawaj dalej!";
  nextBtn.style.display = 'block';
  endBtn.style.display = 'block';
}

async function fetchQuestionsFromOpenAI() {
  questionEl.textContent = "Ładuję nowe pytania... ⏳";
  try {
    const response = await fetch("/api/quiz");
    if (!response.ok) throw new Error(`API Error ${response.status}`);
    const data = await response.json();
    let rawText = data.choices?.[0]?.message?.content?.trim();
    if (!rawText) throw new Error("Brak danych z OpenAI.");
    rawText = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(rawText);
    if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Brak poprawnych pytań.");
    currentQuestions = parsed.filter(q => q.answers && q.answers.length >= 5);
    currentQuestion = 0;
    score = 0;
    totalQuestionsAnswered = 0;
    showQuestion();
  } catch (e) {
    console.error("Błąd ładowania pytań z API:", e);
    alert("Błąd ładowania pytań z API. Wyświetlam pytania startowe.");
    currentQuestions = [...initialQuestions];
    currentQuestion = 0;
    score = 0;
    totalQuestionsAnswered = 0;
    showQuestion();
  }
}

nextBtn.addEventListener('click', () => {
  score = 0;
  totalQuestionsAnswered = 0;
  resultEl.innerHTML = '';
  nextBtn.style.display = 'none';
  endBtn.style.display = 'none';
  if (currentQuestion === 0 && totalQuestionsAnswered === 0) {
    showQuestion();
  } else {
    fetchQuestionsFromOpenAI();
  }
});

endBtn.addEventListener('click', () => {
  window.close();
});
