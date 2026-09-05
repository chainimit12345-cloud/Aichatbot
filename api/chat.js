const { GoogleGenAI } = require("@google/genai");

module.exports = async function handler(req, res) {
  // ป้องกันปัญหาการข้ามโดเมน (CORS)
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
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API Key is missing" });
    }

    // 1. เรียกใช้ SDK ของ Google
    const ai = new GoogleGenAI({ apiKey: apiKey });

    // 2. ใช้คำสั่งตามที่คุณส่งมา (พร้อมใส่ชื่อโมเดลใหม่ล่าสุด)
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: userText,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.4,
      },
    });

    // 3. ส่งข้อความกลับไปที่หน้าเว็บ
    res
      .status(200)
      .json({ reply: interaction.output_text.replace(/\n/g, "<br>") });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
};
