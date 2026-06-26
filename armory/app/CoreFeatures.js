"use client";

import { useEffect, useMemo, useState } from "react";

const features = [
  {
    title: "Pipeline Autopilot",
    eyebrow: "Orchestration",
    icon: "/icons/arrow-trending-up.svg",
    summary:
      "Turn repeated data movement into governed automations that run, retry, and recover without manual handoffs.",
    metric: "84%",
    metricLabel: "less manual routing"
  },
  {
    title: "Signal QA",
    eyebrow: "Validation",
    icon: "/icons/search.svg",
    summary:
      "Detect schema drift, missing values, and stale feeds before they reach reporting layers or customer workflows.",
    metric: "12ms",
    metricLabel: "anomaly checks"
  },
  {
    title: "Live Ops Matrix",
    eyebrow: "Control",
    icon: "/icons/chart-pie.svg",
    summary:
      "Monitor every run, dependency, owner, and downstream impact from one operational surface.",
    metric: "360",
    metricLabel: "pipeline visibility"
  },
  {
    title: "Adaptive Connectors",
    eyebrow: "Integration",
    icon: "/icons/link.svg",
    summary:
      "Map source changes automatically and keep workflows stable as tools, teams, and models evolve.",
    metric: "3x",
    metricLabel: "faster setup"
  }
];

export default function CoreFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const syncMode = () => setIsMobile(query.matches);

    syncMode();
    query.addEventListener("change", syncMode);

    return () => query.removeEventListener("change", syncMode);
  }, []);

  const activeFeature = useMemo(() => features[activeIndex], [activeIndex]);

  return (
    <section className="features-section" aria-labelledby="features-title">
      <p className="section-label">Core Feature Showcase</p>
      <h2 id="features-title">A control layer for automated data work.</h2>
      <p className="features-copy">
        Built for teams that need pipelines to stay observable, recoverable, and fast as usage grows.
      </p>

      <div className="bento-grid" aria-hidden={isMobile} inert={isMobile ? true : undefined}>
        {features.map((feature, index) => (
          <article
            className={`bento-item bento-item-${index + 1} ${activeIndex === index ? "is-active" : ""}`}
            key={feature.title}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            tabIndex={0}
          >
            <header>
              <span className="feature-icon">
                <img src={feature.icon} alt="" />
              </span>
              <p>{feature.eyebrow}</p>
            </header>
            <div>
              <h3>{feature.title}</h3>
              <em>{feature.summary}</em>
            </div>
            <footer>
              <span className="feature-metric">{feature.metric}</span>
              <small>{feature.metricLabel}</small>
            </footer>
          </article>
        ))}
      </div>

      <div className="feature-detail" aria-hidden={isMobile} inert={isMobile ? true : undefined}>
        <span>{activeFeature.eyebrow}</span>
        <strong>{activeFeature.title}</strong>
        <p>{activeFeature.summary}</p>
      </div>

      <div className="feature-accordion" aria-hidden={!isMobile} inert={!isMobile ? true : undefined}>
        {features.map((feature, index) => {
          const isOpen = activeIndex === index;

          return (
            <article className={isOpen ? "is-open" : ""} key={feature.title}>
              <button
                aria-expanded={isOpen}
                aria-controls={`feature-panel-${index}`}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span>
                  <img src={feature.icon} alt="" />
                  {feature.title}
                </span>
                <b>{String(index + 1).padStart(2, "0")}</b>
              </button>
              <div id={`feature-panel-${index}`} className="accordion-panel">
                <div>
                  <p>{feature.summary}</p>
                  <small>
                    {feature.metric} {feature.metricLabel}
                  </small>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
