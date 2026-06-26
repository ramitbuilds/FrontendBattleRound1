"use client";

import { useEffect, useRef } from "react";

const pricingMatrix = {
  discount: {
    annual: 0.6,
    monthly: 1
  },
  billing: {
    monthly: { months: 1, suffix: "/mo" },
    annual: { months: 1, suffix: "/mo" }
  },
  currency: {
    INR: { symbol: "₹", rate: 83, tariff: 0.72, suffix: "/mo" },
    USD: { symbol: "$", rate: 1, tariff: 1, suffix: "/mo" },
    EUR: { symbol: "€", rate: 0.92, tariff: 0.94, suffix: "/mo" }
  },
  tiers: [
    {
      id: "starter",
      name: "Starter",
      base: 29,
      description: "For small teams automating their first recurring data workflows.",
      features: ["5 active pipelines", "Hourly syncs", "Basic anomaly checks"]
    },
    {
      id: "growth",
      name: "Growth",
      base: 79,
      description: "For scaling teams that need resilient automations and live monitoring.",
      features: ["30 active pipelines", "Live run history", "Adaptive connectors"]
    },
    {
      id: "scale",
      name: "Scale",
      base: 149,
      description: "For data teams running governed, high-volume operational workflows.",
      features: ["Unlimited pipelines", "Priority recovery", "Advanced routing rules"]
    }
  ]
};

const annualDiscountPercent = Math.round((1 - pricingMatrix.discount.annual) * 100);
const annualDiscountLabel = `${annualDiscountPercent}%`;

function roundToCharmPrice(value) {
  return Math.max(9, Math.round(value / 10) * 10 - 1);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(roundToCharmPrice(value));
}

function computedPrice(tier, billing, currency) {
  const region = pricingMatrix.currency[currency];
  const multiplier = pricingMatrix.discount[billing];
  const cycle = pricingMatrix.billing[billing];

  return tier.base * region.rate * region.tariff * multiplier * cycle.months;
}

function formatPrice(tier, billing, currency) {
  return formatNumber(computedPrice(tier, billing, currency));
}

function digitMarkup(value) {
  return String(value)
    .split("")
    .map((character, index) => `<span style="--digit-index:${index}">${character}</span>`)
    .join("");
}

function annualOriginalPrice(tier, currency) {
  const region = pricingMatrix.currency[currency];
  const original = tier.base * region.rate * region.tariff * pricingMatrix.billing.annual.months;

  return formatNumber(original);
}

function detectCurrency() {
  const locale = navigator.language || "en-US";
  const country = locale.split("-")[1];

  if (country === "IN") {
    return "INR";
  }

  if (["AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"].includes(country)) {
    return "EUR";
  }

  return "USD";
}

export default function PricingMatrix() {
  const sectionRef = useRef(null);
  const billingRef = useRef("monthly");
  const currencyRef = useRef("USD");

  useEffect(() => {
    const root = sectionRef.current;

    const updatePrices = () => {
      const billing = billingRef.current;
      const currency = currencyRef.current;
      const region = pricingMatrix.currency[currency];
      const period = pricingMatrix.billing[billing].suffix || region.suffix;

      root.dataset.billing = billing;

      pricingMatrix.tiers.forEach((tier) => {
        const card = root.querySelector(`[data-tier="${tier.id}"]`);
        const priceValue = card.querySelector("[data-price-value]");
        const priceLine = card.querySelector("[data-price-line]");

        priceLine.dataset.direction = billing === "annual" ? "down" : "up";
        priceLine.dataset.animating = "false";
        priceLine.offsetHeight;
        priceLine.dataset.animating = "true";

        card.querySelector("[data-price-symbol]").textContent = region.symbol;
        priceValue.innerHTML = digitMarkup(formatPrice(tier, billing, currency));
        card.querySelector("[data-price-period]").textContent = period;
        card.querySelector("[data-price-original]").textContent =
          billing === "annual" ? `${region.symbol}${annualOriginalPrice(tier, currency)}` : "";
        card.querySelector("[data-price-savings]").textContent =
          billing === "annual" ? `Save ${annualDiscountLabel}` : "";
      });

      root.querySelector("[data-billing-note]").textContent =
        billing === "annual"
          ? `Annual billing applies a flat ${annualDiscountLabel} discount.`
          : "Monthly billing keeps plans flexible.";

      root.querySelectorAll("[data-billing]").forEach((button) => {
        button.dataset.active = button.dataset.billing === billing ? "true" : "false";
      });

      root.querySelectorAll("[data-currency-option]").forEach((button) => {
        button.dataset.active = button.dataset.currencyOption === currency ? "true" : "false";
      });
    };

    root.querySelectorAll("[data-billing]").forEach((button) => {
      button.addEventListener("click", () => {
        billingRef.current = button.dataset.billing;
        updatePrices();
      });
    });

    root.querySelectorAll("[data-currency-option]").forEach((button) => {
      button.addEventListener("click", () => {
        currencyRef.current = button.dataset.currencyOption;
        updatePrices();
      });
    });

    currencyRef.current = detectCurrency();

    updatePrices();
  }, []);

  return (
    <section
      className="pricing-section"
      aria-labelledby="pricing-title"
      ref={sectionRef}
      suppressHydrationWarning
    >
      <div className="pricing-heading">
        <p className="section-label">Pricing Matrix</p>
        <h2 id="pricing-title">Pricing that adapts by region and billing cycle.</h2>
        <p>
          Values are computed from base tier rates, a flat annual discount, and regional tariff variables.
        </p>
      </div>

      <div className="pricing-controls" aria-label="Pricing controls">
        <div className="billing-toggle" aria-label="Billing cycle">
          <button data-active="true" data-billing="monthly" type="button">
            Monthly
          </button>
          <button data-active="false" data-billing="annual" type="button">
            Annual
            <span>{annualDiscountLabel} off</span>
          </button>
        </div>

        <div className="currency-toggle" aria-label="Currency">
          {Object.keys(pricingMatrix.currency).map((currency) => (
            <button data-active="false" data-currency-option={currency} key={currency} type="button">
              {pricingMatrix.currency[currency].symbol}
              <span>{currency}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="billing-note" data-billing-note>
        Monthly billing keeps plans flexible.
      </p>

      <div className="pricing-grid">
        {pricingMatrix.tiers.map((tier) => (
          <article className="pricing-card" data-tier={tier.id} key={tier.id}>
            <header>
              <span>{tier.name}</span>
              <img src="/icons/cube-16-solid.svg" alt="" />
            </header>
            <p>{tier.description}</p>
            <div className="price-line" data-price-line>
              <span data-price-symbol>$</span>
              <strong
                data-price-value
                dangerouslySetInnerHTML={{ __html: digitMarkup(formatPrice(tier, "monthly", "USD")) }}
                suppressHydrationWarning
              />
              <small data-price-period>/mo</small>
            </div>
            <div className="annual-savings">
              <del data-price-original></del>
              <span data-price-savings></span>
            </div>
            <ul>
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a href="#">Choose {tier.name}</a>
          </article>
        ))}
      </div>
    </section>
  );
}
