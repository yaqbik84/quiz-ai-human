export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Brak klucza API OpenAI" });
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
        messages: [
          {
            role: "user",
            content: `Wygeneruj 10 nieoczywistych, zabawnych i intrygujących pytań do quizu pt. „Ile w Tobie jest człowieka, a ile AI?”.
Każde pytanie powinno mieć dokładnie 2 odpowiedzi, które nie sugerują jednoznacznie, czy dana opcja pasuje do człowieka, czy do AI.
Użytkownik nie powinien wiedzieć, która odpowiedź jest bardziej AI lub bardziej ludzka.
Odpowiedzi powinny mieć klucz „text” (tekst odpowiedzi) oraz „ai” z wartością 1 (człowiek) lub 3 (AI).
Zwróć tylko czysty JSON w takim formacie (bez żadnych wstępów, opisów ani komentarzy):

[
  {
    "question": "Jak wolisz rozwiązywać problemy?",
    "answers": [
      { "text": "Metodą prób i błędów z nutką intuicji", "ai": 1 },
      { "text": "Analizując dane i wybierając najbardziej logiczne rozwiązanie", "ai": 3 }
    ]
  }
]`
          }
        ],
        temperature: 1
      })
    });

    const data = await response.json();
