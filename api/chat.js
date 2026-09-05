module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const apiKey = process.env.GEMINI_API_KEY; 

        if (!apiKey) {
            return res.status(200).json({ reply: "❌ ไม่พบ API Key กรุณาตรวจสอบใน Vercel" });
        }

        // วิ่งไปขอรายชื่อโมเดลทั้งหมดที่ API Key นี้มีสิทธิ์ใช้
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            return res.status(200).json({ reply: "🚨 Google แจ้ง Error ว่า:<br>" + JSON.stringify(data) });
        }
        
        // ดึงชื่อโมเดลมาจัดเรียงให้อ่านง่าย
        const modelNames = data.models ? data.models.map(m => m.name).join('<br>• ') : "ไม่พบรายชื่อโมเดล";
        
        // ส่งรายชื่อกลับไปโชว์ที่หน้าแชท
        res.status(200).json({ 
            reply: `✅ <b>เชื่อมต่อ Google สำเร็จ!</b><br>นี่คือชื่อโมเดลทั้งหมดที่คุณใช้ได้ (ให้ดูบรรทัดที่มีคำว่า generateContent):<br><br>• ${modelNames}<br><br>ก๊อปปี้ชื่อโมเดลที่อยากใช้มาบอกผมได้เลยครับ!` 
        });

    } catch (error) {
        res.status(200).json({ reply: "🚨 Server Error: " + error.message });
    }
};
