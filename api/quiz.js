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
        model: "gpt-3.5-turbo",
        temperature: 1,
        messages: [
          {
            role: "user",
            content: `Wygeneruj 10 nieoczywistych i lekko absurdalnych pytań do quizu „Ile w Tobie jest człowieka, a ile AI?”. Każde pytanie ma mieć 2 odpowiedzi, które:
- brzmią naturalnie i zabawnie,
- są nietypowe i wymykają się logice,
- nie sugerują, która odpowiedź pasuje bardziej do człowieka lub AI.

Każda odpowiedź powinna zawierać:
- klucz „text” (tekst odpowiedzi),
- klucz „ai”: 1 (bardziej ludzka) lub 3 (bardziej AI),
ale odpowiedzi nie mogą wyglądać na techniczne, cyfrowe ani zbyt oczywiste.

Zwróć **czysty JSON** bez żadnych dodatkowych opisów ani formatowania Markdown.

Przykład:
[
  {
    "question": "Co robisz, gdy zobaczysz gołębia na dachu?",
    "answers": [
      { "text": "Wysyłam mu wiadomość myślową", "ai": 3 },
      { "text": "Udaję, że to nie ja", "ai": 1 }
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
