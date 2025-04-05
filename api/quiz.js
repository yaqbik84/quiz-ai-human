export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Brak klucza API OpenAI." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        temperature: 1,
        messages: [
          {
            role: "user",
            content: `Wygeneruj 10 prostych pytań do quizu „Ile w Tobie jest człowieka, a ile AI?”. 
Każde pytanie powinno być zrozumiałe dla 15-latka.
Do każdego pytania podaj dokładnie 5 krótkich odpowiedzi (maks. 5 słów), w formacie:
[
  {
    "question": "Treść pytania",
    "answers": [
      { "text": "odpowiedź 1", "ai": 0 },
      { "text": "odpowiedź 2", "ai": 25 },
      { "text": "odpowiedź 3", "ai": 50 },
      { "text": "odpowiedź 4", "ai": 75 },
      { "text": "odpowiedź 5", "ai": 100 }
    ]
  }
]
Odpowiedzi mają być pomieszane, naturalne i nie mogą sugerować bezpośrednio, która pasuje do AI lub człowieka.

Zwróć wyłącznie poprawny JSON bez Markdown, komentarzy i formatowania kodu.`
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Błąd backendu:", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera lub brak odpowiedzi z OpenAI." });
  }
}
