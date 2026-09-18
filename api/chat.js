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

    // 2. จัดลำดับคิว API Key (เอา GEMINI_API_KEYS เป็นคิวที่ 1 เสมอ)
    const primaryKeysStr = process.env.GEMINI_API_KEYS || "";
    const fallbackKeyStr = process.env.GEMINI_API_KEY || "";

    const parseKeys = (str) =>
      str
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

    // เรียงคิวตามลำดับ: หลัก -> สำรอง (และกรอง Key ที่ซ้ำกันออก)
    const orderedKeys = [
      ...new Set([...parseKeys(primaryKeysStr), ...parseKeys(fallbackKeyStr)]),
    ];

    if (orderedKeys.length === 0) {
      return res
        .status(500)
        .json({ error: "API Key is missing in environment variables" });
    }

    let lastError = null;

    // 3. วนลูปการทำงานตามลำดับคิว
    for (const apiKey of orderedKeys) {
      try {
        const ai = new GoogleGenAI({ apiKey: apiKey });

        // 🔴 ใช้โมเดล gemini-3.8-flash และเอาระบบ Timeout ออกทั้งหมด
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: userText,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.4,
          },
        });

        // หากสำเร็จ (ไม่ติด Limit) ให้ส่งคำตอบกลับและหยุดลูปทันที
        return res.status(200).json({
          reply: response.text.replace(/\n/g, "<br>"),
        });
      } catch (error) {
        // หาก Key นี้พัง (เช่น โควต้าเต็ม 429) ให้ข้ามไปใช้ Key ตัวถัดไปแทน
        console.warn(
          `[Warning] API Key failed, switching to next... Error: ${error.message}`,
        );
        lastError = error;
      }
    }

    // 4. กรณีที่ Key ทุกตัวติด Limit หรือพังหมด
    console.error("All API keys failed:", lastError?.message);
    return res.status(503).json({
      error: "เซิร์ฟเวอร์ AI มีผู้ใช้งานหนาแน่น กรุณาลองใหม่ในอีกสักครู่ค่ะ",
    });
  } catch (error) {
    console.error("Critical Server Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
