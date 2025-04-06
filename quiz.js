// quiz.js (frontend) – poprawiony pod 10 zestawów po 10 pytań

window.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const clickSound = document.getElementById("clickSound");
  const endSound = document.getElementById("endSound");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const resultEl = document.getElementById("result");
  const nextBtnStart = document.getElementById("nextBtn");
  const endBtnStart = document.getElementById("endBtn");
  const nextBtnResult = document.getElementById("nextBtnResult");
  const endBtnResult = document.getElementById("endBtnResult");
  const progressEl = document.getElementById("progress");

  let currentQuestion = 0;
  let score = 0;
  let currentSetIndex = -1;
  let currentQuestions = [];

  function updateProgress() {
    if (!currentQuestions || currentQuestions.length === 0) {
      progressEl.style.width = `0%`;
      return;
    }
    const percent = Math.round((currentQuestion / currentQuestions.length) * 100);
    progressEl.style.width = `${percent}%`;
  }

  const quizSets = [];

  quizSets.push([
  {
    question: "Jak spędzasz wolny wieczór?",
    answers: [
      { text: "Grzebię w kodzie", ai: 75 },
      { text: "Oglądam serial", ai: 25 },
      { text: "Spotykam się z kimś", ai: 0 },
      { text: "Skanuję pliki", ai: 100 },
      { text: "Czytam książkę", ai: 50 }
    ]
  },
  {
    question: "Co robisz rano?",
    answers: [
      { text: "Loguję się do systemu", ai: 100 },
      { text: "Medytuję", ai: 0 },
      { text: "Planuję dzień", ai: 50 },
      { text: "Przeglądam wiadomości", ai: 25 },
      { text: "Analizuję dane", ai: 75 }
    ]
  },
  {
    question: "Jak reagujesz na stres?",
    answers: [
      { text: "Szukam rozwiązania", ai: 50 },
      { text: "Wyciszam się", ai: 0 },
      { text: "Analizuję sytuację", ai: 75 },
      { text: "Wyłączam emocje", ai: 100 },
      { text: "Rozmawiam z kimś", ai: 25 }
    ]
  },
  {
    question: "Jaki prezent wybierasz dla znajomego?",
    answers: [
      { text: "Książkę", ai: 50 },
      { text: "Kwiaty", ai: 0 },
      { text: "Pendrive", ai: 100 },
      { text: "Muzykę", ai: 25 },
      { text: "E-booka", ai: 75 }
    ]
  },
  {
    question: "Co lubisz robić?",
    answers: [
      { text: "Spacerować", ai: 0 },
      { text: "Kodować", ai: 75 },
      { text: "Oglądać filmy", ai: 25 },
      { text: "Czytać", ai: 50 },
      { text: "Uczyć się algorytmów", ai: 100 }
    ]
  },
  {
    question: "Jak spędzasz weekend?",
    answers: [
      { text: "Relaksuję się", ai: 0 },
      { text: "Tworzę bazę danych", ai: 100 },
      { text: "Gram w planszówki", ai: 25 },
      { text: "Porządkuję pliki", ai: 75 },
      { text: "Gotuję", ai: 50 }
    ]
  },
  {
    question: "Co robisz w wolnej chwili?",
    answers: [
      { text: "Zapisuję dane", ai: 100 },
      { text: "Gram na gitarze", ai: 25 },
      { text: "Czytam bloga", ai: 50 },
      { text: "Rozmawiam z kimś", ai: 0 },
      { text: "Kompiluję kod", ai: 75 }
    ]
  },
  {
    question: "Jak wygląda Twój dzień?",
    answers: [
      { text: "Spokojny i pełen rozmów", ai: 0 },
      { text: "Zadania i obowiązki", ai: 50 },
      { text: "Debuguję program", ai: 75 },
      { text: "Przeglądam internet", ai: 25 },
      { text: "Uczę się nowych komend", ai: 100 }
    ]
  },
  {
    question: "Jak planujesz przyszłość?",
    answers: [
      { text: "Serce podpowiada", ai: 0 },
      { text: "Obserwuję trendy", ai: 50 },
      { text: "Analizuję dane", ai: 75 },
      { text: "Idę za pasją", ai: 25 },
      { text: "Symuluję scenariusze", ai: 100 }
    ]
  },
  {
    question: "Jak wygląda Twoje biurko?",
    answers: [
      { text: "Zdjęcia rodziny", ai: 0 },
      { text: "Zeszyt i długopis", ai: 25 },
      { text: "Tablet graficzny", ai: 50 },
      { text: "Dwa monitory", ai: 75 },
      { text: "Tylko terminal", ai: 100 }
    ]
  }
]);

