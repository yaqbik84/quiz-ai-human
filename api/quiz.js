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
            content: `Wygeneruj 10 nieoczywistych, zabawnych i intrygujących pytań do quizu pt. „Ile w Tobie jest człowieka, a ile AI?”.
Każde pytanie powinno mieć dokładnie 2 odpowiedzi, które nie sugerują jednoznacznie, czy dana opcja pasuje do człowieka, czy do AI.
Użytkownik nie powinien wiedzieć, która odpowiedź jest bardziej AI lub bardziej ludzka.
Odpowiedzi powinny mieć klucz „text” (tekst odpowiedzi) oraz „ai” z wartością 1 (człowiek) lub 3 (AI).
Zwróć tylko czysty JSON w takim formacie (bez żadnych opisów ani komentarzy): 
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
