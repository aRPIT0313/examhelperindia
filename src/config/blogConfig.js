// ============================================================
// BLOG CONFIG — Evergreen articles for SEO
// No exam-specific specs — only process guides
// ============================================================

export const ARTICLES = [
  {
    slug: "how-to-resize-photo-for-exam-form",
    title: "How to Resize Photo for Any Indian Exam Form (Step-by-Step)",
    description:
      "Learn exactly how to resize your photo to meet any exam's KB and pixel requirements — without paid software.",
    category: "Photo Guide",
    readTime: "5 min",
    publishDate: "April 2026",
    content: `
## Why Exam Forms Reject Photos

Every year, thousands of exam applications get rejected at the photo upload step — not because the candidate is unqualified, but because the photo is the wrong file size, wrong dimensions, or wrong format.

The frustrating part? The portal gives a vague error like "file size exceeded" or "invalid dimensions" with no guidance on what to do next.

This guide explains the entire process so you never face that problem.

---

## What "Resize" Actually Means

When exam portals say "resize," they usually mean **two different things**:

1. **Pixel dimensions** — the width × height in pixels (e.g., 200×230 px)
2. **File size** — the total KB of the file (e.g., maximum 50KB)

Most free apps only handle one of these. Our tool handles both simultaneously.

---

## Step 1: Read Your Official Notification First

Before doing anything, open the official notification PDF for your exam. Look for a section titled "Instructions for Uploading Documents" or "Photo Specifications."

Write down:
- Maximum file size (in KB)
- Required dimensions (width × height in pixels)
- Accepted format (JPG, JPEG, PNG, etc.)
- Background color requirement (usually white)

**Never trust unofficial websites or WhatsApp forwards for these numbers.** The official notification is the only valid source.

---

## Step 2: Take or Choose the Right Photo

Your photo should:
- Have a **plain white or light background** (most exams require this)
- Show your **full face clearly** with no sunglasses or cap
- Be **recent** — taken within the last 6 months
- Have **good lighting** — no shadows on face or background

If you're using a mobile photo, make sure it's in focus and well-lit.

---

## Step 3: Use Our Tool to Compress and Resize

1. Visit our tool page for your exam (or use the generic tool at /tool)
2. Upload your photo by tapping "Choose File" or dragging and dropping
3. Enter the requirements from your notification:
   - Target KB (e.g., 50 KB)
   - Width in pixels (e.g., 200 px)
   - Height in pixels (e.g., 230 px)
   - Format (JPG recommended for all exams)
4. Click "Process Photo"
5. Check the live preview — make sure your face is still clear
6. Download the file

The tool uses your browser's Canvas API to compress the image to the exact pixel dimensions and reduce file size to within the required KB range.

---

## Step 4: Verify Before Uploading

Before uploading to the exam portal:
- Right-click the downloaded file → Properties (Windows) or Get Info (Mac)
- Check: file size in KB, dimensions in pixels
- Confirm format matches (.jpg)

If everything matches the notification, you're ready to upload.

---

## Common Mistakes to Avoid

**Mistake 1: Compressing too much**
Over-compressing makes the photo blurry. Our tool targets the midpoint of the KB range to keep quality good.

**Mistake 2: Wrong aspect ratio**
If the portal says 200×230 px, don't upload a square photo hoping it'll work. Use the exact dimensions.

**Mistake 3: Using PNG when JPG is required**
Most Indian exam portals accept only JPG/JPEG. Even if PNG is technically fine, some portals reject it with an unhelpful error.

**Mistake 4: Not checking the official notification**
Exam requirements change every cycle. Always re-verify even if you've applied for the same exam before.

---

## Summary

| Step | What to Do |
|------|-----------|
| 1 | Read official notification for exact specs |
| 2 | Take/choose a clear, white-background photo |
| 3 | Use our tool to resize and compress |
| 4 | Verify dimensions and KB before uploading |

The entire process takes less than 5 minutes once you have the specs in hand.
    `,
  },
  {
    slug: "common-photo-upload-errors-fixes",
    title: "Common Photo Upload Errors in Exam Portals — And How to Fix Them",
    description:
      "Getting 'File size too large' or 'Invalid dimensions' on exam portals? Here are the exact fixes for the 8 most common upload errors.",
    category: "Troubleshooting",
    readTime: "6 min",
    publishDate: "April 2026",
    content: `
## Why Exam Portals Are So Picky

Government exam portals are built on older infrastructure that validates files very strictly. Unlike modern apps that auto-resize your photo, these portals reject anything that doesn't meet exact criteria — often with unhelpful error messages.

Here are the 8 most common errors and their exact fixes.

---

## Error 1: "File size exceeds maximum limit"

**What it means:** Your photo is larger than the maximum KB allowed.

**Fix:**
1. Check the exact KB limit in your official notification
2. Use our tool — enter the target KB and your photo will be compressed automatically
3. Re-verify: right-click → Properties → check file size in KB

**Tip:** If the portal says max 50KB, aim for 35–45KB. Don't compress to exactly 50KB as rounding can cause issues.

---

## Error 2: "Invalid image dimensions"

**What it means:** Your photo's width or height in pixels doesn't match what the portal expects.

**Fix:**
1. Check the exact dimensions in your notification (e.g., 200×230 px)
2. Use our tool — enter width and height in the dimensions fields
3. The tool will resize to exact pixels

**Tip:** Dimensions are width × height. 200×230 means 200 px wide, 230 px tall.

---

## Error 3: "Invalid file format / unsupported file type"

**What it means:** The portal doesn't accept the format you uploaded (e.g., PNG when only JPG is allowed, or HEIC from iPhone).

**Fix:**
1. Check what formats are listed in your notification (usually JPG/JPEG)
2. In our tool, select "JPG" as the output format
3. iPhone users: your camera shoots HEIC by default — our tool converts this automatically

---

## Error 4: "File is corrupted or cannot be read"

**What it means:** The portal can't read the file. This happens with some HEIC files, files renamed with wrong extensions, or certain editing apps.

**Fix:**
1. Don't rename file extensions manually (e.g., don't rename photo.png to photo.jpg — it doesn't actually change the format)
2. Re-process the photo through our tool, which outputs a proper JPG regardless of input
3. Download and try again

---

## Error 5: "Photo background must be white"

**What it means:** Some portals (especially those with AI validation) check background color.

**Fix:**
1. In our tool, select "White" from the background color option
2. The tool fills any transparent areas or edges with white
3. For best results, start with a photo that already has a white background

**Note:** Our tool can make the background white, but if your actual face photo has a complex background (outdoors, patterned), a proper studio photo gives better results.

---

## Error 6: Photo uploads but shows distorted / cropped in preview

**What it means:** The portal is showing a thumbnail at a different aspect ratio than your photo.

**Fix:**
This is usually just the portal's thumbnail preview, not the actual uploaded file. The real file is uploaded correctly. Submit and proceed — the actual scanned/printed version will be correct.

If the photo is genuinely cropped, re-upload with the exact dimensions the portal requires.

---

## Error 7: "Session expired" after photo upload

**What it means:** Not a photo problem — the portal's session timed out while you were preparing files.

**Fix:**
1. Prepare all your files (photo + signature) **before** starting the form
2. Log back in and try again
3. Complete the upload section quickly — don't leave the browser idle

---

## Error 8: File uploads but photo rejection email received later

**What it means:** The portal accepted the file initially but it failed a manual review (usually background check, face visibility, or recency).

**Fix:**
1. Ensure the photo has a plain white background — no texture, no shadows
2. Face should be clearly visible, no sunglasses, no cap
3. Photo should be recent (not more than 6 months old)
4. Some portals also reject photos with visible photo studio watermarks

---

## Quick Reference Table

| Error Message | Most Likely Cause | Fix |
|---|---|---|
| File size exceeds limit | Photo too large in KB | Compress using our tool |
| Invalid dimensions | Wrong pixel size | Resize to exact px |
| Unsupported format | Wrong file type | Convert to JPG |
| File corrupted | Wrong extension or HEIC | Re-process in our tool |
| White background required | Background not white | Use bg color option in our tool |
| Session expired | Browser idle too long | Prepare files first, then upload |

---

## The Single Best Prevention

Download and verify your processed photo **before** opening the exam portal. Check KB (Properties/Get Info), check dimensions (open in any image viewer), check format (file extension). Only then open the portal and upload.
    `,
  },
  {
    slug: "jpg-vs-png-for-exam-forms",
    title: "JPG vs PNG for Exam Forms — Which Should You Use?",
    description:
      "Most Indian exam portals require JPG. Here's why, and what to do if your photo is in PNG, HEIC, or WEBP format.",
    category: "Photo Guide",
    readTime: "4 min",
    publishDate: "April 2026",
    content: `
## The Short Answer

**Use JPG.** Almost every Indian exam portal — SSC, IBPS, UPSC, Railway, NEET, JEE — specifies JPG or JPEG as the required format.

Even when a portal lists "JPG/JPEG/PNG," JPG is still the safer choice because it consistently stays within the KB limits and has broader portal compatibility.

---

## What's the Difference Between JPG and PNG?

| Feature | JPG | PNG |
|---------|-----|-----|
| Compression | Lossy (some quality lost) | Lossless (no quality lost) |
| File size | Smaller | Larger (often 3–5× bigger) |
| Background support | Solid colors | Supports transparency |
| Typical photo size | 30–200 KB | 200–1000 KB |
| Exam portal compatibility | ✅ Universal | ⚠️ Sometimes rejected |

For exam photos, JPG is better because:
1. It's smaller (easier to meet the KB limit)
2. All exam portals accept it without question
3. For passport-size photos, the quality difference vs PNG is invisible

---

## What About HEIC? (iPhone Users)

iPhones save photos in HEIC format by default. HEIC is not accepted by any Indian exam portal.

**Fix:** Upload your HEIC photo to our tool — it automatically converts it to a proper JPG when you download the result.

Alternatively, you can change your iPhone camera setting: Settings → Camera → Formats → Most Compatible. This saves future photos as JPG directly.

---

## What About WEBP?

WEBP is a modern format used by some Android phones and web apps. No Indian exam portal accepts WEBP.

Again, just upload it to our tool and download as JPG.

---

## Does Converting from PNG to JPG Reduce Quality?

For passport-size photos (200×230 px), the answer is: **not visibly.**

The quality difference between JPG and PNG only matters for large images with fine detail (like professional photography or infographics with text). For a passport photo at exam-portal sizes, the two formats look identical.

The more important factor is compression level. Very high JPG compression (targeting very low KB) does reduce quality. Our tool targets a balanced compression — small enough to meet the limit, but sharp enough that your face is clearly recognizable.

---

## Special Cases

**When a portal says "PNG only":** Very rare, but it happens with some newer portals. In this case, use PNG. Our tool outputs PNG when you select that format.

**When a portal accepts both JPG and PNG:** Always pick JPG. PNG files are larger and more likely to exceed the KB limit.

**When your photo already has a transparent background (PNG):** Our tool fills the transparent areas with white before converting to JPG — the output will look correct.

---

## Summary

- Always check your notification for the required format
- JPG/JPEG is required by 95%+ of Indian exam portals
- iPhone users: your camera produces HEIC — convert using our tool
- PNG and WEBP: use our tool to convert to JPG
- Never manually rename file extensions — it doesn't change the actual format
    `,
  },
  {
    slug: "how-to-read-exam-notification-photo-specs",
    title: "How to Read Your Exam Notification for Photo Requirements",
    description:
      "Official notifications can be confusing. Learn exactly where to find photo and signature specs in any SSC, IBPS, UPSC, or Railway notification PDF.",
    category: "Study Tips",
    readTime: "5 min",
    publishDate: "April 2026",
    content: `
## Why This Matters

The most common reason candidates get wrong photo specs is trusting unofficial sources — coaching centers, YouTube videos, WhatsApp groups, or "last year's" requirements.

Exam bodies change requirements every cycle. The only reliable source is the official notification PDF for your specific exam, for the current year.

This guide shows you exactly how to find what you need.

---

## Step 1: Download the Official Notification

Always go directly to the official website:
- **SSC exams:** ssc.nic.in
- **IBPS exams:** ibps.in
- **SBI exams:** sbi.co.in → Careers
- **UPSC exams:** upsc.gov.in
- **Railway exams:** indianrailways.gov.in or the specific RRB website
- **NEET:** neet.nta.nic.in
- **JEE Main:** jeemain.nta.ac.in

Download the official notification PDF. The filename usually includes the year and exam name.

---

## Step 2: Search for the Photo Section

Open the PDF and use Ctrl+F (or Cmd+F on Mac) to search for:
- "photograph"
- "photo"
- "image"
- "upload"

You're looking for a section titled something like:
- "Instructions for Uploading Photograph and Signature"
- "Document Upload Requirements"
- "How to Upload Documents"
- "Specifications for Photograph"

This section is usually in the middle or end of the notification. Some notifications have it in an Annexure.

---

## Step 3: Understand the Specifications

Once you find the section, you'll see specifications like this example (values vary per exam):

> "The photograph must be in JPG/JPEG format with a size between 20KB and 50KB. Dimensions should be 200 pixels wide and 230 pixels tall. The photograph must have a white background."

Break this down into four numbers you'll enter in our tool:

| What to Look For | Example Value | Where to Enter |
|-----------------|---------------|----------------|
| Maximum file size | 50 KB | "Max KB" field |
| Minimum file size | 20 KB | Tool targets midpoint |
| Width | 200 px | "Width" field |
| Height | 230 px | "Height" field |
| Format | JPG | "Format" dropdown |
| Background | White | "Background" dropdown |

---

## Step 4: Find the Signature Specs Too

The same section usually lists separate requirements for the signature. Signature specs are typically smaller:
- Width: 140 px (common)
- Height: 60 px (common)
- Size: 10–20 KB (common)

Write these down separately.

---

## Things That Confuse Candidates

**"Between X KB and Y KB"**
This means a minimum and maximum. Upload a file that falls between these two numbers. Our tool targets slightly above the minimum and below the maximum.

**"Not more than X KB"**
This means the maximum. There's no minimum — but very small files (under 5KB) may have quality issues.

**"In JPG format" vs "In JPEG format"**
These are the same format. JPG and JPEG are identical — just different ways to write the same extension.

**"Dimensions: 3.5cm × 4.5cm"**
Some notifications give dimensions in centimeters, not pixels. This is the physical size the photo will be printed at 300 DPI (dots per inch):
- 3.5cm = approximately 413 pixels at 300 DPI
- 4.5cm = approximately 531 pixels at 300 DPI

However, most portals don't actually check exact DPI — they check pixel dimensions. When in doubt, check if the same notification section also gives pixel dimensions.

**"Recent passport-size photograph"**
This means the photo should look like a standard passport photo: face forward, plain background, shoulders visible. It doesn't add pixel requirements beyond what's stated elsewhere.

---

## Red Flags to Watch For

- **Old screenshots of requirements from WhatsApp:** These may be from a different year
- **"Same as last year":** Exam bodies routinely change specs — always verify
- **Third-party "notification summaries":** These sometimes omit technical details
- **Coaching center guidance:** Unless they quote the notification directly, don't trust pixel specs

---

## Quick Checklist Before Uploading

☐ Downloaded the official notification (not a summary)
☐ Found the photo specifications section
☐ Noted: maximum KB, minimum KB (if any), width px, height px, format
☐ Noted signature specs separately
☐ Processed photo using our tool
☐ Verified final file size and dimensions match the notification
    `,
  },
  {
    slug: "how-to-create-signature-for-bank-exam",
    title: "How to Create a Proper Signature for Bank Exam Online Forms",
    description:
      "How to sign on paper and scan, or create a digital signature using a phone or tablet — that meets IBPS, SBI, and RBI portal requirements.",
    category: "Signature Guide",
    readTime: "5 min",
    publishDate: "April 2026",
    content: `
## What Exam Portals Mean by "Signature"

Bank and government exam portals want an image of your **handwritten signature** — not a typed name, not a digital font, not initials.

The signature should be the one you'll use in the exam hall on the attendance sheet and admit card. Use a consistent signature you can reproduce.

---

## Method 1: Sign on Paper and Photograph It (Easiest)

This is the most reliable method and works for everyone.

**What you need:** White paper, black or blue pen, your phone

**Steps:**
1. Take a blank white sheet of A4 paper
2. Using a smooth-writing pen (ball-point, not pencil or marker), sign your name in the middle of the paper
3. Keep the signature to a reasonable size — not too small, not spanning the full page
4. Photograph the signature with your phone camera. Stand directly above it — no angle
5. Make sure lighting is even — no shadows crossing the signature
6. Upload the photo to our tool's signature section
7. Enter the required dimensions and KB from your notification
8. Download the processed signature image

**Tips for a clean result:**
- Use **blue or black ink** — red pen often looks washed out after scanning
- Don't use a marker — the ink bleeds and looks messy at small sizes
- Ensure the paper is flat — wrinkled paper creates shadows
- Take the photo in natural daylight or well-lit indoor light

---

## Method 2: Draw Directly in Our Tool

Our tool includes a built-in signature drawing canvas that works on phones and tablets.

**Steps:**
1. Go to Step 4 on the tool page (Signature section)
2. Select "Draw Signature"
3. Use your finger (on phone/tablet) or mouse to draw your signature
4. If it doesn't look right, tap "Clear" and try again
5. When satisfied, process and download

**Best for:** Touchscreen devices (phones, tablets). Less precise with a mouse.

**Tip:** Sign slowly and deliberately. The canvas captures every movement, so a rushed signature looks rushed.

---

## Method 3: Scan Using a Scanner App

If you have access to a scanner or scanning app (like Adobe Scan, CamScanner, or Microsoft Lens):

1. Sign on white paper with black pen
2. Scan using the app — select "Document" mode (not "Photo")
3. Crop to just the signature area
4. Export as JPG
5. Upload to our tool to resize to the exact exam requirements

Scanning apps do a better job than phone cameras at producing a clean, contrast-enhanced image.

---

## What Makes a Signature Acceptable

✅ **Pass:** Clear, complete signature, black/blue ink, white background, no cut-off edges
✅ **Pass:** Drawn directly in the tool, smooth lines, visible
✅ **Pass:** Scanned from paper, clean white background

❌ **Fail:** Initials only (many portals explicitly say "full signature, not initials")
❌ **Fail:** Pencil — too light after scanning/photographing
❌ **Fail:** Signature on lined or colored paper
❌ **Fail:** Cut off at edges
❌ **Fail:** Typed name or stylized font
❌ **Fail:** Blurry or underexposed

---

## Signature Dimensions Explained

Most bank exam portals require signatures in a wide, short format — like 140 px wide × 60 px tall. This is a landscape rectangle, not a square.

This means your signature should be wider than it is tall — a normal, flowing signature fits naturally. A very tall signature (capital letters stacked vertically) would get squished into this space.

If your signature is naturally very small or very large, that's fine — our tool rescales it to the required dimensions.

---

## After Download: Verify

Before uploading to the portal:
- Open the signature image on your phone/computer
- Confirm: white background, full signature visible, no cut-off
- Check file size (should be within the KB range in your notification)
- Check dimensions if you can (right-click → Properties on Windows, Get Info on Mac)

---

## One Important Note

Use **the same signature** everywhere — admit card, attendance sheet, certificate, registration form. Portals sometimes compare, and invigilators in the exam hall will ask you to reproduce it. Practice your exam signature before applying so it's consistent.
    `,
  },
];

export const getArticleBySlug = (slug) =>
  ARTICLES.find((a) => a.slug === slug) || null;
