export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Wygeneruj 10 zabawnych pytań quizowych w formacie JSON na temat: 'ile w Tobie jest człowieka, a ile AI'. Każde pytanie powinno mieć 2 odpowiedzi w formacie { text, ai } – gdzie ai = 1 (człowiek) lub 3 (AI). Nie dodawaj komentarza, tylko zwróć poprawny JSON."
        }
      ],
      temperature: 1
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
