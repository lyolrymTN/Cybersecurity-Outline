# CY Curriculum Outline

ระบบนำทางหลักสูตร **วิทยาศาสตรบัณฑิต สาขาวิชาความมั่นคงปลอดภัยไซเบอร์ /
Bachelor of Science Program in Cybersecurity** แบบ interactive — ไม่ใช่
เพียง brochure แต่เป็นเครื่องมือช่วยนักศึกษา/อาจารย์ที่ปรึกษา/ผู้ปกครอง
เข้าใจโครงสร้างหลักสูตร, รายวิชาต่อ (prerequisite), ความเสี่ยงเมื่อติด F
และเส้นทาง Project / Co-op / WIL

> ข้อมูลในเว็บไซต์อ้างอิงจาก *ตัวอย่างแผนการศึกษา* ของวิทยาลัยการคอมพิวเตอร์
> มหาวิทยาลัยขอนแก่น (ปรับปรุง 07/03/2023) ที่ผู้ใช้อัปโหลด
> ส่วนที่ยังไม่ปรากฏชัดในเอกสารถูกระบุไว้เป็น `needsVerification: true`
> และมี badge "ต้องตรวจสอบกับหลักสูตร" บน UI

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** สำหรับ design system
- **Lucide React** สำหรับไอคอน
- **Fuse.js** สำหรับ fuzzy search รายวิชา
- **Zod** สำหรับ schema validation
- **Custom SVG** สำหรับ Curriculum Flow Diagram (ไม่ผูกกับ React Flow
  เพื่อให้ build ได้ทุกสภาพแวดล้อม)

## โครงสร้างไฟล์

```
app/
  layout.tsx               # Root layout + nav + footer
  page.tsx                 # Home
  curriculum/page.tsx      # CY Curriculum Outline (interactive)
  courses/page.tsx         # Course Catalog
  courses/[id]/page.tsx    # Course detail
  prerequisite/page.tsx    # Prerequisite Checker / F simulator
  study-plan/page.tsx      # 4-year study plan (3 views)
  pathways/page.tsx        # Project / Co-op / WIL comparison
  outcomes/page.tsx        # PLO / YLO
  careers/page.tsx         # Career outcomes
  advisor/page.tsx         # Advisor notes
  not-found.tsx            # 404

components/
  Navbar.tsx, Footer.tsx
  CourseCard.tsx, CourseBadge.tsx, CourseDetailDrawer.tsx
  CurriculumFlowDiagram.tsx

lib/
  types.ts                 # Zod schemas + TS types + category styles
  data.ts                  # Loaders for JSON data
  prerequisite.ts          # canEnroll / getBlockedCoursesByFailing / risk

data/
  courses.json             # Seed data (จาก PDF)
  curriculum-plan.json     # Term-by-term plan สำหรับ common + 3 tracks
  tracks.json              # Project / Co-op / WIL
  learning-outcomes.json   # PLO + YLO
  careers.json             # อาชีพหลังจบ
```

## วิธีติดตั้งและรัน

```bash
npm install
npm run dev          # เปิด http://localhost:3000
```

build production:

```bash
npm run build
npm run start
```

type check:

```bash
npm run typecheck
```

## วิธีอัปเดตข้อมูลหลักสูตร

ข้อมูลทั้งหมดเป็น JSON ภายใต้ `data/`:

1. **เพิ่ม/แก้ไขรายวิชา** → `data/courses.json`
   - `id` ให้ใช้รหัสวิชาแบบไม่มีช่องว่าง เช่น `CP421021`
   - ฟิลด์สำคัญ: `code`, `thaiName`, `englishName`, `credits`,
     `creditStructure`, `category`, `prerequisites`
   - หากข้อมูลยังไม่ยืนยันให้ใส่ `"needsVerification": true`
2. **แก้แผนการเรียน** → `data/curriculum-plan.json` (ทั้งแกนร่วม 4 เทอมแรก
   และ 3 tracks)
3. **เพิ่ม Track / WIL** → `data/tracks.json`
4. **PLO/YLO** → `data/learning-outcomes.json`
5. **อาชีพ** → `data/careers.json`

หลังแก้ไข ลอง `npm run dev` แล้วเปิด `/courses` เพื่อตรวจสอบ

## Prerequisite logic (สรุปสั้น)

ฟังก์ชันหลักอยู่ใน `lib/prerequisite.ts`:

| ฟังก์ชัน | สิ่งที่ทำ |
| -------- | --------- |
| `canEnroll(id, passed, failed)` | คืนสถานะ `ok / blocked / warning / missing-prereq` พร้อม note |
| `getBlockedCoursesByFailing(id)` | คืนวิชาทั้งหมดที่จะถูก block (รวมแบบ transitive) ถ้านักศึกษาติด F วิชา id |
| `computeRiskLevel(id)` | คำนวณ `low/medium/high/critical` จากจำนวน dependents — ถ้าวิชามี `riskLevel` ระบุไว้ใน JSON จะใช้ค่านั้น |
| `validateData()` | ตรวจ duplicate IDs และ orphan references ใน prerequisite |

