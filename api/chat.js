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

    // 2. จัดเรียงคิว โดยให้ GEMINI_API_KEYS อยู่คิวแรกเสมอ
    let orderedKeys = [];

    if (primaryKeysStr) {
      const primaryKeys = primaryKeysStr
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k);
      orderedKeys = orderedKeys.concat(primaryKeys);
    }

    if (fallbackKeyStr) {
      const fallbackKeys = fallbackKeyStr
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k);
      orderedKeys = orderedKeys.concat(fallbackKeys);
    }

    // กรอง Key ที่ซ้ำกันออก (ป้องกันกรณีใส่ Key เดียวกันไว้ทั้ง 2 ตัวแปร)
    orderedKeys = [...new Set(orderedKeys)];

    if (orderedKeys.length === 0) {
      return res.status(500).json({ error: "API Key is missing" });
    }

    let lastError = null;

    // 3. วนลูปใช้งาน API Key ตามลำดับเป๊ะๆ (ไม่มีการสุ่มแล้ว)
    for (const apiKey of orderedKeys) {
      try {
        const ai = new GoogleGenAI({ apiKey: apiKey });

        const interaction = await ai.interactions.create({
          model: "gemini-3.8-flash",
          input: userText,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.4,
          },
        });

        return res
          .status(200)
          .json({ reply: interaction.output_text.replace(/\n/g, "<br>") });
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
