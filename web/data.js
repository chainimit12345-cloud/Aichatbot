const APP_DATA = {
  // 1. ข้อมูลติดต่อเจ้าหน้าที่
  contact: {
    phones: [
      { label: "ติดต่อทั่วไป", number: "042-711-471", link: "tel:042711471" },
      {
        label: "สอบถามเรื่องเด็กแรกเกิด",
        number: "042-712-454",
        link: "tel:042712454",
      },
      {
        label: "สอบถามเรื่องคนพิการ",
        number: "042-YYY-YYY",
        link: "tel:042YYYYYY",
      },
    ],
    email: "sakonnakhon@m-society.go.th",
    emailLink: "mailto:sakonnakhon@m-society.go.th",
    address:
      "ศาลากลางจังหวัดหลังใหม่ ถ.ศูนย์ราชการ ต.ธาตุเชิงชุม อ.เมืองสกลนคร จ.สกลนคร 47000",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.969871142586!2d104.1481515!3d17.1610488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313cff7ab09c4883%3A0xb35a9071c356a5c1!2z4Lio4Liy4Lil4Liy4LiB4Lil4Liy4LiH4LiI4Lix4LiH4Lir4Lin4Lix4LiU4Liq4LiB4Lil4LiZ4LiE4Lij!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth",
  },

  // 2. หมวดหมู่หน่วยงานและลิงก์ต่างๆ
  departments: [
    {
      title: "กรมกิจการเด็กเเละเยาวชน",
      icon: "fa-child text-blue-500",
      items: [
        {
          text: "ข้อมูล และจุดบริการภาครัฐ",
          url: "https://www.info.go.th/search?lat=13.7588311&lng=100.5405449&search=%E0%B9%80%E0%B8%94%E0%B9%87%E0%B8%81",
          icon: "fa-magnifying-glass",
        },
        {
          text: "เด็กเเรกเกิด",
          url: "https://csgproject.dcy.go.th/login.do",
          icon: "fa-laptop",
        },
        {
          text: "ระบบสารสนเทศเพื่อการคุ้มครองเด็ก",
          url: "https://cpis.dcy.go.th/officer-login",
          icon: "fa-laptop",
        },
        {
          text: "ประเมินสถานพัฒนาเด็กปฐมวัยออนไลน์",
          url: "https://ecdis.dcy.go.th/",
          icon: "fa-laptop",
        },
        {
          text: "ระบบตรวจสอบสถานะสิทธิเงินอุดหนุนฯ",
          url: "https://csgcheck.dcy.go.th/public/eq/popSubsidy.do?ms=1640160450538",
          icon: "fa-laptop",
        },
        {
          text: "ระบบการจองจัดเลี้ยงอาหาร",
          url: "https://mealforchild.dcy.go.th/",
          icon: "fa-laptop",
        },
        {
          text: "ระบบศูนย์อํานวยการรับเด็กเป็นบุตรบุญธรรม",
          url: "https://adoption.dcy.go.th/",
          icon: "fa-laptop",
        },
        {
          text: "ระบบสวัสดิการเด็กและครอบครัว",
          url: "https://welfare.dcy.go.th/",
          icon: "fa-laptop",
        },
        {
          text: "ระบบติดตามการใช้บริการ พม",
          url: "https://status.m-society.go.th/main",
          icon: "fa-laptop",
        },
      ],
    },
    {
      title: "กรมกิจการผู้สูงอายุ",
      icon: "fa-person-cane text-orange-500",
      items: [
        {
          text: "ข้อมูล และจุดบริการภาครัฐ",
          url: "https://www.info.go.th/search?tag_cate_id=94fc5592-b810-472f-a4b7-2cae35ee2f91",
          icon: "fa-magnifying-glass",
        },
        {
          text: "ระบบให้บริการกู้ยืมเงินทุนประกอบการอาชีพ",
          url: "https://odf.dop.go.th/login",
          icon: "fa-desktop",
        },
        {
          text: "หลักสูตรออนไลน์การดูเเลผู้สูงอายุ",
          url: "https://thaielderlycare.dop.go.th/",
          icon: "fa-desktop",
        },
        {
          text: "สงเคราะห์ผู้สูงอายุในภาวะยากลําบาก",
          url: "https://www.dop.go.th/thai/service_information/1/15",
          icon: "fa-mobile-screen",
        },
        {
          text: "สนับสนุนการจัดการศพผู้สูงอายุ",
          url: "https://www.dop.go.th/thai/service_information/1/15",
          icon: "fa-mobile-screen",
        },
        {
          text: "ปรับสภาพเเวดล้อมเเละสิ่งอํานวยความสะดวก",
          url: "https://www.dop.go.th/thai/service_information/1/15",
          icon: "fa-mobile-screen",
        },
      ],
    },
    {
      title: "กรมกิจการสตรีและครอบครัว",
      icon: "fa-people-roof text-pink-500",
      items: [
        {
          text: "เเจ้งเหตุความรุนเเรงในครอบครัว",
          url: "https://eservice1300.m-society.go.th/",
          icon: "fa-globe",
        },
        {
          text: "สมัครฝึกอบรมอาชีพ",
          url: "https://dlc.dwf.go.th/prd/dwf-academy/home",
          icon: "fa-globe",
        },
        {
          text: "ปรึกษาปัญหาครอบครัว",
          url: "https://xn--42ca5dfr6ac6azcd1c9c9f0e.com/startup/list",
          icon: "fa-globe",
        },
        {
          text: "ร้องทุกข์ ร้องเรียนทั่วไป",
          url: "https://complain.dwf.go.th/public/complaint.do",
          icon: "fa-regular fa-comment-dots",
        },
      ],
    },
    {
      title: "กรมส่งเสริมฯ คนพิการ",
      icon: "fa-wheelchair text-teal-500",
      items: [
        {
          text: "บัตรประจําตัวคนพิการ",
          url: "https://dep.go.th/th/rights-welfares-services/disabled-person-id-card",
          icon: "fa-regular fa-id-card",
        },
        {
          text: "กองทุนส่งเสริมฯ คนพิการ",
          url: "https://dep.go.th/th/rights-welfares-services/disabled-person-fund",
          icon: "fa-sack-dollar",
        },
        {
          text: "การจัดบริการผู้ช่วยคนพิการ",
          url: "https://dep.go.th/th/rights-welfares-services/disabled-person-assistant-services",
          icon: "fa-handshake-angle",
        },
        {
          text: "กู้ยืมเงินเพื่อประกอบอาชีพ",
          url: "https://dep.go.th/th/rights-welfares-services/borrow-money",
          icon: "fa-briefcase",
        },
        {
          text: "จ้างงานคนพิการ",
          url: "https://dep.go.th/th/rights-welfares-services/%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%99%E0%B8%9E%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3",
          icon: "fa-user-tie",
        },
        {
          text: "เงินสงเคราะห์",
          url: "https://dep.go.th/th/rights-welfares-services/disability-allowance",
          icon: "fa-money-bill-wave",
        },
      ],
    },
    {
      title: "กรมพัฒนาสังคมและสวัสดิการ",
      icon: "fa-hand-holding-heart text-red-400",
      items: [
        {
          text: "การขอรับเงินอุดหนุนสงเคราะห์",
          url: "https://service.dsdw.go.th/Service/01",
          icon: "fa-money-bill-wave",
        },
        {
          text: "อาสาสมัคร (อพม.)",
          url: "https://service.dsdw.go.th/Service/03",
          icon: "fa-users",
        },
        {
          text: "รับรององค์กร/มาตรฐานปฏิบัติงาน",
          url: "https://service.dsdw.go.th/Service/06",
          icon: "fa-building-circle-check",
        },
      ],
    },
    {
      title: "สํานักงานปลัดกระทรวง พม.",
      icon: "fa-building-columns text-indigo-500",
      items: [
        {
          text: "ต่อต้านการค้ามนุษย์",
          url: "https://e-aht.com/",
          icon: "fa-triangle-exclamation",
        },
        {
          text: "สถาบันพัฒนาองค์กรชุมชน",
          url: "https://web.codi.or.th/e-service/",
          icon: "fa-house-chimney-user",
        },
      ],
    },
  ],

  // หมวดเอกสารให้โหลด (เพิ่มอีก 2 ไฟล์)
  forms: [
    {
      text: "เงินจัดการศพผู้สูงอายุ (ศผส. 01)",
      fileUrl:
        "forms/แบบคําขอรับเงินสงเคราะห์และรับรองผู้รับผิดชอบในการจัดการศพผู้สูงอายุตามประเพณี.pdf",
    },
    { text: "ทำบัตรประจำตัวคนพิการ", fileUrl: "forms/แบบคำขอทำบัตร.pdf" },
    {
      text: "เปลี่ยนแปลงผู้ดูแลคนพิการ",
      fileUrl: "forms/แบบรับรองการเปลี่ยนแปลงผู้ดูแลคนพิการ.pdf",
    },
    {
      text: "คำร้องขอกู้ยืมประเภทบุคคล",
      fileUrl: "forms/แบบฟอร์มคำร้องขอกู้ยืมประเภทบุคคล.pdf",
    },
    {
      text: "รับความช่วยเหลือทางสังคม (ปสค.1)",
      fileUrl:
        "forms/แบบคำขอรับความช่วยเหลือผู้ประสบปัญหาทางสังคมกระทรวง-พม.-แบบ-ปสค.1.pdf",
    },
    {
      text: "ซ่อมแซมบ้านผู้สูงอายุ",
      fileUrl:
        "forms/แบบสอบถามความต้องการปรับปรุงซ่อมแซมที่อยู่อาศัยของผู้สูงอายุ.pdf",
    },
  ],

  laws: [
    { text: "กฎหมายเด็กและเยาวชน", prompt: "หมวดกฎหมายเด็กและเยาวชน" },
    {
      text: "กฎหมายสตรีและครอบครัว",
      prompt: "หมวดกฎหมายสตรีและสถาบันครอบครัว",
    },
    { text: "กฎหมายคนพิการ", prompt: "หมวดกฎหมายคนพิการ" },
    { text: "กฎหมายผู้สูงอายุ", prompt: "หมวดกฎหมายผู้สูงอายุ" },
  ],
};
