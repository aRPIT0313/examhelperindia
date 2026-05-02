import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">📋 ExamFormHelper</span>
          <p>
            Free photo &amp; signature tool for Indian competitive exams.
            All processing happens in your browser — no uploads, no data stored.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>SSC Exams</h4>
            <Link to="/exam/ssc-cgl-photo-size">SSC CGL</Link>
            <Link to="/exam/ssc-chsl-photo-size">SSC CHSL</Link>
            <Link to="/exam/ssc-mts-photo-size">SSC MTS</Link>
          </div>
          <div className="footer-col">
            <h4>Bank Exams</h4>
            <Link to="/exam/ibps-po-photo-size">IBPS PO</Link>
            <Link to="/exam/ibps-clerk-photo-size">IBPS Clerk</Link>
            <Link to="/exam/sbi-po-photo-size">SBI PO</Link>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <Link to="/tool">Custom Resize Tool</Link>
            <Link to="/print-photo">Print Photo Layout</Link>
            <Link to="/declaration">Declaration Guide</Link>
            <Link to="/blog">Free Guides</Link>
            <Link to="/blog/how-to-resize-photo-for-exam-form">Photo Resize Guide</Link>
            <Link to="/blog/how-to-create-signature-for-exam-form">Signature Guide</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="disclaimer">
          ⚠️ All exam requirements shown are for reference only. Always verify
          on the official exam website before submitting.
        </p>
        <p className="copyright">
          © {new Date().getFullYear()} ExamFormHelper. Not affiliated with SSC,
          IBPS, UPSC, or any government body.
        </p>
      </div>
    </footer>
  );
}