หน้า `/prerequisite` ใช้ฟังก์ชันเหล่านี้แบบ real-time ตามตัวเลือกผู้ใช้

## Deploy

โปรเจกต์รองรับ **2 รูปแบบ deployment ฟรี** ในตัว — เลือกอันที่สะดวกได้เลย
หรือใช้ทั้งคู่ก็ได้

### A) Vercel (แนะนำ — ง่ายที่สุด)

Vercel ทำโดยทีม Next.js ดังนั้น build/cache/routing ทุกอย่างทำงานเต็มความสามารถ

1. ไปที่ <https://vercel.com> → Sign up ด้วย GitHub
2. **New Project** → เลือก repo นี้ → กด **Deploy**
3. Vercel auto-detect framework เป็น Next.js แล้ว build เอง
4. ทุกครั้งที่ `git push` จะ deploy ใหม่อัตโนมัติ
5. ได้ URL ฟรี เช่น `https://cybersecurity-outline-xxx.vercel.app` หรือผูก custom domain ก็ได้

โปรเจกต์มี `vercel.json` ติดมาให้แล้ว — ไม่ต้องตั้งค่าอะไรเพิ่ม

### B) GitHub Pages (ฟรีถาวร ไม่ต้องผูกบัญชี Vercel)

มี GitHub Actions workflow ที่ build เป็น static HTML แล้ว publish ไป Pages
อัตโนมัติทุกครั้งที่ push ไป `main`

**ขั้นตอนตั้งค่าครั้งแรก:**

1. ไปที่ repo บน GitHub → **Settings** → **Pages**
2. ในส่วน **Source** เลือก **GitHub Actions**
3. Merge / push code ขึ้น branch `main`
4. Workflow `.github/workflows/gh-pages.yml` จะ build ด้วย
   `DEPLOY_TARGET=github-pages` แล้ว deploy ให้อัตโนมัติ
5. ได้ URL: `https://<username>.github.io/Cybersecurity-Outline/`

ถ้าเปลี่ยนชื่อ repo ให้แก้ตัวแปร `REPO_NAME` ใน workflow file

**Build local แบบเดียวกับ GitHub Pages:**

```bash
DEPLOY_TARGET=github-pages NEXT_PUBLIC_BASE_PATH=/Cybersecurity-Outline npm run build
# ผลลัพธ์อยู่ใน ./out — เปิดด้วย web server ใดก็ได้
npx serve out
```

### โหมด build เลือกอัตโนมัติ

| ตัวแปร | ค่า | โหมด build |
| ------ | --- | ---------- |
| (ไม่ตั้ง) | — | Next.js ปกติ → `.next/` (Vercel, Node hosting, `next dev`) |
| `DEPLOY_TARGET` | `github-pages` | Static export → `out/` พร้อม basePath |

ดู `next.config.mjs` สำหรับ logic เลือกโหมด

## Known limitations / สิ่งที่ยังต้องตรวจสอบ

- เอกสารตัวอย่างแผนการศึกษาไม่ได้ระบุ prerequisite ของทุกวิชาอย่างชัดเจน
  ระบบจึงอนุมานจากลำดับการเรียนในแผน (เช่น OOP ใช้ Structured Programming
  เป็น prereq) — ทุก rule ที่อนุมานจะมี `needsVerification: true`
- รายละเอียดของ **WIL track** ในเอกสารตัวอย่างไม่ครบ (ระบุเป็น Cert.1-3,
  WIL 1/2/3) จึงยังไม่มีรหัสวิชาเฉพาะของ WIL ในระบบ
- รายวิชาเลือก `CP 423 200` เป็นกลุ่มวิชาเลือก/ชุดวิชา (21 หน่วยกิต)
  รายวิชาย่อยยังไม่ได้แสดงทีละวิชา ต้องปรึกษาหลักสูตร
- PLO/YLO ที่แสดงเป็นการสรุปจากภาพรวม — ตัวเลขและถ้อยคำที่เป็นทางการ
  ต้องอ้างอิงจากเล่มหลักสูตรฉบับจริง

## Academic disclaimer

ข้อมูลในเว็บไซต์นี้จัดทำเพื่อช่วยวางแผนการเรียนเบื้องต้น
**ไม่ใช่** เอกสารหลักสูตรอย่างเป็นทางการ นักศึกษาควรตรวจสอบกับ:

- ประกาศของมหาวิทยาลัยขอนแก่น
- เอกสารหลักสูตรฉบับจริง
- อาจารย์ที่ปรึกษาวิชาการ
- ฝ่ายทะเบียนของวิทยาลัยการคอมพิวเตอร์

ก่อนลงทะเบียนจริงทุกครั้ง
