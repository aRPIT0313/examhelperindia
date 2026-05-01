# 🚀 EXAM FORM HELPER — SESSION PROGRESS TRACKER
# Paste this entire file at the start of every new session

## PROJECT INFO
- Name: Exam Form Helper India
- Stack: React + Vite + React Router + JSZip + React Helmet Async
- Hosting: Vercel (free)
- All processing: 100% client-side (Canvas API, no server)

## ✅ SESSION 1 — COMPLETED (May 2026)

### Files Created:
```
exam-form-helper/
├── index.html                          ✅
├── package.json                        ✅
├── vite.config.js                      ✅
├── src/
│   ├── main.jsx                        ✅
│   ├── App.jsx                         ✅  (routing: / /tool /exam/:slug)
│   ├── index.css                       ✅  (global styles + CSS variables)
│   ├── config/
│   │   └── examConfig.js               ✅  (12 exams: SSC, IBPS, Railway, UPSC, Entrance)
│   ├── utils/
│   │   └── imageUtils.js               ✅  (Canvas API compression, ZIP, download)
│   ├── hooks/
│   │   ├── useImageProcessor.js        ✅  (photo upload/compress state)
│   │   └── useSignaturePad.js          ✅  (draw/upload signature state)
│   ├── components/
│   │   ├── Navbar.jsx + .css           ✅  (mobile hamburger menu)
│   │   ├── Footer.jsx + .css           ✅  (links + disclaimer)
│   │   ├── ImageUploader.jsx + .css    ✅  (drag/drop + tap)
│   │   ├── RequirementsForm.jsx + .css ✅  (user-controlled KB/px/format)
│   │   ├── PreviewDownload.jsx + .css  ✅  (before/after preview)
│   │   ├── SignaturePad.jsx + .css     ✅  (draw canvas + upload)
│   │   ├── ChecklistDownload.jsx + .css✅  (checklist + ZIP download)
│   │   └── ErrorGuide.jsx + .css       ✅  (8 common errors + fixes)
│   └── pages/
│       ├── HomePage.jsx + .css         ✅  (landing page with all exams)
│       └── ToolPage.jsx + .css         ✅  (main tool, works for all exams)
```

### Build Status: ✅ PASSES (npm run build — 0 errors)

### Working Features:
- ✅ Homepage with all 12 exams listed by category
- ✅ Dynamic routing: /exam/ssc-cgl-photo-size, /exam/ibps-po-photo-size, etc.
- ✅ Generic tool at /tool (no exam preset)
- ✅ Photo upload (drag/drop + tap)
- ✅ User-controlled requirements (KB, px, format, bg color, fit mode)
- ✅ Canvas API compression to exact KB target
- ✅ Live before/after preview
- ✅ Photo download
- ✅ Signature draw (canvas) + upload
- ✅ Signature processing + download
- ✅ ZIP combined download (photo + signature)
- ✅ Completion checklist
- ✅ Error guide (8 accordion items)
- ✅ WhatsApp share + copy link
- ✅ SEO meta tags (React Helmet)
- ✅ AdSense placeholder slots (4 per page)
- ✅ Related exam links
- ✅ Mobile responsive

---

## 🔄 SESSION 2 — TODO (Start Here Next Session)

### Priority Tasks:
1. **Blog/Guides page** — `/blog` route + 5 evergreen articles
   - "How to fill SSC CGL form step by step"
   - "Common photo upload errors and fixes"
   - "JPG vs PNG for exam forms"
   - "How to read exam notification for photo specs"
   - "How to create signature for bank exam forms"

2. **vercel.json** — Add SPA routing config so /exam/:slug works on Vercel

3. **robots.txt + sitemap.xml** — For Google indexing

4. **Google Analytics** — Add GA4 tracking code to index.html

5. **AdSense** — Replace placeholder divs with real AdSense code

6. **PWA / offline support** — Add manifest.json for mobile install

7. **More exams in examConfig.js** — Add 10 more:
   - SSC CPO, SSC GD, NDA, CDS, CISF
   - SBI Clerk, RBI Grade B, LIC AAO
   - MPSC, UPPSC

8. **Performance** — Lazy load pages, add loading states

### Paste This to Continue:
```
We are building "Exam Form Helper India" — a React website for resizing 
exam photos/signatures. Session 1 is complete. 

The project is at: [YOUR GITHUB URL]

Session 1 completed:
- Full React + Vite setup
- Dynamic routing (/tool, /exam/:slug)  
- All components built (ImageUploader, RequirementsForm, PreviewDownload, 
  SignaturePad, ChecklistDownload, ErrorGuide, Navbar, Footer)
- All hooks built (useImageProcessor, useSignaturePad)
- Canvas API compression (no external image libraries)
- 12 exams in examConfig.js
- Homepage + ToolPage working
- Build passes with 0 errors

SESSION 2 TASKS:
1. Create /blog page with 5 evergreen articles
2. Add vercel.json for SPA routing
3. Add robots.txt and sitemap.xml
4. Add 10 more exams to examConfig.js
5. Add Google Analytics placeholder
6. Add PWA manifest.json

Please read the PROGRESS.md and continue from Session 2.
```

---

## IMPORTANT RULES (Never Change These)
- All image processing = Canvas API only, no paid libraries
- No login/signup anywhere
- User always enters their own requirements (never trust preset as final)
- Always show disclaimer and official site link
- Mobile-first design
- All processing client-side (zero server cost)

## EXAMS IN CONFIG (12 total)
SSC: CGL, CHSL, MTS
Bank: IBPS PO, IBPS Clerk, SBI PO  
Railway: RRB NTPC, RRB Group D
UPSC: CSE
Entrance: JEE Main, NEET UG, CUET

## ROUTES
/ → HomePage
/tool → ToolPage (no preset)
/exam/:slug → ToolPage (with exam preset)
/blog → BlogPage (TODO Session 2)
/blog/:article → BlogArticle (TODO Session 2)

## TECH STACK
React 18 + Vite 6
react-router-dom v6
react-helmet-async
jszip (client-side ZIP)
Google Fonts: Plus Jakarta Sans + Syne
Hosting: Vercel (free tier)
