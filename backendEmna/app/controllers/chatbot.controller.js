const openai = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Clé API OpenAI
const apiKey = process.env.OPENAI_API_KEY;
// Initialisation du client OpenAI avec la clé API
const client = new openai.OpenAI({
  apiKey: "AIzaSyDdAijyyfP3j8rc_18ofel55LflA3i-2Ro",
});

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GeminaiKey);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });
exports.chat = async (req, res) => {
  try {
    const { prompt } = req.body; // Extracting prompt from request body

    // Check if prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Call the generateContent method with the prompt
    const result = await model.generateContent(prompt);
    const response = result.response;

    // Check if response is empty or undefined
    if (!response || response.text().trim() === "") {
      return res.send({
        response: "Désolé, pas de réponse pour cette question.",
      });
    }

    const text = response.text();

    // Send the chatbot response
    res.send({ response: text });
  } catch (error) {
    console.error("Error processing chatbot request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
