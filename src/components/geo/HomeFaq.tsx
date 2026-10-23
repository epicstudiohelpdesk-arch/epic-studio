import Link from "next/link";
import { HOME_FAQS } from "@/lib/faqs";

/**
 * Visible homepage FAQ. The same strings are emitted as FAQPage JSON-LD in
 * page.tsx, which satisfies Google's requirement that structured Q&A is
 * present on the page.
 */
export default function HomeFaq() {
  return (
    <section className="geo-snapshot" id="home-faq" aria-labelledby="home-faq-title">
      <div className="geo-container">
        <div>
          <p className="geo-section-eyebrow">Questions, answered</p>
          <h2 id="home-faq-title" className="geo-section-title">
            EPIC STUDIO FAQ
          </h2>
          <p className="geo-source-note" style={{ marginTop: 14 }}>
            The full set — pricing, IP, NDAs and support — lives on the{" "}
            <Link className="geo-link" href="/faq">
              FAQ page
            </Link>
            .
          </p>
        </div>
        <div className="geo-faq">
          {HOME_FAQS.map((faq) => (
            <article className="geo-faq-item" key={faq.question}>
              <h3 className="geo-faq-q">{faq.question}</h3>
              <p className="geo-faq-a">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
