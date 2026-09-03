document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------------------
  // 1. ฟังก์ชันสร้างเมนูด้านซ้ายจากไฟล์ data.js (APP_DATA)
  // ----------------------------------------------------------------
  function renderSidebarData() {
    let phonesHTML = "";
    APP_DATA.contact.phones.forEach((phone) => {
      phonesHTML += `
            <a href="${phone.link}" class="flex items-center justify-between group cursor-pointer block hover:bg-white p-1.5 -m-1.5 rounded-lg transition mb-2">
                <div class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0 group-hover:bg-primary group-hover:text-white transition">
                        <i class="fa-solid fa-phone text-[10px]"></i>
                    </div>
                    <div>
                        <p class="text-[9px] text-gray-400 font-medium leading-none mb-0.5">${phone.label}</p>
                        <p class="text-[12px] text-gray-700 font-bold leading-none">${phone.number}</p>
                    </div>
                </div>
                <span class="text-[9px] font-medium text-white bg-green-500 px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">แตะเพื่อโทร</span>
            </a>`;
    });

    const contactHTML = `
        <div class="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-3 xs:p-4 relative overflow-hidden">
            <h3 class="text-[11px] xs:text-[12px] font-bold text-primary mb-3 flex items-center gap-2">
                <i class="fa-solid fa-headset"></i> ติดต่อเจ้าหน้าที่ พมจ.สกลนคร
            </h3>
            <div class="space-y-1">
                ${phonesHTML}
                <div class="mt-3">
                    <a href="${APP_DATA.contact.emailLink}" class="flex items-center justify-between group cursor-pointer block hover:bg-white p-1.5 -m-1.5 rounded-lg transition mb-2">
                        <div class="flex items-center gap-3">
                            <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0 group-hover:bg-primary group-hover:text-white transition">
                                <i class="fa-solid fa-envelope text-[10px]"></i>
                            </div>
                            <div>
                                <p class="text-[9px] text-gray-400 font-medium leading-none mb-0.5">อีเมล</p>
                                <p class="text-[11px] xs:text-[12px] text-gray-700 font-bold truncate w-[100px] xs:w-[110px] leading-none">${APP_DATA.contact.email}</p>
                            </div>
                        </div>
                        <span class="text-[9px] font-medium text-white bg-blue-500 px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">แตะส่งอีเมล</span>
                    </a>
                </div>
                <div class="flex items-start gap-3 pt-2 mt-2 border-t border-primary/10">
                    <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0 mt-0.5">
                        <i class="fa-solid fa-location-dot text-[10px]"></i>
                    </div>
                    <p class="text-[10px] xs:text-[11px] text-gray-600 leading-relaxed">${APP_DATA.contact.address}</p>
                </div>
            </div>
        </div>`;
    document.getElementById("contact-container").innerHTML = contactHTML;

    let deptsHTML = "";
    APP_DATA.departments.forEach((dept) => {
      let itemsHTML = "";
      dept.items.forEach((item) => {
        itemsHTML += `
                <a href="${item.url}" target="_blank" class="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 text-[11px] text-gray-600 hover:text-primary transition">
                    <i class="fa-solid ${item.icon} text-[10px] text-gray-400 w-3 text-center"></i>
                    <span class="truncate">${item.text}</span>
                </a>`;
      });

      deptsHTML += `
            <details class="group border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50">
                <summary class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 transition">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid ${dept.icon} text-[11px] xs:text-[12px] w-4 text-center"></i>
                        <span class="text-[11px] xs:text-[12px] font-semibold text-gray-700">${dept.title}</span>
                    </div>
                    <i class="fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform duration-200 group-open:rotate-180"></i>
                </summary>
                <div class="p-2 space-y-0.5 bg-white border-t border-gray-100 max-h-48 overflow-y-auto">
                    ${itemsHTML}
                </div>
            </details>`;
    });
    document.getElementById("departments-container").innerHTML = deptsHTML;

    let formsHTML = "";
    APP_DATA.forms.forEach((form) => {
      formsHTML += `
            <a href="${form.fileUrl}" target="_blank" download class="w-full flex items-center justify-between p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-primary/5 hover:border-primary/30 transition group text-left mb-1.5 shadow-sm">
                <div class="flex items-center gap-2.5">
                    <i class="fa-solid fa-file-pdf text-red-500 text-[14px]"></i>
                    <span class="text-[11px] xs:text-[12px] font-medium text-gray-700 group-hover:text-primary transition line-clamp-1">${form.text}</span>
                </div>
                <i class="fa-solid fa-download text-gray-300 text-[10px] group-hover:text-primary flex-shrink-0"></i>
            </a>`;
    });
    if (document.getElementById("forms-container"))
      document.getElementById("forms-container").innerHTML = formsHTML;

    let lawsHTML = "";
    APP_DATA.laws.forEach((law) => {
      lawsHTML += `
            <button onclick="document.getElementById('chat-input').value='${law.prompt}'; document.getElementById('send-btn').click();" class="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-primary/30 hover:shadow-sm transition group text-left">
                <span class="text-[11px] xs:text-[12px] font-semibold text-gray-700 group-hover:text-primary transition line-clamp-1">${law.text}</span>
                <i class="fa-regular fa-paper-plane text-gray-300 text-[10px] group-hover:text-primary flex-shrink-0"></i>
            </button>`;
    });
    document.getElementById("laws-container").innerHTML = lawsHTML;
  }

  renderSidebarData();

  // ----------------------------------------------------------------
  // 2. ระบบ Hamburger Menu
  // ----------------------------------------------------------------
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const closeSidebarBtn = document.getElementById("close-sidebar-btn");

  function toggleMenu() {
    if (window.innerWidth < 1024) {
      sidebar.classList.toggle("-translate-x-full");
      overlay.classList.toggle("hidden");
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", toggleMenu);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", toggleMenu);
  if (overlay) overlay.addEventListener("click", toggleMenu);

  // ----------------------------------------------------------------
  // 3. ระบบ AI Chat
  // ----------------------------------------------------------------
  const inputField = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const chatContainer = document.getElementById("chat-container");
  const inputArea = document.getElementById("input-area");
  const welcomeText = document.getElementById("welcome-text");
  const newChatBtn = document.getElementById("new-chat-btn");

  let isFirstMessage = true;

  // 🔴 นำ API Key จาก Google AI Studio มาใส่ตรงนี้
  const GEMINI_API_KEY = "ใส่_API_KEY_ของคุณที่นี่";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  async function fetchAIResponse(userText) {
    const text = userText.trim();

    // 1. ดักคำสั่งข้อมูลติดต่อ
    if (
      text.includes("ติดต่อ") ||
      text.includes("เบอร์") ||
      text.includes("โทร")
    ) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let contactReply =
            '<p class="text-[12px] xs:text-[13px] text-gray-700 mb-2">คุณสามารถติดต่อเจ้าหน้าที่ พมจ.สกลนคร ตามแผนกที่ต้องการได้เลยค่ะ:</p>';
          APP_DATA.contact.phones.forEach((phone) => {
            contactReply += `<div class="flex items-center gap-2 mb-1"><i class="fa-solid fa-phone text-primary w-4 text-center"></i> <span class="font-bold text-gray-800 text-[12px] xs:text-[13px]">${phone.label}:</span> <a href="${phone.link}" class="text-blue-500 hover:underline text-[12px] xs:text-[13px]">${phone.number}</a></div>`;
          });
          contactReply += `<br><div class="flex items-center gap-2 mb-2"><i class="fa-solid fa-envelope text-primary w-4 text-center"></i> <span class="font-bold text-gray-800 text-[12px] xs:text-[13px]">อีเมล:</span> <a href="${APP_DATA.contact.emailLink}" class="text-blue-500 hover:underline text-[12px] xs:text-[13px]">${APP_DATA.contact.email}</a></div>`;
          contactReply += `<div class="flex items-start gap-2 mb-1"><i class="fa-solid fa-location-dot text-primary w-4 text-center mt-1"></i> <div class="text-[12px] xs:text-[13px]"><span class="font-bold text-gray-800">ที่อยู่:</span> ${APP_DATA.contact.address}</div></div>`;

          if (APP_DATA.contact.mapUrl) {
            contactReply += `
                        <div class="mt-2 rounded-xl overflow-hidden border border-gray-200 shadow-sm w-full max-w-full md:w-[450px] h-[200px] xs:h-[250px]">
                            <iframe src="${APP_DATA.contact.mapUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>`;
          }
          resolve(contactReply);
        }, 500);
      });
    }

    // 2. ดักคำสั่งขอโหลดเอกสารฟอร์มผ่านทางแชท
    if (
      text.includes("ขอรับเงินจัดการศพผู้สูงอายุ") ||
      text.includes("จัดการศพ")
    ) {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(`
            <div class="mb-1">
                <p class="text-[13px] text-gray-800 font-bold mb-2">📄 แบบคําขอรับเงินสงเคราะห์และรับรองผู้รับผิดชอบในการจัดการศพผู้สูงอายุตามประเพณี (ศผส. 01)</p>
                <p class="text-[12px] text-gray-600 mb-3 leading-relaxed"><b>เงื่อนไขสำคัญ:</b><br>• ต้องยื่นภายใน 6 เดือนนับตั้งแต่วันออกใบมรณบัตร<br>• ผู้สูงอายุที่เสียชีวิตต้องมีอายุเกิน 60 ปีบริบูรณ์ขึ้นไป สัญชาติไทย และมีคุณสมบัติตามโครงการลงทะเบียนเพื่อสวัสดิการแห่งรัฐ</p>
                <a href="forms/แบบคําขอรับเงินสงเคราะห์และรับรองผู้รับผิดชอบในการจัดการศพผู้สูงอายุตามประเพณี.pdf" download target="_blank" class="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-[12px] font-bold hover:bg-red-500 hover:text-white transition shadow-sm">
                    <i class="fa-solid fa-file-pdf"></i> ดาวน์โหลดแบบฟอร์ม (PDF)
                </a>
            </div>`),
          500,
        ),
      );
    }

    if (
      text.includes("ทำบัตรคนพิการ") ||
      text.includes("บัตรประจำตัวคนพิการ") ||
      text.includes("บัตรคนพิการ")
    ) {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(`
            <div class="mb-1">
                <p class="text-[13px] text-gray-800 font-bold mb-2">📄 แบบคำขอมีบัตรประจำตัวคนพิการ</p>
                <p class="text-[12px] text-gray-600 mb-3 leading-relaxed"><b>การใช้งาน:</b><br>ใช้สำหรับยื่นขอมีบัตรครั้งแรก, บัตรเดิมหมดอายุ, ชำรุด, สูญหาย, มีการเปลี่ยนแปลงในสาระสำคัญ, หรืออายุครบ 60 ปีบริบูรณ์</p>
                <a href="forms/แบบคำขอทำบัตร.pdf" download target="_blank" class="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-[12px] font-bold hover:bg-red-500 hover:text-white transition shadow-sm">
                    <i class="fa-solid fa-file-pdf"></i> ดาวน์โหลดแบบฟอร์ม (PDF)
                </a>
            </div>`),
          500,
        ),
      );
    }

    if (
      text.includes("เปลี่ยนผู้ดูแล") ||
      text.includes("เปลี่ยนแปลงผู้ดูแลคนพิการ") ||
      text.includes("เปลี่ยนแปลงผู้ดูแล") ||
      text.includes("ผู้ดูแลคนพิการ")
    ) {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(`
            <div class="mb-1">
                <p class="text-[13px] text-gray-800 font-bold mb-2">📄 แบบรับรองการเปลี่ยนแปลงผู้ดูแลคนพิการ</p>
                <p class="text-[12px] text-gray-600 mb-3 leading-relaxed"><b>การใช้งาน:</b><br>ใช้สำหรับยื่นคำร้องเมื่อต้องการเปลี่ยนแปลงบุคคลที่ทำหน้าที่เป็นผู้ดูแลคนพิการในระบบ</p>
                <a href="forms/แบบรับรองการเปลี่ยนแปลงผู้ดูแลคนพิการ.pdf" download target="_blank" class="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-[12px] font-bold hover:bg-red-500 hover:text-white transition shadow-sm">
                    <i class="fa-solid fa-file-pdf"></i> ดาวน์โหลดแบบฟอร์ม (PDF)
                </a>
            </div>`),
          500,
        ),
      );
    }

    if (
      text.includes("กู้ยืม") ||
      text.includes("กู้เงิน") ||
      text.includes("ขอกู้ยืมประเภทบุคคล")
    ) {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(`
            <div class="mb-1">
                <p class="text-[13px] text-gray-800 font-bold mb-2">📄 แบบฟอร์มคำร้องขอกู้ยืมประเภทบุคคล</p>
                <p class="text-[12px] text-gray-600 mb-3 leading-relaxed"><b>การใช้งาน:</b><br>ใช้สำหรับยื่นขอกู้ยืมเงินทุนเพื่อประกอบอาชีพสำหรับผู้ที่เข้าเกณฑ์ (เช่น คนพิการ หรือผู้สูงอายุ ตามเงื่อนไขของกองทุน)</p>
                <a href="forms/แบบฟอร์มคำร้องขอกู้ยืมประเภทบุคคล.pdf" download target="_blank" class="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-[12px] font-bold hover:bg-red-500 hover:text-white transition shadow-sm">
                    <i class="fa-solid fa-file-pdf"></i> ดาวน์โหลดแบบฟอร์ม (PDF)
                </a>
            </div>`),
          500,
        ),
      );
    }

    if (
      text.includes("ผู้ประสบปัญหาทางสังคม") ||
      text.includes("ปสค.1") ||
      text.includes("ปสค")
    ) {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(`
            <div class="mb-1">
                <p class="text-[13px] text-gray-800 font-bold mb-2">📄 แบบคำขอรับความช่วยเหลือผู้ประสบปัญหาทางสังคม (ปสค.1)</p>
                <p class="text-[12px] text-gray-600 mb-3 leading-relaxed"><b>การใช้งาน:</b><br>ใช้สำหรับผู้ประสบปัญหาทางสังคมเพื่อยื่นขอรับการช่วยเหลือจากรัฐ เช่น เงินทุนประกอบอาชีพ, เงินสงเคราะห์, ค่าซ่อมแซมบ้าน หรือขอรับเครื่องช่วยความพิการ</p>
                <a href="forms/แบบคำขอรับความช่วยเหลือผู้ประสบปัญหาทางสังคมกระทรวง-พม.-แบบ-ปสค.1.pdf" download target="_blank" class="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-[12px] font-bold hover:bg-red-500 hover:text-white transition shadow-sm">
                    <i class="fa-solid fa-file-pdf"></i> ดาวน์โหลดแบบฟอร์ม (PDF)
                </a>
            </div>`),
          500,
        ),
      );
    }

    if (
      text.includes("ซ่อมแซมบ้าน") ||
      text.includes("ปรับปรุงที่อยู่อาศัย") ||
      text.includes("ซ่อมบ้าน")
    ) {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(`
            <div class="mb-1">
                <p class="text-[13px] text-gray-800 font-bold mb-2">📄 แบบสอบถามความต้องการและคำขอปรับปรุง/ซ่อมแซมที่อยู่อาศัยของผู้สูงอายุ</p>
                <p class="text-[12px] text-gray-600 mb-3 leading-relaxed"><b>ข้อควรรู้:</b><br>• ต้องระบุสภาพบ้านที่ต้องการปรับปรุง (เช่น พื้น หลังคา ห้องน้ำ ระบบไฟ)<br>• หากไม่ใช่เจ้าของบ้านหรือที่ดิน จะต้องทำ "หนังสือยินยอมในการปรับปรุง/ซ่อมแซม" แนบมาด้วย</p>
                <a href="forms/แบบสอบถามความต้องการปรับปรุงซ่อมแซมที่อยู่อาศัยของผู้สูงอายุ.pdf" download target="_blank" class="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-[12px] font-bold hover:bg-red-500 hover:text-white transition shadow-sm">
                    <i class="fa-solid fa-file-pdf"></i> ดาวน์โหลดแบบฟอร์ม (PDF)
                </a>
            </div>`),
          500,
        ),
      );
    }

    // 3. ดักคำสั่งขอดูหมวดกฎหมายแบบ Scrollbox
    if (text === "หมวดกฎหมายเด็กและเยาวชน") {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (typeof LAW_CHILD_KNOWLEDGE !== "undefined") {
            let formattedText = LAW_CHILD_KNOWLEDGE.replace(
              /\*\*(.*?)\*\*/g,
              '<br><strong class="text-primary text-[13px] xs:text-[14px]">$1</strong>',
            ).replace(/\n/g, "<br>");

            let responseHtml = `
                        <div class="mb-2 font-bold text-[13px] xs:text-[14px] text-primary flex items-center gap-2">
                            <i class="fa-solid fa-book-open"></i> ข้อมูลหมวดกฎหมายเด็กและเยาวชน (ฉบับเต็ม)
                        </div>
                        <div class="bg-blue-50/50 p-3 xs:p-4 rounded-xl border border-blue-100 text-[12px] xs:text-[13px] leading-relaxed max-h-[450px] overflow-y-auto shadow-inner">
                            ${formattedText}
                        </div>
                        <p class="text-[10px] xs:text-[11px] text-gray-400 mt-2 text-right"><i class="fa-solid fa-arrow-up-down"></i> เลื่อนกล่องด้านบนเพื่ออ่านข้อมูลทั้งหมดค่ะ</p>
                        `;
            return resolve(responseHtml);
          } else {
            return resolve(
              "ขออภัยค่ะ ไม่พบฐานข้อมูลกฎหมายในระบบ โปรดตรวจสอบไฟล์ knowledge.js ค่ะ",
            );
          }
        }, 500);
      });
    }

    // 4. ถ้าไม่มี API Key ให้ทำงานแบบออฟไลน์
    if (GEMINI_API_KEY === "ใส่_API_KEY_ของคุณที่นี่") {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (typeof LAW_CHILD_KNOWLEDGE !== "undefined" && text.length > 1) {
            let lines = LAW_CHILD_KNOWLEDGE.split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0);
            let foundResults = lines.filter((line) => line.includes(text));

            if (foundResults.length > 0) {
              let limitResults = foundResults.slice(0, 5);
              let responseHtml = `<p class="mb-3 text-primary font-bold"><i class="fa-solid fa-magnifying-glass"></i> พบข้อมูลที่ตรงกับคำว่า "${text}":</p>`;

              limitResults.forEach((line) => {
                let highlightRegex = new RegExp(text, "gi");
                let highlightedLine = line.replace(
                  highlightRegex,
                  `<span class="bg-yellow-200 text-gray-900 px-1 rounded font-semibold">${text}</span>`,
                );
                responseHtml += `<div class="bg-blue-50/50 p-3 rounded-xl border border-blue-100 mb-2 text-[12.5px] xs:text-[13px] leading-relaxed shadow-sm">${highlightedLine}</div>`;
              });

              if (foundResults.length > 5) {
                responseHtml += `<p class="text-[10px] text-gray-400 mt-2 text-center">(พบข้อมูลอื่นๆ อีก ${foundResults.length - 5} รายการ แนะนำให้พิมพ์คำค้นหาเจาะจงขึ้นค่ะ)</p>`;
              }
              return resolve(responseHtml);
            }
          }
          resolve(
            `ขออภัยค่ะ ตอนนี้ฉันยังไม่พบข้อมูลที่ตรงกับคำว่า <b>"${text}"</b> ในระบบค่ะ (ขณะนี้ทำงานในโหมด Offline ยังไม่ได้ต่อ API)`,
          );
        }, 600);
      });
    }

    // 5. โหมดใช้งานจริง (API Gemini)
    try {
      const systemPrompt = `คุณคือ AI ผู้ช่วยด้านสิทธิสวัสดิการและกฎหมาย ของสำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์จังหวัดสกลนคร (พมจ.สกลนคร)
            หน้าที่ของคุณคือตอบคำถามประชาชนอย่างสุภาพ เข้าใจง่าย ถูกต้องตามกฎหมาย และจัดรูปแบบให้อ่านง่าย
            
            กรุณาใช้ข้อมูลอ้างอิงจาก "คลังข้อมูลกฎหมายเด็กและเยาวชน" ต่อไปนี้เป็นหลักในการตอบคำถาม:
            """
            ${typeof LAW_CHILD_KNOWLEDGE !== "undefined" ? LAW_CHILD_KNOWLEDGE : "ไม่มีข้อมูลกฎหมาย"}
            """
            
            หากคำถามไหนไม่มีคำตอบในคลังข้อมูลนี้ ให้ตอบตามความรู้ทั่วไปของคุณ หรือแนะนำให้ติดต่อเจ้าหน้าที่ พม. ผ่านเบอร์ 042-711-471`;

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: userText }] }],
          generationConfig: { temperature: 0.2 },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error details:", errorData);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      let aiReply = data.candidates[0].content.parts[0].text;
      return aiReply.replace(/\n/g, "<br>");
    } catch (error) {
      console.error("API Error:", error);
      return '<span class="text-red-500">ขออภัยค่ะ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ AI ได้ในขณะนี้ โปรดตรวจสอบ API Key ค่ะ</span>';
    }
  }

  async function sendMessage() {
    const message = inputField.value.trim();

    if (message !== "") {
      const now = new Date();
      const timeStr =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

      if (isFirstMessage) {
        isFirstMessage = false;
        welcomeText.style.display = "none";

        chatContainer.className =
          "w-full h-full absolute inset-0 z-0 overflow-y-auto px-4 xs:px-6 md:px-8 pt-[80px] xs:pt-[90px] md:pt-[100px] pb-[320px] flex flex-col gap-4 xs:gap-6 animate-fade-in";
        inputArea.className =
          "absolute bottom-0 left-0 right-0 px-4 xs:px-6 md:px-8 pb-4 xs:pb-6 bg-gradient-to-t from-bg-app via-bg-app to-transparent pt-20 pointer-events-none z-10";
      }

      const userMsgHTML = `
            <div class="flex items-end justify-end gap-1.5 xs:gap-2 w-full mt-2 animate-fade-in">
                <div class="bg-primary text-white p-3 xs:p-4 rounded-2xl rounded-br-none shadow-md max-w-[95%] md:max-w-[85%] w-fit">
                    <p class="text-[13px] xs:text-sm break-words">${message}</p>
                    <p class="text-[10px] xs:text-[11px] text-white/70 text-right mt-1">${timeStr}</p>
                </div>
                <div class="text-primary text-[10px] xs:text-xs mb-1.5 xs:mb-2 flex-shrink-0">
                    <i class="fa-solid fa-check"></i>
                </div>
            </div>
            `;
      chatContainer.insertAdjacentHTML("beforeend", userMsgHTML);
      inputField.value = "";
      inputField.disabled = true;
      chatContainer.scrollTop = chatContainer.scrollHeight;

      const typingId = "typing-" + Date.now();
      const typingHTML = `
            <div id="${typingId}" class="flex items-start gap-3 xs:gap-4 max-w-[90%] md:max-w-[85%] mt-2 xs:mt-4 animate-fade-in">
                <div class="w-8 h-8 xs:w-10 xs:h-10 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md text-xs xs:text-base">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div class="bg-white px-4 py-3 xs:px-4 xs:py-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-1.5 h-[40px] xs:h-[48px] w-fit">
                    <div class="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.15s"></div>
                    <div class="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.3s"></div>
                </div>
            </div>
            `;
      chatContainer.insertAdjacentHTML("beforeend", typingHTML);
      chatContainer.scrollTop = chatContainer.scrollHeight;

      const aiResponseText = await fetchAIResponse(message);

      document.getElementById(typingId).remove();

      const replyTimeStr =
        new Date().getHours().toString().padStart(2, "0") +
        ":" +
        new Date().getMinutes().toString().padStart(2, "0");

      const botMsgHTML = `
            <div class="flex items-start gap-3 xs:gap-4 max-w-[95%] md:max-w-[90%] mt-2 xs:mt-4 animate-fade-in">
                <div class="w-8 h-8 xs:w-10 xs:h-10 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md text-xs xs:text-base">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div class="flex flex-col w-full">
                    <div class="bg-white p-3 xs:p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 inline-block w-fit max-w-full">
                        <div class="text-[13px] xs:text-sm leading-relaxed break-words">${aiResponseText}</div>
                        <p class="text-[10px] xs:text-[11px] text-gray-400 text-right mt-1">${replyTimeStr}</p>
                    </div>
                </div>
            </div>
            `;
      chatContainer.insertAdjacentHTML("beforeend", botMsgHTML);
      chatContainer.scrollTop = chatContainer.scrollHeight;

      const checks = document.querySelectorAll(".fa-check");
      if (checks.length > 0) {
        const lastCheck = checks[checks.length - 1];
        lastCheck.classList.remove("fa-check");
        lastCheck.classList.add("fa-check-double");
      }

      inputField.disabled = false;
      inputField.focus();
    }
  }

  if (newChatBtn) {
    newChatBtn.addEventListener("click", () => {
      isFirstMessage = true;
      chatContainer.innerHTML = "";
      chatContainer.className = "hidden";
      inputArea.className =
        "flex-1 flex flex-col justify-center px-4 xs:px-6 md:px-8 w-full max-w-4xl mx-auto transition-all duration-500 ease-in-out h-full";
      welcomeText.style.display = "flex";

      if (
        window.innerWidth < 1024 &&
        !sidebar.classList.contains("-translate-x-full")
      ) {
        toggleMenu();
      }
    });
  }

  sendBtn.addEventListener("click", sendMessage);
  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !inputField.disabled) {
      sendMessage();
    }
  });
});
ฆ
