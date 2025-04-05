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
            content: `Wygeneruj 10 prostych pytań do quizu „Ile w Tobie jest człowieka, a ile AI?”. 
Każde pytanie powinno być zrozumiałe dla 15-latka. 
Do każdego pytania podaj 4 krótkie odpowiedzi. 
Każda odpowiedź powinna mieć dwa pola: "text" (tekst odpowiedzi) oraz "ai" (1 = bardziej człowiek, 3 = bardziej AI). 
Odpowiedzi powinny być naturalne, krótkie i nie mogą sugerować od razu, która jest bardziej ludzka lub sztuczna. 
Unikaj trudnych słów, technicznego języka, filozofii i AI-żargonu.

Zwróć wyłącznie czysty JSON w formacie:

[
  {
    "question": "Jak najczęściej spędzasz wieczór?",
    "answers": [
      { "text": "Oglądam film", "ai": 1 },
      { "text": "Układam plan dnia", "ai": 3 },
      { "text": "Piszę do znajomych", "ai": 1 },
      { "text": "Przeglądam dane", "ai": 3 }
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
