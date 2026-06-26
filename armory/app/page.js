import CoreFeatures from "./CoreFeatures";

const navItems = [
  { label: "Product", hasMenu: true },
  { label: "Solutions", hasMenu: true },
  { label: "Resources", hasMenu: true },
  { label: "Pricing" },
  { label: "Company", hasMenu: true }
];

const companies = [
  { name: "CloudPeak", icon: "/icons/search.svg" },
  { name: "Nexora", icon: "/icons/cube-16-solid.svg" },
  { name: "Vertexa", icon: "/icons/arrow-trending-up.svg" },
  { name: "Acme Co", icon: "/icons/chart-pie.svg" },
  { name: "InnovaAI", icon: "/icons/cog-8-tooth.svg" },
  { name: "Datastream", icon: "/icons/link.svg" }
];

const painStory =
  "Manual data work quietly compounds as teams scale: pipelines drift, reports arrive late, handoffs break, and every new workflow adds another place for critical information to stall.";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav className="navbar" aria-label="Primary navigation">
          <a href="#" className="brand" aria-label="Armory home">
            <span className="brand-mark" aria-hidden="true">
              <img src="/icons/cube-16-solid.svg" alt="" />
            </span>
            <span>Armory</span>
          </a>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href="#">
                  <span>{item.label}</span>
                  {item.hasMenu ? (
                    <img src="/icons/chevron-down.svg" alt="" aria-hidden="true" />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions" aria-label="Account actions">
            <a href="#" className="button button-secondary">
              Log in
            </a>
            <a href="#" className="button button-primary">
              Get started free
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <p className="hero-trust-pill">
            <span className="hero-trust-avatars" aria-hidden="true">
              <span><img src="/icons/cube-16-solid.svg" alt="" /></span>
              <span><img src="/icons/chart-pie.svg" alt="" /></span>
              <span><img src="/icons/link.svg" alt="" /></span>
            </span>
            Trusted by 1,200+ data teams
          </p>

          <h1 id="hero-title">
            AI-powered data automation that{" "}
            <span className="accent-word">
              works
              <svg viewBox="0 0 254 34" aria-hidden="true" className="underline-mark">
                <path d="M8 24C56.5 9.2 152.7 5.7 246 13.5" />
                <path d="M19 30C83.7 20.8 165.4 18.5 233 22.2" />
              </svg>
            </span>{" "}
            while you scale.
          </h1>

          <p className="hero-copy">
            Build, automate, and optimize data pipelines in minutes. Eliminate manual work.
            Unlock real-time insights. Drive impact.
          </p>

          <div className="hero-actions">
            <a href="#" className="button button-primary button-large">
              Start building for free
            </a>
            <a href="#" className="button button-secondary button-large">
              Book a demo
            </a>
          </div>

          <section className="trusted-by" aria-labelledby="trusted-title">
            <h2 id="trusted-title">TRUSTED BY DATA TEAMS AT</h2>
            <ul>
              {companies.map((company) => (
                <li key={company.name}>
                  <img src={company.icon} alt="" aria-hidden="true" />
                  <span>{company.name}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="problem-section" aria-label="Problem and pain section">
            <div className="story-orbit" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="story-content">
              <p className="story-label">Problem / Pain Section</p>
              <p className="scroll-story">
                {painStory.split(" ").map((word, index) => {
                  const start = 8 + index * 2.2;
                  const end = start + 8;

                  return (
                    <span
                      key={`${word}-${index}`}
                      style={{
                        "--word-start": `${start}%`,
                        "--word-end": `${end}%`
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </p>
            </div>
          </section>

          <CoreFeatures />
        </section>
      </main>
    </>
  );
}
