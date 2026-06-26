"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What makes Armory different from other data automation tools?",
    a: "Armory combines AI-driven pipeline orchestration, real-time signal validation, and adaptive connectors in a single control plane — so teams stop stitching together point solutions and start managing data work as a unified system."
  },
  {
    q: "How fast can I connect my existing data sources?",
    a: "Most sources connect in under five minutes. Adaptive Connectors auto-map schema changes and keep pipelines stable as your tools, teams, and models evolve."
  },
  {
    q: "Does Armory support real-time data validation?",
    a: "Yes. Signal QA detects schema drift, missing values, and stale feeds before they reach reporting layers — with anomaly checks averaging 12ms per event."
  },
  {
    q: "Can I monitor pipeline health across my entire stack?",
    a: "Live Ops Matrix gives you 360-degree visibility into every run, dependency, owner, and downstream impact from one operational surface."
  },
  {
    q: "What kind of support and SLAs do you offer?",
    a: "All plans include dedicated support with 99.9% uptime SLA for production pipelines. Enterprise plans add 24/7 critical incident response and a named solutions engineer."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <p className="section-label">FAQ</p>
      <h2 id="faq-title">Questions? We have answers.</h2>
      <p className="faq-copy">
        Everything you need to know about Armory. Still stuck? We are here to help.
      </p>

      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <article key={index} className={isOpen ? "faq-item is-open" : "faq-item"}>
              <button
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                type="button"
              >
                <span>{faq.q}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="faq-chevron">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div id={`faq-answer-${index}`} className="faq-answer" role="region">
                <p>{faq.a}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