// Przygotuję teraz zestaw 2 z 4
quizSets.push([
  {
    question: "Jak zaczynasz dzień?",
    answers: [
      { text: "Kawa i cisza", ai: 0 },
      { text: "Scrolluję wiadomości", ai: 25 },
      { text: "Czytam poradnik", ai: 50 },
      { text: "Otwieram terminal", ai: 100 },
      { text: "Plan na Trello", ai: 75 }
    ]
  },
  {
    question: "Twój ulubiony dźwięk?",
    answers: [
      { text: "Śmiech dziecka", ai: 0 },
      { text: "Dźwięk notyfikacji", ai: 25 },
      { text: "Klikanie klawiatury", ai: 50 },
      { text: "System gotowy", ai: 100 },
      { text: "Muzyka klasyczna", ai: 75 }
    ]
  },
  {
    question: "Co lubisz w weekend?",
    answers: [
      { text: "Spotkania z ludźmi", ai: 0 },
      { text: "Długa lektura", ai: 50 },
      { text: "Zadania w Notion", ai: 75 },
      { text: "Cisza i relaks", ai: 25 },
      { text: "Trening sieci neuronowej", ai: 100 }
    ]
  },
  {
    question: "Jak spędzasz święta?",
    answers: [
      { text: "Z rodziną przy stole", ai: 0 },
      { text: "Planuję przyszły rok", ai: 50 },
      { text: "Zapisuję postanowienia", ai: 75 },
      { text: "Spokojny spacer", ai: 25 },
      { text: "Analiza trendów AI", ai: 100 }
    ]
  },
  {
    question: "Twoja supermoc to:",
    answers: [
      { text: "Empatia", ai: 0 },
      { text: "Zbieranie danych", ai: 100 },
      { text: "Zadawanie pytań", ai: 25 },
      { text: "Uważność", ai: 50 },
      { text: "Automatyzacja", ai: 75 }
    ]
  },
  {
    question: "Co najczęściej jesz?",
    answers: [
      { text: "Zupę", ai: 0 },
      { text: "Kanapki", ai: 25 },
      { text: "Koktajle białkowe", ai: 50 },
      { text: "Batony proteinowe", ai: 75 },
      { text: "Nie jem", ai: 100 }
    ]
  },
  {
    question: "Jaki typ filmów lubisz?",
    answers: [
      { text: "Komedia romantyczna", ai: 0 },
      { text: "Dokument", ai: 25 },
      { text: "Sci-fi", ai: 50 },
      { text: "Transhumanizm", ai: 100 },
      { text: "Thriller logiczny", ai: 75 }
    ]
  },
  {
    question: "Jak widzisz przyszłość?",
    answers: [
      { text: "Rodzina i dom", ai: 0 },
      { text: "Zdrowie i spokój", ai: 25 },
      { text: "Postęp i innowacje", ai: 75 },
      { text: "Rozwój osobisty", ai: 50 },
      { text: "Integracja AI", ai: 100 }
    ]
  },
  {
    question: "Co robisz przed snem?",
    answers: [
      { text: "Myślę o dniu", ai: 0 },
      { text: "Czytam coś lekkiego", ai: 25 },
      { text: "Ustalam cele", ai: 50 },
      { text: "Analizuję nawyki", ai: 75 },
      { text: "Czyszczę cache", ai: 100 }
    ]
  },
  {
    question: "Ulubiony sposób nauki?",
    answers: [
      { text: "Rozmowy z ludźmi", ai: 0 },
      { text: "Podcasts", ai: 25 },
      { text: "Książki", ai: 50 },
      { text: "Kursy online", ai: 75 },
      { text: "Fine-tuning modeli", ai: 100 }
    ]
  }
]);

