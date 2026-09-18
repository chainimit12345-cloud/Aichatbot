const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { userText, systemPrompt } = req.body;
    
    const keysString = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY;

    if (!keysString) {
      return res.status(500).json({ error: "API Key is missing" });
    }

    const apiKeys = keysString.split(",").map(k => k.trim()).filter(k => k);
    const shuffledKeys = apiKeys.sort(() => 0.5 - Math.random());

    let lastError = null;

    for (const apiKey of shuffledKeys) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-3.8-flash",
          systemInstruction: systemPrompt,
        });

        const result = await model.generateContent(userText);
        const text = result.response.text();

        return res.status(200).json({ reply: text.replace(/\n/g, "<br>") });

      } catch (error) {
        console.warn(`[Warning] API Key failed, switching to next... Error: ${error.message}`);
        lastError = error;
      }
    }

    console.error("All API keys failed:", lastError);
    return res.status(500).json({ error: "เซิร์ฟเวอร์ AI มีผู้ใช้งานหนาแน่น กรุณาลองใหม่ในอีกสักครู่ค่ะ" });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
};
