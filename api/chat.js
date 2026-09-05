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

        // 🔴 อัปเดตชื่อโมเดลเป็น gemini-3.6-flash ตามคำสั่งของ Google เป๊ะๆ
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

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

        if (!response.ok) {
            const errorMsg = data.error?.message || JSON.stringify(data);
            return res.status(200).json({ 
                reply: `🚨 <b>ข้อผิดพลาดจาก Google:</b><br>${errorMsg}` 
            });
        }
        
        let aiReply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply: aiReply.replace(/\n/g, '<br>') });

    } catch (error) {
        res.status(200).json({ reply: "🚨 ระบบ Vercel ขัดข้อง: " + error.message });
    }
};