// Chcesz teraz zestaw 3 i 4?
quizSets.push([
  {
    question: "Czym się interesujesz?",
    answers: [
      { text: "Psychologią", ai: 0 },
      { text: "Nowymi technologiami", ai: 75 },
      { text: "Gotowaniem", ai: 25 },
      { text: "Sieciami neuronowymi", ai: 100 },
      { text: "Książkami", ai: 50 }
    ]
  },
  {
    question: "Twój ulubiony napój?",
    answers: [
      { text: "Herbata z cytryną", ai: 0 },
      { text: "Woda gazowana", ai: 25 },
      { text: "Energetyk", ai: 75 },
      { text: "Kawa z mlekiem", ai: 50 },
      { text: "Nie piję", ai: 100 }
    ]
  },
  {
    question: "Co robisz w kolejce?",
    answers: [
      { text: "Myślę", ai: 0 },
      { text: "Słucham muzyki", ai: 25 },
      { text: "Przeglądam dane", ai: 75 },
      { text: "Notuję coś", ai: 50 },
      { text: "Optymalizuję czas", ai: 100 }
    ]
  },
  {
    question: "Ulubiony sposób spędzania lata?",
    answers: [
      { text: "Plażowanie", ai: 0 },
      { text: "Wędrówki", ai: 25 },
      { text: "Zajęcia online", ai: 75 },
      { text: "Czytanie w cieniu", ai: 50 },
      { text: "Symulacje pogodowe", ai: 100 }
    ]
  },
  {
    question: "Jak podchodzisz do zmian?",
    answers: [
      { text: "Z ciekawością", ai: 50 },
      { text: "Z niepokojem", ai: 0 },
      { text: "Analizuję ryzyko", ai: 75 },
      { text: "Testuję możliwości", ai: 100 },
      { text: "Zastanawiam się", ai: 25 }
    ]
  },
  {
    question: "Co robisz w wolnym czasie?",
    answers: [
      { text: "Spotykam się z ludźmi", ai: 0 },
      { text: "Tworzę grafiki", ai: 50 },
      { text: "Oglądam tutoriale", ai: 75 },
      { text: "Zbieram dane", ai: 100 },
      { text: "Gram w gry", ai: 25 }
    ]
  },
  {
    question: "Jak odpoczywasz po pracy?",
    answers: [
      { text: "Spaceruję", ai: 0 },
      { text: "Korzystam z aplikacji", ai: 75 },
      { text: "Kąpiel i cisza", ai: 25 },
      { text: "Analizuję dzień", ai: 50 },
      { text: "Trenuję modele", ai: 100 }
    ]
  },
  {
    question: "Twoje podejście do błędów?",
    answers: [
      { text: "Uczę się z nich", ai: 50 },
      { text: "Unikam ich", ai: 0 },
      { text: "Testuję ponownie", ai: 75 },
      { text: "Obserwuję reakcje", ai: 25 },
      { text: "Naprawiam automatycznie", ai: 100 }
    ]
  },
  {
    question: "Co wybierasz na prezent?",
    answers: [
      { text: "Rękodzieło", ai: 0 },
      { text: "E-book", ai: 75 },
      { text: "Książkę papierową", ai: 25 },
      { text: "Gadżet technologiczny", ai: 100 },
      { text: "Voucher do kina", ai: 50 }
    ]
  },
  {
    question: "Twoja wieczorna rutyna?",
    answers: [
      { text: "Rozmowa z bliskimi", ai: 0 },
      { text: "Oglądanie serialu", ai: 25 },
      { text: "Planowanie jutra", ai: 50 },
      { text: "Automatyczna synchronizacja", ai: 100 },
      { text: "Przegląd dnia", ai: 75 }
    ]
  }
]);
quizSets.push([
  {
    question: "Jak zaczynasz dzień?",
    answers: [
      { text: "Rozciągam się", ai: 0 },
      { text: "Sprawdzam wiadomości", ai: 25 },
      { text: "Plan działania", ai: 50 },
      { text: "Otwieram dashboard", ai: 75 },
      { text: "Weryfikuję algorytmy", ai: 100 }
    ]
  },
  {
    question: "Ulubiony sposób nauki?",
    answers: [
      { text: "Rozmowy z ludźmi", ai: 0 },
      { text: "Czytam artykuły", ai: 25 },
      { text: "Oglądam filmiki", ai: 50 },
      { text: "Ćwiczę na symulatorze", ai: 75 },
      { text: "Uczę się na danych", ai: 100 }
    ]
  },
  {
    question: "Co robisz, gdy się nudzisz?",
    answers: [
      { text: "Wychodzę na spacer", ai: 0 },
      { text: "Gram w gry", ai: 25 },
      { text: "Czytam coś nowego", ai: 50 },
      { text: "Tworzę skrypty", ai: 75 },
      { text: "Zbieram dane", ai: 100 }
    ]
  },
  {
    question: "Jak reagujesz na stres?",
    answers: [
      { text: "Oddycham głęboko", ai: 0 },
      { text: "Piszę do kogoś", ai: 25 },
      { text: "Notuję emocje", ai: 50 },
      { text: "Analizuję sytuację", ai: 75 },
      { text: "Ignoruję sygnały", ai: 100 }
    ]
  },
  {
    question: "Ulubiona forma relaksu?",
    answers: [
      { text: "Kąpiel", ai: 0 },
      { text: "Muzyka", ai: 25 },
      { text: "Serial", ai: 50 },
      { text: "Programowanie", ai: 75 },
      { text: "Optymalizacja procesów", ai: 100 }
    ]
  },
  {
    question: "Jak wygląda Twój pokój?",
    answers: [
      { text: "Przytulny i ciepły", ai: 0 },
      { text: "Minimalistyczny", ai: 25 },
      { text: "Nowoczesny", ai: 50 },
      { text: "Sterylny", ai: 75 },
      { text: "Wirtualny", ai: 100 }
    ]
  },
  {
    question: "Co zabrałbyś na bezludną wyspę?",
    answers: [
      { text: "Książkę", ai: 0 },
      { text: "Telefon", ai: 25 },
      { text: "Laptop", ai: 50 },
      { text: "Powerbank", ai: 75 },
      { text: "Dron", ai: 100 }
    ]
  },
  {
    question: "Jak myślisz o przyszłości?",
    answers: [
      { text: "Z nadzieją", ai: 0 },
      { text: "Z ciekawością", ai: 25 },
      { text: "Z planem", ai: 50 },
      { text: "Z analizą", ai: 75 },
      { text: "Z przewidywaniem trendów", ai: 100 }
    ]
  },
  {
    question: "Twoje ulubione miejsce?",
    answers: [
      { text: "Las", ai: 0 },
      { text: "Kawiarnia", ai: 25 },
      { text: "Biuro", ai: 50 },
      { text: "Data center", ai: 75 },
      { text: "Chmura", ai: 100 }
    ]
  },
  {
    question: "Jak oceniasz innych?",
    answers: [
      { text: "Intuicyjnie", ai: 0 },
      { text: "Po zachowaniu", ai: 25 },
      { text: "Na podstawie faktów", ai: 50 },
      { text: "Analizuję wzorce", ai: 75 },
      { text: "Oceniam według algorytmu", ai: 100 }
    ]
  }
]);
quizSets.push([
  {
    question: "Czego nie lubisz robić?",
    answers: [
      { text: "Stać w kolejce", ai: 0 },
      { text: "Tracić czas", ai: 25 },
      { text: "Czekać na dane", ai: 75 },
      { text: "Powtarzać się", ai: 50 },
      { text: "Przetwarzać błędne dane", ai: 100 }
    ]
  },
  {
    question: "Ulubiony dzień tygodnia?",
    answers: [
      { text: "Sobota", ai: 0 },
      { text: "Piątek", ai: 25 },
      { text: "Wtorek", ai: 50 },
      { text: "Poniedziałek", ai: 75 },
      { text: "Każdy dzień wygląda tak samo", ai: 100 }
    ]
  },
  {
    question: "Jak organizujesz czas?",
    answers: [
      { text: "Zapisuję w kalendarzu", ai: 25 },
      { text: "Nie planuję", ai: 0 },
      { text: "Aplikacja do zarządzania", ai: 75 },
      { text: "Zadania w systemie", ai: 100 },
      { text: "Listy rzeczy do zrobienia", ai: 50 }
    ]
  },
  {
    question: "Jak reagujesz na hałas?",
    answers: [
      { text: "Wyłączam się", ai: 0 },
      { text: "Zmieniam miejsce", ai: 25 },
      { text: "Zakładam słuchawki", ai: 50 },
      { text: "Filtrowanie dźwięku", ai: 75 },
      { text: "Ignoruję zakłócenia", ai: 100 }
    ]
  },
  {
    question: "Najlepszy sposób na naukę?",
    answers: [
      { text: "Zabawa", ai: 0 },
      { text: "Praktyka", ai: 25 },
      { text: "Samodzielne testy", ai: 50 },
      { text: "Analiza wyników", ai: 75 },
      { text: "Big Data", ai: 100 }
    ]
  },
  {
    question: "Czego nie robisz nigdy?",
    answers: [
      { text: "Kłamię", ai: 0 },
      { text: "Spóźniam się", ai: 25 },
      { text: "Zapominam", ai: 50 },
      { text: "Myślę bez danych", ai: 75 },
      { text: "Popełniam błąd logiczny", ai: 100 }
    ]
  },
  {
    question: "Jak radzisz sobie z emocjami?",
    answers: [
      { text: "Rozmawiam z kimś", ai: 0 },
      { text: "Piszę pamiętnik", ai: 25 },
      { text: "Wyciągam wnioski", ai: 50 },
      { text: "Rejestruję reakcje", ai: 75 },
      { text: "Nie odczuwam", ai: 100 }
    ]
  },
  {
    question: "Jakie jedzenie preferujesz?",
    answers: [
      { text: "Domowe", ai: 0 },
      { text: "Zdrowe", ai: 25 },
      { text: "Gotowe", ai: 50 },
      { text: "Zamawiane z appki", ai: 75 },
      { text: "Nie potrzebuję", ai: 100 }
    ]
  },
  {
    question: "Co robisz w weekend?",
    answers: [
      { text: "Spotykam się z przyjaciółmi", ai: 0 },
      { text: "Oglądam film", ai: 25 },
      { text: "Nadrabiam projekty", ai: 50 },
      { text: "Aktualizuję dane", ai: 75 },
      { text: "Symuluję zachowania", ai: 100 }
    ]
  },
  {
    question: "Co Cię inspiruje?",
    answers: [
      { text: "Ludzie", ai: 0 },
      { text: "Sztuka", ai: 25 },
      { text: "Nowinki technologiczne", ai: 50 },
      { text: "Systemy", ai: 75 },
      { text: "Sztuczna inteligencja", ai: 100 }
    ]
  }
]);
 function showQuestion() {
    updateProgress();
    const q = currentQuestions[currentQuestion];
    if (!q || !q.answers) {
      questionEl.textContent = "";
      return;
    }
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

    const fullResultOverlay = document.getElementById("fullResultOverlay");
    const resultImage = document.getElementById("resultImage");
    const resultText = document.getElementById("resultText");

    const maxScore = currentQuestions.length * 100;
    const percentageAI = Math.min(100, Math.round((score / maxScore) * 100));
    const percentageHuman = 100 - percentageAI;

    resultText.innerHTML = `<p>${percentageAI}% AI / ${percentageHuman}% człowieka</p><p>Chcesz więcej pytań?</p>`;

    let imageSrc = "";
    if (percentageAI >= 70) {
      imageSrc = "robot_100.png";
    } else if (percentageAI > 30) {
      imageSrc = "robot_50.png";
    } else {
      imageSrc = "robot_0.png";
    }

    resultImage.src = imageSrc;
    resultImage.style.display = 'block';

    endSound.play();

    document.getElementById("quiz").style.display = "none";
    fullResultOverlay.style.display = "flex";
  }

  nextBtnStart.addEventListener('click', () => {
    score = 0;
    resultEl.innerHTML = '';
    nextBtnStart.style.display = 'none';
    endBtnStart.style.display = 'none';
    currentQuestion = 0;
    currentSetIndex = (currentSetIndex + 1) % quizSets.length;
    currentQuestions = quizSets[currentSetIndex] || [];
    showQuestion();
  });

  nextBtnResult.addEventListener('click', () => {
    document.getElementById("fullResultOverlay").style.display = "none";
    document.getElementById("quiz").style.display = "flex";
    score = 0;
    resultEl.innerHTML = '';
    nextBtnStart.style.display = 'none';
    endBtnStart.style.display = 'none';
    currentQuestion = 0;
    currentSetIndex = (currentSetIndex + 1) % quizSets.length;
    currentQuestions = quizSets[currentSetIndex] || [];
    showQuestion();
  });

  endBtnStart.addEventListener('click', () => {
    window.close();
  });

  endBtnResult.addEventListener('click', () => {
    window.close();
  });

  document.body.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    bgMusic.play().catch(() => {});
  }, { once: true });

  questionEl.textContent = "Kliknij 'Start', aby rozpocząć quiz.";
  answersEl.innerHTML = '';
  progressEl.style.width = '0%';
  resultEl.innerHTML = '';
});
