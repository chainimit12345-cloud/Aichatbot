const { GoogleGenAI } = require("@google/genai");

module.exports = async function handler(req, res) {
  // 1. จัดการ CORS เพื่อให้หน้าเว็บคุยกับหลังบ้านได้
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

    if (!userText) {
      return res.status(400).json({ error: "userText is required" });
    }

    // 2. ดึง API Key จาก GEMINI_API_KEYS เท่านั้น
    let apiKey = process.env.GEMINI_API_KEYS || "";
    apiKey = apiKey.split(",")[0].trim(); // ดึงมาแค่ตัวแรกสุด เผื่อมีลูกน้ำติดมา

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "API Key is missing in environment variables" });
    }

    // 3. ยิงข้อมูลไปที่ Google AI ด้วย Key เดียว จบในรอบเดียว
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userText,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.4,
      },
    });

    // 4. ถ้าสำเร็จ ส่งคำตอบกลับไปที่หน้าเว็บทันที
    return res.status(200).json({
      reply: response.text.replace(/\n/g, "<br>"),
    });
  } catch (error) {
    // 5. ถ้าพัง (เช่น 429 โควต้าเต็ม) จะเด้งมาที่นี่และจบงานทันที
    console.error("API Error:", error.message);

    return res.status(500).json({
      error:
        "เซิร์ฟเวอร์ AI มีผู้ใช้งานหนาแน่น หรือโควต้าเต็ม กรุณาลองใหม่ในอีกสักครู่ค่ะ",
    });
  }
};
