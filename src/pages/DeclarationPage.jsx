import { Helmet } from "react-helmet-async";
import { useState } from "react";
import "./DeclarationPage.css";

const DECLARATION_EXAMPLES = [
  {
    id: "general",
    label: "General Purpose (most common format)",
    text: `I, [Your Full Name], son/daughter of [Father's Full Name], residing at [Your Complete Address], hereby declare that all the information furnished by me in this application is true, complete and correct to the best of my knowledge and belief. I understand that in the event of any information being found false or incorrect, my candidature is liable to be cancelled.

Place: [Your City]
Date: [DD/MM/YYYY]

Signature: _______________
Name: [Your Full Name]`,
  },
  {
    id: "bank",
    label: "Banking Exams (IBPS / SBI style)",
    text: `I, [Your Full Name], hereby declare that all the information given in this application form is true and correct to the best of my knowledge and belief. I also declare that I have read and understood the terms and conditions mentioned in the notification and I fulfil all the eligibility criteria prescribed for the post.

I further declare that I have not been debarred from appearing in any examination conducted by any organization and I have not been convicted by any court of law.

Place: [Your City]
Date: [DD/MM/YYYY]

Signature: _______________`,
  },
  {
    id: "ssc",
    label: "SSC Style Declaration",
    text: `I hereby declare that all the statements made in this application are true, complete and correct to the best of my knowledge and belief. I understand that in the event of any information being found suppressed or incorrect at any stage, my candidature/appointment is liable to be cancelled/terminated.

I also declare that I have carefully read and understood the provisions contained in the notice for this examination.

Name: [Your Full Name]
Date: [DD/MM/YYYY]
Place: [Your City]

Signature: _______________`,
  },
  {
    id: "upsc",
    label: "UPSC / PSC Style Declaration",
    text: `I solemnly declare that all the statements made in this application are true, complete and correct to the best of my knowledge and belief.

I am aware that if any information provided by me is found to be false or incorrect at any stage, my candidature is liable to be rejected or appointment terminated without any notice.

I also declare that I fulfil all the eligibility conditions prescribed for this examination as on the date of application.

Date: [DD/MM/YYYY]
Place: [Your City]

Full Signature of Candidate: _______________
Name (in block letters): [YOUR FULL NAME]`,
  },
];

