export type Locale = "th" | "en";
export const DEFAULT_LOCALE: Locale = "th";
export const LOCALES: Locale[] = ["th", "en"];

type Entry = { th: string; en: string };

export const dict: Record<string, Entry> = {
  // ---------------------------------------------------------------- nav
  "nav.home": { th: "หน้าแรก", en: "Home" },
  "nav.curriculum": { th: "Curriculum Outline", en: "Curriculum Outline" },
  "nav.courses": { th: "รายวิชา", en: "Courses" },
  "nav.prerequisite": { th: "ตรวจวิชาต่อ", en: "Prereq Check" },
  "nav.studyPlan": { th: "แผนการเรียน", en: "Study Plan" },
  "nav.pathways": { th: "เส้นทาง", en: "Pathways" },
  "nav.outcomes": { th: "Outcomes", en: "Outcomes" },
  "nav.careers": { th: "อาชีพ", en: "Careers" },
  "nav.advisor": { th: "คำแนะนำ", en: "Advisor" },
  "nav.electives": { th: "วิชาเลือก", en: "Electives" },
  "nav.brand.tagline": { th: "B.Sc. Cybersecurity", en: "B.Sc. Cybersecurity" },

  // -------------------------------------------------------- shared chrome
  "common.thaiName": { th: "ชื่อภาษาไทย", en: "Thai name" },
  "common.englishName": { th: "ชื่อภาษาอังกฤษ", en: "English name" },
  "common.credits": { th: "หน่วยกิต", en: "credits" },
  "common.year": { th: "ปี", en: "Year" },
  "common.semester": { th: "เทอม", en: "Semester" },
  "common.openCurriculum": { th: "เปิด Curriculum Outline", en: "Open Curriculum Outline" },
  "common.viewAll": { th: "ดูทั้งหมด", en: "View all" },
  "common.menu": { th: "เมนู", en: "Menu" },
  "common.close": { th: "ปิด", en: "Close" },
  "common.print": { th: "พิมพ์ / Print", en: "Print" },
  "common.copy": { th: "คัดลอกสรุปแผนเรียน", en: "Copy study plan" },
  "common.back": { th: "กลับ", en: "Back" },
  "common.search": { th: "ค้นหา", en: "Search" },
  "common.filter": { th: "ตัวกรอง", en: "Filter" },
  "common.noResults": { th: "ไม่พบรายการที่ตรงกับเงื่อนไข", en: "No results match your filters" },
  "common.allYears": { th: "ทุกชั้นปี", en: "All years" },
  "common.allCategories": { th: "ทั้งหมด", en: "All" },
  "common.hasPrereq": { th: "มี prerequisite", en: "Has prerequisite" },
  "common.onlyRisky": { th: "เฉพาะเสี่ยง", en: "Risky only" },
  "common.noPrereq": { th: "ไม่มี prerequisite", en: "No prerequisite" },
  "common.mustPass": { th: "ต้องผ่าน", en: "Pass first" },
  "common.subjects": { th: "วิชา", en: "subjects" },
  "common.needsVerify": { th: "ต้องตรวจสอบกับหลักสูตร", en: "Verify with curriculum" },
  "common.disclaimer": {
    th: "ข้อมูลในเว็บไซต์นี้จัดทำเพื่อช่วยวางแผนการเรียนเบื้องต้น นักศึกษาควรตรวจสอบกับประกาศของมหาวิทยาลัย หลักสูตร และอาจารย์ที่ปรึกษาก่อนลงทะเบียนจริงทุกครั้ง",
    en: "This site is for preliminary academic planning. Always verify with official university announcements, the curriculum document, and your academic advisor before registering.",
  },
  "common.lang.th": { th: "ไทย", en: "Thai" },
  "common.lang.en": { th: "อังกฤษ", en: "English" },
  "common.lang.switchToEn": { th: "สลับเป็นภาษาอังกฤษ", en: "Switch to English" },
  "common.lang.switchToTh": { th: "สลับเป็นภาษาไทย", en: "Switch to Thai" },
  "common.theme.toDark": { th: "สลับเป็นธีมมืด", en: "Switch to dark theme" },
  "common.theme.toLight": { th: "สลับเป็นธีมสว่าง", en: "Switch to light theme" },

  // -------------------------------------------------------------- footer
  "footer.intro": {
    th: "เว็บไซต์นี้จัดทำเพื่อช่วยวางแผนการเรียนเบื้องต้นในหลักสูตร วท.บ. ความมั่นคงปลอดภัยไซเบอร์ ข้อมูลอ้างอิงจากเอกสารตัวอย่างแผนการศึกษาของวิทยาลัยการคอมพิวเตอร์",
    en: "An unofficial student navigator for the B.Sc. Cybersecurity program, built from the College of Computing's sample study plan.",
  },
  "footer.disclaimer": {
    th: "ข้อมูลในเว็บไซต์เป็นแนวทางเบื้องต้น นักศึกษาควรตรวจสอบกับประกาศของมหาวิทยาลัย หลักสูตร และอาจารย์ที่ปรึกษาก่อนลงทะเบียนจริง",
    en: "Information here is a preliminary guide — confirm with the university, curriculum, and your advisor before registering.",
  },
  "footer.nav": { th: "นำทาง", en: "Navigate" },
  "footer.paths": { th: "เส้นทาง", en: "Pathways" },
  "footer.copy": {
    th: "CY Curriculum Outline · Unofficial student navigator",
    en: "CY Curriculum Outline · Unofficial student navigator",
  },

  // -------------------------------------------------------------- home
  "home.heroBadge": { th: "หลักสูตรปริญญาตรี · 4 ปี", en: "Undergraduate Program · 4 years" },
  "home.heroSub": {
    th: "ระบบนำทางหลักสูตรแบบ interactive — เข้าใจโครงสร้าง 4 ปี ตรวจสอบรายวิชาต่อ และจำลองผลกระทบเมื่อติด F พร้อมเส้นทาง Project / Co-op / WIL",
    en: "An interactive curriculum navigator — understand the 4-year structure, check prerequisites, simulate the impact of failing a course, and compare Project / Co-op / WIL tracks.",
  },
  "home.cta.outline": { th: "ดูแผนหลักสูตร", en: "View Curriculum Map" },
  "home.cta.courses": { th: "ค้นหารายวิชา", en: "Search Courses" },
  "home.cta.prereq": { th: "ตรวจสอบวิชาต่อ", en: "Prerequisite Check" },
  "home.cta.pathways": { th: "Project / Co-op / WIL", en: "Project / Co-op / WIL" },
  "home.fact.duration": { th: "ระยะเวลา", en: "Duration" },
  "home.fact.durationVal": { th: "4 ปี", en: "4 years" },
  "home.fact.durationSub": { th: "8 ภาคการศึกษา", en: "8 semesters" },
  "home.fact.credits": { th: "หน่วยกิตรวม", en: "Total credits" },
  "home.fact.creditsSub": { th: "หน่วยกิตขั้นต่ำ", en: "minimum" },
  "home.fact.core": { th: "วิชาแกน Core", en: "Core courses" },
  "home.fact.coreSub": { th: "วิชาในระบบ", en: "in the catalog" },
  "home.fact.faculty": { th: "คณะ/วิทยาลัย", en: "Faculty" },
  "home.section.whatLearn": { th: "สิ่งที่จะได้เรียน", en: "What you'll learn" },
  "home.section.whatLearnTitle": {
    th: "พื้นฐานครบ ตั้งแต่ Programming จนถึง Cybersecurity ขั้นสูง",
    en: "From core programming fundamentals to advanced Cybersecurity",
  },
  "home.pillar.prog": { th: "Programming & Software", en: "Programming & Software" },
  "home.pillar.progDesc": {
    th: "Structured, OOP, Data Structures, Software Design",
    en: "Structured, OOP, Data Structures, Software Design",
  },
  "home.pillar.net": { th: "Network & Systems", en: "Network & Systems" },
  "home.pillar.netDesc": {
    th: "OS, Computer Networking, Wireless & IoT",
    en: "OS, Computer Networking, Wireless & IoT",
  },
  "home.pillar.sec": { th: "Cybersecurity Core", en: "Cybersecurity Core" },
  "home.pillar.secDesc": {
    th: "Intro to Cybersecurity, Law & Ethics, Research Methodology",
    en: "Intro to Cybersecurity, Law & Ethics, Research Methodology",
  },
  "home.pillar.ai": { th: "AI · Cloud · IoT", en: "AI · Cloud · IoT" },
  "home.pillar.aiDesc": {
    th: "AI in Cybersecurity, Cloud Computing, Wireless/IoT",
    en: "AI in Cybersecurity, Cloud Computing, Wireless/IoT",
  },
  "home.outline.kicker": { th: "Interactive Curriculum Map", en: "Interactive Curriculum Map" },
  "home.outline.title": { th: "CY Curriculum Outline", en: "CY Curriculum Outline" },
  "home.outline.desc": {
    th: "ดูภาพรวมหลักสูตรเป็น flow diagram — แต่ละวิชาแยกสีตามหมวด มีเส้นเชื่อม prerequisite และสามารถ hover เพื่อเห็นเส้นทางการเรียนแบบ end-to-end",
    en: "Browse the program as a flow diagram — courses colored by category, prerequisite edges connect related courses, and hovering reveals the full learning path.",
  },
  "home.feature.prereqDesc": {
    th: "เลือกวิชาที่ผ่านแล้ว / ติด F ระบบจะคำนวณว่าเทอมหน้าลงอะไรได้บ้าง",
    en: "Mark passed / failed courses and see what you can register for next term.",
  },
  "home.feature.risk": { th: "Risk Map", en: "Risk Map" },
  "home.feature.riskDesc": {
    th: "ดูว่าวิชาใดเป็นจุดเสี่ยงต่อแผนเรียน เช่น Networking, OOP, Programming",
    en: "See which courses are risky for your study plan — e.g. Networking, OOP, Programming.",
  },
  "home.feature.pathway": { th: "Pathway Compare", en: "Pathway Compare" },
  "home.feature.pathwayDesc": {
    th: "เปรียบเทียบเส้นทาง Project, Co-op, WIL พร้อมข้อควรระวัง",
    en: "Compare Project, Co-op, and WIL tracks with caveats.",
  },
  "home.feature.open": { th: "เปิดดู", en: "Open" },
  "home.careers.kicker": { th: "เส้นทางหลังเรียนจบ", en: "After graduation" },
  "home.careers.title": { th: "อาชีพที่รออยู่", en: "Careers waiting for you" },

  // ---------------------------------------------------------- curriculum
  "curriculum.kicker": { th: "Interactive Curriculum Map", en: "Interactive Curriculum Map" },
  "curriculum.title": { th: "CY Curriculum Outline", en: "CY Curriculum Outline" },
  "curriculum.desc": {
    th: "ภาพรวมหลักสูตรแบบ interactive — hover เพื่อดูเส้นทาง prerequisite, คลิกเพื่อดูรายละเอียดวิชา และสลับ View ตามมุมมองที่ต้องการ",
    en: "An interactive curriculum overview — hover to trace prerequisites, click to open course details, and switch views below.",
  },
  "curriculum.mobileHint": {
    th: "บนหน้าจอเล็ก เราแสดงเป็น Accordion Timeline เพื่อให้อ่านง่าย กรุณาใช้หน้าจอที่กว้างขึ้นเพื่อดู Flow Diagram แบบเต็ม",
    en: "On small screens we show an accordion timeline — use a wider screen to view the full flow diagram.",
  },
  "curriculum.track": { th: "Track", en: "Track" },
  "curriculum.view": { th: "View", en: "View" },
  "curriculum.view.academic": { th: "Academic Plan", en: "Academic Plan" },
  "curriculum.view.prereq": { th: "Prerequisite Network", en: "Prerequisite Network" },
  "curriculum.view.risk": { th: "Risk Map", en: "Risk Map" },
  "curriculum.view.student": { th: "Student Friendly", en: "Student Friendly" },
  "curriculum.view.academic.desc": {
    th: "ดูแผนตามหมวดวิชา (สีตามประเภท)",
    en: "Standard plan view, colored by category",
  },
  "curriculum.view.prereq.desc": {
    th: "เน้นเส้นทาง prerequisite ทั้งหมด",
    en: "Emphasize the prerequisite network",
  },
  "curriculum.view.risk.desc": {
    th: "ระบายสีตามระดับความเสี่ยง",
    en: "Colored by risk level",
  },
  "curriculum.view.student.desc": {
    th: "การ์ดใหญ่ขึ้น อ่านง่ายสำหรับนักศึกษา",
    en: "Larger cards, simpler labels for students",
  },
  "curriculum.legend.prereq": { th: "Prerequisite", en: "Prerequisite" },

  // ---------------------------------------------------------- catalog
  "catalog.kicker": { th: "Course Catalog", en: "Course Catalog" },
  "catalog.title": { th: "รายวิชาในหลักสูตร", en: "Courses in the Program" },
  "catalog.subtitle": {
    th: "ค้นหาด้วยรหัสวิชา ชื่อไทย/อังกฤษ หรือ keyword",
    en: "Search by course code, Thai/English name, or keyword",
  },
  "catalog.placeholder": {
    th: "ค้นหา เช่น CP 421, Cybersecurity, OOP...",
    en: "Search e.g. CP 421, Cybersecurity, OOP...",
  },
  "catalog.found": { th: "พบ", en: "Found" },
  "catalog.coursesCount": { th: "วิชา", en: "courses" },
  "catalog.total": { th: "วิชาในระบบ", en: "courses in the catalog" },
  "catalog.showing": { th: "แสดง", en: "Showing" },

  // ---------------------------------------------------------- prereq
  "prereq.kicker": { th: "Prerequisite Checker", en: "Prerequisite Checker" },
  "prereq.title": {
    th: "ตรวจสอบวิชาต่อ / จำลองสถานการณ์ติด F",
    en: "Prerequisite Checker / Failure Simulator",
  },
  "prereq.desc": {
    th: "เลือกสถานะของแต่ละวิชา (ผ่าน / ติด F / ยังไม่ลง) ระบบจะคำนวณว่าคุณจะลงวิชาอะไรได้ในเทอมถัดไปและวิชาใดจะถูก block",
    en: "Mark each course as passed, failed, or unattempted. The system will calculate which courses you can register for next term and which will be blocked.",
  },
  "prereq.choose": { th: "เลือกสถานะรายวิชา", en: "Mark each course" },
  "prereq.chooseHint": {
    th: "กดที่ปุ่ม ผ่าน / ติด F สำหรับแต่ละวิชา",
    en: "Tap a button for each course",
  },
  "prereq.passed": { th: "ผ่าน", en: "Passed" },
  "prereq.failed": { th: "F", en: "F" },
  "prereq.canTake": { th: "ลงได้", en: "Eligible" },
  "prereq.warning": { th: "ควรระวัง / ยังลงไม่ได้", en: "Caution / not yet eligible" },
  "prereq.blocked": { th: "ถูก block จากการติด F", en: "Blocked by failed prerequisite" },
  "prereq.impact": { th: "ผลกระทบจากการติด F", en: "Impact of failing" },
  "prereq.impactDesc": {
    th: "หากยังไม่ผ่านวิชาต่อไปนี้ จะส่งผลต่อวิชาอื่นในเส้นทางการเรียน (รวมถึงวิชาที่ต่อกันเป็นทอด ๆ)",
    en: "If you haven't passed the courses below, they affect downstream courses — including transitive dependencies.",
  },
  "prereq.riskLevel": { th: "ระดับความเสี่ยง", en: "Risk level" },
  "prereq.noBlockedDirect": {
    th: "ไม่พบวิชาในระบบที่จะถูกกระทบโดยตรง — แต่ควรปรึกษาอาจารย์ที่ปรึกษา",
    en: "No directly affected courses in the system — but consult your advisor",
  },
  "prereq.advisoryNote": {
    th: "⚠️ คำเตือนนี้คำนวณจาก prerequisite ในระบบ ซึ่งบางส่วนเป็นการอนุมานจากลำดับแผนการเรียน ควรปรึกษาอาจารย์ที่ปรึกษาเพื่อยืนยันก่อนตัดสินใจ",
    en: "⚠️ This is computed from prerequisites in the system, some of which are inferred from the study plan order. Confirm with your advisor before deciding.",
  },

  // ---------------------------------------------------------- plan
  "plan.kicker": { th: "Study Plan", en: "Study Plan" },
  "plan.title": { th: "แผนการเรียน 4 ปี", en: "4-Year Study Plan" },
  "plan.desc": {
    th: "ตารางแผนการเรียนแยกตามภาคการศึกษา พร้อมจำนวนหน่วยกิตและหน่วยกิตสะสม",
    en: "Term-by-term study plan with credits per term and cumulative totals.",
  },
  "plan.col.term": { th: "ปี / เทอม", en: "Year / Term" },
  "plan.col.code": { th: "รหัสวิชา", en: "Code" },
  "plan.col.name": { th: "ชื่อวิชา", en: "Course" },
  "plan.col.credits": { th: "หน่วยกิต", en: "Credits" },
  "plan.col.category": { th: "หมวด", en: "Category" },

  // ---------------------------------------------------------- pathways
  "paths.kicker": { th: "Pathways", en: "Pathways" },
  "paths.title": { th: "เส้นทาง Project · Co-op · WIL", en: "Pathways: Project · Co-op · WIL" },
  "paths.desc": {
    th: "เปรียบเทียบ 3 เส้นทางหลักของชั้นปี 4 — แต่ละเส้นทางมีลักษณะ ข้อกำหนด และข้อควรระวังแตกต่างกัน",
    en: "Compare the three Year-4 tracks — each has its own profile, requirements, and caveats.",
  },
  "paths.suitable": { th: "เหมาะกับใคร", en: "Who it's for" },
  "paths.requirements": { th: "เงื่อนไข / การเตรียมตัว", en: "Requirements / preparation" },
  "paths.courses": { th: "รายวิชาเฉพาะของเส้นทาง", en: "Track-specific courses" },
  "paths.warnings": { th: "ข้อควรระวัง", en: "Caveats" },

  // ---------------------------------------------------------- outcomes
  "outcomes.kicker": { th: "Learning Outcomes", en: "Learning Outcomes" },
  "outcomes.title": { th: "PLO / YLO — ผลลัพธ์การเรียนรู้", en: "PLO / YLO — Learning Outcomes" },
  "outcomes.plo": { th: "Program Learning Outcomes (PLO)", en: "Program Learning Outcomes (PLO)" },
  "outcomes.ploDesc": {
    th: "เป้าหมายที่นักศึกษาจะสามารถทำได้เมื่อจบหลักสูตร",
    en: "What students will be able to do upon graduation",
  },
  "outcomes.ylo": { th: "Year Learning Outcomes (YLO)", en: "Year Learning Outcomes (YLO)" },
  "outcomes.yloDesc": {
    th: "เป้าหมายของการเรียนแต่ละชั้นปี",
    en: "Learning targets per year",
  },

  // ---------------------------------------------------------- careers
  "careers.kicker": { th: "Careers", en: "Careers" },
  "careers.title": { th: "เส้นทางอาชีพหลังเรียนจบ", en: "Career Paths" },
  "careers.desc": {
    th: "หลักสูตรนี้เปิดเส้นทางสู่งานสาย Cybersecurity ที่หลากหลาย — เลือกวิชาเลือกและ Certification ให้เหมาะกับเส้นทางที่สนใจ",
    en: "This program opens many Cybersecurity career paths — pick electives and certifications aligned with your interest.",
  },
  "careers.skills": { th: "ทักษะ", en: "Skills" },
  "careers.relatedCourses": { th: "วิชาที่ช่วยเตรียมตัว", en: "Helpful courses" },

  // ---------------------------------------------------------- advisor
  "advisor.kicker": { th: "Advisor Notes", en: "Advisor Notes" },
  "advisor.title": { th: "คำแนะนำก่อนลงทะเบียน", en: "Pre-registration Advice" },
  "advisor.desc": {
    th: "คู่มือสั้น ๆ ช่วยให้คุณวางแผนเทอมถัดไปอย่างมั่นใจ — แต่ทุกครั้งก่อนลงทะเบียนจริง ควรปรึกษาอาจารย์ที่ปรึกษาเพื่อยืนยันแผน",
    en: "A short guide for planning your next term — always confirm with your academic advisor before actual registration.",
  },

  // ---------------------------------------------------------- electives
  "electives.kicker": { th: "Elective Course Builder", en: "Elective Course Builder" },
  "electives.title": { th: "หมวดวิชาเลือก — เลือกได้ ≥ 21 หน่วยกิต", en: "Elective Courses — choose ≥ 21 credits" },
  "electives.desc": {
    th: "หมวดวิชาเลือกในหลักสูตรมี 5 กลุ่มย่อย + ชุดวิชาปรับพื้นฐาน นักศึกษาสามารถเลือกข้ามกลุ่มได้ ไม่จำเป็นต้องเลือกทั้งกลุ่มเดียวกัน เลือกการ์ดเพื่อจำลองว่าจะลงวิชาใดบ้าง",
    en: "Electives are organized into 5 subgroups + a foundation module. You can mix across subgroups freely. Click a card to simulate which courses you would register for.",
  },
  "electives.selectedCount": { th: "วิชาที่เลือก", en: "Selected" },
  "electives.creditsTotal": { th: "หน่วยกิตรวมที่เลือก", en: "Selected credits" },
  "electives.target": { th: "เป้าหมาย ≥ 21 หน่วยกิต", en: "Target ≥ 21 credits" },
  "electives.clear": { th: "ล้างที่เลือก", en: "Clear selection" },
  "electives.filter.openOnly": { th: "เฉพาะที่เปิดสอนเทอมนี้", en: "Offered this term only" },
  "electives.filter.allSubgroups": { th: "ทุกกลุ่มย่อย", en: "All subgroups" },
  "electives.subgroup.network": {
    th: "กลุ่มย่อยที่ 1 · เครือข่ายคอมพิวเตอร์",
    en: "Subgroup 1 · Computer Networking",
  },
  "electives.subgroup.platform": {
    th: "กลุ่มย่อยที่ 2 · ความปลอดภัยบนแพลตฟอร์ม",
    en: "Subgroup 2 · Platform Security",
  },
  "electives.subgroup.defense": {
    th: "กลุ่มย่อยที่ 3 · การตรวจจับและป้องกัน",
    en: "Subgroup 3 · Detection & Defense",
  },
  "electives.subgroup.policy": {
    th: "กลุ่มย่อยที่ 4 · นโยบายและการจัดการ",
    en: "Subgroup 4 · Policy & Management",
  },
  "electives.subgroup.theory": {
    th: "กลุ่มย่อยที่ 5 · ทฤษฎีและการประยุกต์",
    en: "Subgroup 5 · Theory & Applications",
  },
  "electives.subgroup.foundation": {
    th: "ชุดวิชาปรับพื้นฐาน",
    en: "Foundation Modules",
  },
  "electives.status.title": { th: "สถานะการเปิดสอน", en: "Offering status" },
  "electives.status.open": { th: "เปิดสอน", en: "Open this term" },
  "electives.status.closed": { th: "ยังไม่เปิด", en: "Not offered" },
  "electives.status.tba": { th: "รอประกาศ", en: "TBA" },
  "electives.status.always": { th: "เปิดทุกภาคการศึกษา", en: "Every term" },
  "electives.openInY3S1": { th: "เปิดสอน ปี 3 / เทอม 1", en: "Offered Y3 Sem 1" },
  "electives.openInY3S2": { th: "เปิดสอน ปี 3 / เทอม 2", en: "Offered Y3 Sem 2" },
  "electives.tabAll": { th: "ทั้งหมด", en: "All" },
  "electives.tabY3S1": { th: "ปี 3 เทอม 1", en: "Y3 Term 1" },
  "electives.tabY3S2": { th: "ปี 3 เทอม 2", en: "Y3 Term 2" },
  "electives.instructor": { th: "ผู้สอน", en: "Instructor" },
  "electives.prereqInfo": { th: "เงื่อนไขของรายวิชา", en: "Prerequisite" },
  "electives.allowEquivalent": { th: "หรือเทียบเท่า", en: "or equivalent" },
  "electives.source": {
    th: "อ้างอิงจากเอกสารหลักสูตร มคอ.2 / หน้าเอกสาร",
    en: "Per the official curriculum document (มคอ.2) / page",
  },
  "electives.empty": { th: "ยังไม่มีวิชาที่ตรงกับตัวกรอง", en: "No courses match the filter" },

  // ---------------------------------------------------------- source links
  "source.officialPdf": { th: "เอกสารหลักสูตรอย่างเป็นทางการ (PDF)", en: "Official Curriculum Document (PDF)" },
  "source.openCourses": { th: "รายวิชาที่เปิดสอน — วิทยาลัยการคอมพิวเตอร์", en: "Courses offered — College of Computing" },

  // ---------------------------------------------------------- drawer
  "drawer.prereqs": { th: "Prerequisite (วิชาที่ต้องผ่านก่อน)", en: "Prerequisites" },
  "drawer.dependents": { th: "วิชาที่ต่อจากวิชานี้", en: "Courses that depend on this" },
  "drawer.failImpact": { th: "ถ้าติด F วิชานี้", en: "If you fail this course" },
  "drawer.risk": { th: "ระดับความเสี่ยงต่อแผนเรียน", en: "Risk level to your study plan" },
  "drawer.description": { th: "คำอธิบายรายวิชา", en: "Course description" },
  "drawer.noPrereq": {
    th: "ไม่มี / ดูตามรายละเอียดที่หลักสูตรกำหนด",
    en: "None / see official curriculum",
  },
  "drawer.noDependents": {
    th: "ไม่มีวิชาในระบบที่ใช้วิชานี้เป็น prerequisite",
    en: "No courses in the system require this as a prerequisite",
  },
  "drawer.disclaimer": {
    th: "ข้อมูลนี้จัดทำเพื่อช่วยวางแผนเบื้องต้น โปรดตรวจสอบกับอาจารย์ที่ปรึกษาและประกาศของหลักสูตรก่อนลงทะเบียนจริง",
    en: "Preliminary planning info — confirm with your advisor and official announcements before registering.",
  },
};

export function t(key: string, locale: Locale): string {
  const e = dict[key];
  if (!e) return key;
  return e[locale];
}
