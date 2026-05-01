# Exam Form Helper India — Progress Tracker

## Project Overview
Free React website helping Indian exam aspirants resize photos and signatures for competitive exam forms.

**GitHub:** https://github.com/aRPIT0313/examhelperindia
**Live URL:** https://dream-virid.vercel.app

---

## ✅ SESSION 1 — COMPLETE

### What was built:
- Full project structure with Vite + React 18 + React Router v6
- `examConfig.js` with 12 exams across SSC, Bank, Railway, UPSC, Entrance categories
- Canvas API image compression engine (`imageUtils.js`, `useImageProcessor.js`)
- Homepage with hero, exam grid by category, how-it-works, features
- ToolPage with 6-step flow: upload → requirements → preview → signature → ZIP → error guide
- `RequirementsForm.jsx` — user enters their own KB/px/format values
- `ImageUploader.jsx`, `PreviewDownload.jsx`, `SignaturePad.jsx` (draw or upload)
- `ChecklistDownload.jsx` — combined ZIP of photo + signature
- `ErrorGuide.jsx` — common portal errors + fixes
- `Navbar.jsx`, `Footer.jsx`
- Dynamic routing: `/exam/:slug` → exam-specific ToolPage
- Mobile-first responsive CSS (all in separate `.css` files)
- SEO meta tags via `react-helmet-async`
- AdSense placeholder `.ad-slot` divs in ToolPage + HomePage
- WhatsApp share + Copy Link buttons
- Disclaimer + official site link on every exam page

---

## ✅ SESSION 2 — COMPLETE

### What was built:
- `/blog` route → `BlogPage.jsx` (article listing grid)
- `/blog/:slug` route → `BlogArticle.jsx` (full content renderer with tables, lists, headings)
- `blogConfig.js` with **5 evergreen articles**:
  - `how-to-resize-photo-for-exam-form`
  - `common-photo-upload-errors`
  - `what-is-kb-and-pixels`
  - `how-to-create-signature-for-exam-form`
  - `photo-size-guide-for-all-indian-exams`
- **10 more exams** added → **22 total** in `examConfig.js`:
  - SSC CPO, SSC GD, NDA, CDS, CISF AC
  - SBI Clerk, RBI Grade B, LIC AAO
  - MPSC, UPPSC
- Recently used tools on Homepage (localStorage key: `examhelper_recent_tools`, last 4 exams)
- Blog preview section on Homepage (3 articles + View All link)
- Lazy loading for all pages via `React.lazy` + `Suspense`
- `public/robots.txt` (allows all, points to sitemap)
- `public/sitemap.xml` (28 URLs with priorities and changefreq)
- `public/manifest.json` (PWA manifest — installable on mobile)
- GA4 placeholder in `index.html` (commented out, ready to activate)
- Google Fonts (Plus Jakarta Sans + Syne) loaded in `index.html`
- Footer updated with `/blog` link

---

## ✅ SESSION 3 — COMPLETE

### What was built:

#### 1. index.html updates
- AdSense script placeholder added (commented — fill in publisher ID to activate)
- GA4 script placeholder cleaned up with clear activation instructions
- Google Search Console meta tag placeholder added (commented — fill in verification code)
- All three placeholders clearly labeled with what to replace

#### 2. Trending Tools on Homepage
- `ToolPage.jsx`: tracks visit counts per exam in localStorage (`examhelper_visit_counts`)
- `HomePage.jsx`: reads visit counts, shows top 4 most-visited exams as "🔥 Trending Tools"
- Only displayed if ≥ 2 unique exams have been visited (avoids showing on first visit)
- Orange accent color to distinguish from Recently Used (blue)
- `HomePage.css`: trending card styles appended

#### 3. Footer updated
- Added "Free Guides" link to `/blog`
- Added direct links to two key articles
- "Resources" column replaces "Tools" column

#### 4. 3 New Blog Articles in blogConfig.js (8 total now)
- `how-to-fill-ssc-cgl-form-online` — full SSC CGL application walkthrough
- `ibps-po-application-photo-guide` — IBPS PO photo & signature guide
- `railway-rrb-form-photo-tips` — RRB exam photo upload tips
- All evergreen, no exam-specific specs, process-focused

#### 5. sitemap.xml updated
- 3 new blog article URLs added (total ~31 URLs now)

---

## 🔲 SESSION 4 TASKS (next session)

### Priority items:
1. **Activate AdSense** — user to provide publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
   - Replace placeholder in `index.html`
   - Replace `.ad-slot` divs in all pages with real `<ins class="adsbygoogle">` units
   - Use responsive ad format

2. **Activate GA4** — user to provide Measurement ID (`G-XXXXXXXXXX`)
   - Uncomment the GA4 block in `index.html`
   - Replace `G-XXXXXXXXXX` placeholder

3. **Activate Search Console** — user to provide verification code
   - Uncomment and fill in the meta tag in `index.html`

4. **More exams** (optional) — target 30+ total
   - State board exams: BPSC, RPSC, MPPSC
   - Defence: Coast Guard, BSF, CRPF
   - Insurance: New India Assurance, Oriental Insurance

5. **More blog articles** — target 12+ total
   - "UPSC Prelims application photo guide"
   - "JEE/NEET application document checklist"
   - "How to fix blurry exam photo on mobile"

6. **Performance** — optional
   - Add loading="lazy" to all img tags
   - Add Open Graph image meta tag for social sharing

---

## File Structure (after Session 3)

```
src/
├── App.jsx                    (routes: / /tool /exam/:slug /blog /blog/:slug)
├── index.css
├── main.jsx
├── config/
│   ├── examConfig.js          (22 exams)
│   └── blogConfig.js          (8 articles)
├── utils/imageUtils.js
├── hooks/useImageProcessor.js + useSignaturePad.js
├── components/
│   Navbar, Footer (+ Guides link), ImageUploader, RequirementsForm,
│   PreviewDownload, SignaturePad, ChecklistDownload, ErrorGuide
└── pages/
    HomePage (+ Trending Tools), ToolPage (+ visit tracking),
    BlogPage, BlogArticle
public/
    favicon.svg, icons.svg, robots.txt, sitemap.xml (31 URLs), manifest.json
index.html (AdSense + GA4 + Search Console placeholders, all commented)
```

---

## localStorage Keys Used
| Key | Purpose |
|-----|---------|
| `examhelper_recent_tools` | Array of last 6 visited exam slugs |
| `examhelper_visit_counts` | Object { slug: visitCount } for trending |

## Tech Stack
React 18 + Vite + React Router v6 + JSZip + React Helmet Async
Hosted on Vercel (free tier)