export default function DeclarationPage() {
  const [selected, setSelected] = useState(DECLARATION_EXAMPLES[0]);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(selected.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <Helmet>
        <title>Handwritten Declaration Format for Exam Forms — Reference Guide</title>
        <meta
          name="description"
          content="Reference formats for handwritten declarations required in Indian exam applications. Always verify the exact text in your official exam notification before writing."
        />
      </Helmet>

      <div className="decl-page">
        <div className="container">

          {/* Warning banner — prominent, always visible */}
          <div className="decl-warning">
            <span className="decl-warning-icon">⚠️</span>
            <div>
              <strong>Always check your official notification first.</strong>
              <p>
                The formats below are general references only. Many exams have their own
                specific declaration text. Always copy the exact wording from your
                official exam notification or application portal — never rely solely
                on any third-party source including this page.
              </p>
            </div>
          </div>

          <div className="decl-hero">
            <h1>Handwritten Declaration — Reference Formats</h1>
            <p>
              Many Indian exam applications require a handwritten declaration uploaded
              as a scanned image or photo. Below are general reference formats.
              <strong> Your exam's notification is the only authoritative source.</strong>
            </p>
          </div>

          {/* What is it section */}
          <div className="card">
            <div className="card-title">📝 What Is a Handwritten Declaration?</div>
            <p className="decl-para">
              Some exams (commonly banking exams like IBPS and RBI) ask candidates to
              write a specific paragraph by hand on plain white paper, photograph or
              scan it, and upload it along with their photo and signature.
            </p>
            <p className="decl-para">
              The purpose is to confirm that the candidate has read and accepted the
              terms of the application. The handwriting must be clearly legible.
            </p>

            <div className="decl-tips-grid">
              <div className="decl-tip">
                <span>🖊️</span>
                <div>
                  <strong>Use black or blue ink</strong>
                  <p>Write on plain white A4 paper with a ballpoint pen</p>
                </div>
              </div>
              <div className="decl-tip">
                <span>📐</span>
                <div>
                  <strong>Write clearly</strong>
                  <p>Capital or cursive both fine — just make it legible</p>
                </div>
              </div>
              <div className="decl-tip">
                <span>📸</span>
                <div>
                  <strong>Photo or scan it</strong>
                  <p>Good lighting, no shadows, all text visible</p>
                </div>
              </div>
              <div className="decl-tip">
                <span>📦</span>
                <div>
                  <strong>Resize before upload</strong>
                  <p>Usually JPG under 100KB — use our tool to compress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Format selector */}
          <div className="card">
            <div className="card-title">📄 Reference Formats</div>
            <p className="decl-sub">
              Select a format below as a starting reference. <strong>Replace all [bracketed] fields</strong> with your actual details.
              Then verify against your official notification.
            </p>

            <div className="decl-tabs">
              {DECLARATION_EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  className={`decl-tab ${selected.id === ex.id ? "active" : ""}`}
                  onClick={() => setSelected(ex)}
                >
                  {ex.label}
                </button>
              ))}
            </div>

            <div className="decl-textbox-wrap">
              <textarea
                className="decl-textbox"
                value={selected.text}
                readOnly
                rows={12}
              />
              <button className="decl-copy-btn" onClick={handleCopy}>
                {copied ? "✅ Copied!" : "📋 Copy Text"}
              </button>
            </div>

            <div className="decl-reminder">
              🔴 <strong>Reminder:</strong> This is a reference only. Copy the exact
              text from your official exam notification or portal. Differences in wording
              matter — some portals reject declarations that don't match their specified text.
            </div>
          </div>

          {/* How to upload */}
          <div className="card">
            <div className="card-title">📤 How to Upload Your Declaration</div>
            <ol className="decl-steps">
              <li>Write the declaration text (from your notification) on plain white A4 paper</li>
              <li>Sign at the bottom as instructed</li>
              <li>Place the paper on a flat surface with good lighting</li>
              <li>Take a clear photo — all 4 corners of the paper visible, no blur</li>
              <li>Crop the image so only the written area is visible</li>
              <li>Use our <a href="/tool">free resize tool</a> to compress to the required KB and format</li>
              <li>Upload to the exam portal</li>
            </ol>
          </div>

          <div className="ad-slot">Advertisement</div>

          {/* FAQ */}
          <div className="card">
            <div className="card-title">❓ Common Questions</div>
            <div className="decl-faq">
              {[
                {
                  q: "Can I type it instead of handwriting?",
                  a: "No — if the exam specifically asks for a 'handwritten' declaration, it must be written by hand. Typed declarations are rejected.",
                },
                {
                  q: "What if I make a mistake while writing?",
                  a: "Start fresh on a new sheet. Do not use correction fluid or strike-throughs — a clean declaration looks professional and avoids any doubt.",
                },
                {
                  q: "What size should the uploaded file be?",
                  a: "Check your specific notification. Common requirements are JPG format under 50KB to 100KB. Use our free resize tool to compress it to the exact required size.",
                },
                {
                  q: "Does the format matter exactly?",
                  a: "Yes — always use the exact text given in your official notification. The formats on this page are general references to help you understand what's expected, not substitutes for official text.",
                },
                {
                  q: "Can I use the same declaration for multiple exams?",
                  a: "Only if the required text is identical. Different exams often have different wording. Always check each notification separately.",
                },
              ].map((item) => (
                <div key={item.q} className="faq-item">
                  <div className="faq-q">Q: {item.q}</div>
                  <div className="faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
