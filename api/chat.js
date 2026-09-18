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

    // 1. ดึง Key หลัก และ Key สำรองแยกกัน
    const primaryKeysStr = process.env.GEMINI_API_KEYS || "";
    const fallbackKeyStr = process.env.GEMINI_API_KEY || "";

    // 2. จัดเรียงคิว
    let orderedKeys = [];
    if (primaryKeysStr) {
      orderedKeys = orderedKeys.concat(primaryKeysStr.split(",").map((k) => k.trim()).filter((k) => k));
    }
    if (fallbackKeyStr) {
      orderedKeys = orderedKeys.concat(fallbackKeyStr.split(",").map((k) => k.trim()).filter((k) => k));
    }
    orderedKeys = [...new Set(orderedKeys)];

    if (orderedKeys.length === 0) {
      return res.status(500).json({ error: "API Key is missing" });
    }

    let lastError = null;

    // 3. วนลูปใช้งาน API Key ตามลำดับ
    for (const apiKey of orderedKeys) {
      try {
        const ai = new GoogleGenAI({ apiKey: apiKey });

        // 🔴 ใช้โมเดล gemini-3.8-flash ตามเดิม พร้อมโครงสร้างคำสั่งที่ถูกต้อง
        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: userText,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.4,
          },
        });

        return res
          .status(200)
          .json({ reply: response.text.replace(/\n/g, "<br>") });
      } catch (error) {
        console.warn(
          `[Warning] API Key failed, switching to next... Error: ${error.message}`,
        );
        lastError = error;
      }
    }

    console.error("All API keys failed:", lastError);
    return res.status(500).json({
      error: "เซิร์ฟเวอร์ AI มีผู้ใช้งานหนาแน่น กรุณาลองใหม่ในอีกสักครู่ค่ะ",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
};
