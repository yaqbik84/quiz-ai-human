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
        model: "gpt-4o",
        temperature: 1,
        messages: [
          {
            role: "user",
            content: `Wygeneruj 10 prostych, zabawnych i neutralnych pytań do quizu pt. „Ile w Tobie jest człowieka, a ile AI?”.
Każde pytanie ma mieć 2 odpowiedzi, z kluczem "text" i wartością "ai" = 1 (człowiek) lub 3 (AI). 
Odpowiedzi muszą być zrozumiałe i nie mogą sugerować, która jest bardziej AI lub bardziej ludzka.
Zwróć czysty JSON bez komentarzy, np.:
[
  {
    "question": "Co robisz rano?",
    "answers": [
      { "text": "Piję kawę", "ai": 1 },
      { "text": "Włączam system i analizuję plan", "ai": 3 }
    ]
  }
]`
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
