export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Brak klucza API OpenAI." });
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Wygeneruj 10 krótkich i prostych pytań do quizu pt. „Ile w Tobie jest człowieka, a ile AI?”. 
Każde pytanie powinno mieć 2 odpowiedzi, które:
- brzmią naturalnie i codziennie,
- nie zawierają technicznego ani naukowego słownictwa,
- nie sugerują, która z odpowiedzi pasuje do człowieka, a która do AI.

Każda odpowiedź powinna zawierać tylko tekst (klucz: "text") oraz wartość liczbową (klucz: "ai") – 1 dla bardziej ludzkiej, 3 dla bardziej sztucznej – ale użytkownik nie może tego wiedzieć.

Nie dodawaj żadnych komentarzy, opisów ani oznaczeń Markdown. Zwróć **czysty JSON** w formacie:
[
  {
    "question": "Co robisz, gdy pada deszcz?",
    "answers": [
      { "text": "Słucham dźwięku deszczu", "ai": 1 },
      { "text": "Obserwuję spadek temperatury i wilgotność", "ai": 3 }
    ]
  },
  ...
]`
 
[
  {
    "question": "Jak rozwiązujesz problemy?",
    "answers": [
      { "text": "Przez eksperymentowanie z otoczeniem", "ai": 1 },
      { "text": "Analizując wszystkie dane i symulując scenariusze", "ai": 3 }
    ]
  }
]`
          }
        ],
        temperature: 1
      })
    });

    const data = await openaiResponse.json();

    if (openaiResponse.status !== 200) {
      return res.status(openaiResponse.status).json({ error: data });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Błąd serwera:", error);
    res.status(500).json({ error: "Błąd po stronie serwera lub OpenAI" });
  }
}
