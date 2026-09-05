module.exports = async function handler(req, res) {
    // ป้องกันปัญหา CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { userText, systemPrompt } = req.body;
        const apiKey = process.env.GEMINI_API_KEY; 

        if (!apiKey) {
            return res.status(200).json({ reply: "❌ ไม่พบ API Key ใน Vercel" });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents: [{ role: "user", parts: [{ text: userText }] }],
                generationConfig: { temperature: 0.4 }
            })
        });

        const data = await response.json();

        // 🔴 ถ้า Google ปฏิเสธการเชื่อมต่อ ให้เอาสาเหตุมาแสดงที่หน้าแชทเลย
        if (!response.ok) {
            const errorMsg = data.error?.message || JSON.stringify(data);
            return res.status(200).json({ 
                reply: `🚨 <b>ข้อผิดพลาดจาก Google:</b><br>${errorMsg}` 
            });
        }
        
        // ถ้าสำเร็จ ก็ตอบกลับตามปกติ
        let aiReply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply: aiReply.replace(/\n/g, '<br>') });

    } catch (error) {
        // ถ้าเซิร์ฟเวอร์พัง ให้ฟ้องบนหน้าแชท
        res.status(200).json({ reply: "🚨 ระบบ Vercel ขัดข้อง: " + error.message });
    }
};
