const { GoogleGenAI } = require("@google/genai");

// ฟังก์ชันจำกัดเวลา (Timeout) ป้องกัน Vercel ค้างจนทะลุ 300 วินาที
const withTimeout = (promise, ms) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Request timed out after ${ms} ms`));
    }, ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
};

module.exports = async function handler(req, res) {
  // 1. จัดการ CORS (Cross-Origin Resource Sharing)
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

    // 2. ดึงและจัดเรียง API Keys
    const primaryKeysStr = process.env.GEMINI_API_KEYS || "";
    const fallbackKeyStr = process.env.GEMINI_API_KEY || "";

    const parseKeys = (str) =>
      str
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

    // รวม Key หลักและสำรอง พร้อมตัดตัวซ้ำออก (Deduplication)
    const orderedKeys = [
      ...new Set([...parseKeys(primaryKeysStr), ...parseKeys(fallbackKeyStr)]),
    ];

    if (orderedKeys.length === 0) {
      return res
        .status(500)
        .json({ error: "API Key is missing in environment variables" });
    }

    let lastError = null;
    const TIMEOUT_MS = 15000; // จำกัดเวลารอ 15 วินาทีต่อ 1 Key

    // 3. วนลูปใช้งาน API Key ตามลำดับเป๊ะๆ พร้อมระบบป้องกันค้าง
    for (const apiKey of orderedKeys) {
      try {
        const ai = new GoogleGenAI({ apiKey: apiKey });

        // ใช้คำสั่ง generateContent ที่ถูกต้อง พร้อมบังคับ Timeout
        const response = await withTimeout(
          ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: userText,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.4,
            },
          }),
          TIMEOUT_MS,
        );

        // ดึงข้อความตอบกลับและจบการทำงานทันทีหากสำเร็จ
        return res.status(200).json({
          reply: response.text.replace(/\n/g, "<br>"),
        });
      } catch (error) {
        console.warn(
          `[Warning] API Key failed or timed out, switching to next... Error: ${error.message}`,
        );
        lastError = error;
      }
    }

    // 4. กรณี Key ทุกตัวล้มเหลว หรือเซิร์ฟเวอร์ Google ล่มทั้งหมด
    console.error("All API keys failed or timed out:", lastError?.message);
    return res.status(503).json({
      error: "เซิร์ฟเวอร์ AI มีผู้ใช้งานหนาแน่น กรุณาลองใหม่ในอีกสักครู่ค่ะ",
    });
  } catch (error) {
    console.error("Critical Server Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
