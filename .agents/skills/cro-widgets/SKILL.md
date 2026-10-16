---
name: cro-widgets
description: "Browse, select, and implement 32 high-converting UI components and 65 patterns (CTA buttons, hero stacks, sticky bars, trust logo strips, testimonials, countdown timers, savings calculators, comparison tables, lead capture forms) in React or HTML/CSS from the RampStack pattern catalog. Use when designing landing page sections, adding social proof, increasing conversion rates, or implementing marketing widgets."
category: growth-tooling
catalog_summary: "32 production-ready React & HTML/CSS conversion components and 65 research-backed UI patterns"
---

# CRO Widgets & Conversion Patterns

A research-backed pattern catalog and production-ready component library of lead-gen, CTA, social proof, urgency, and interactive tooling patterns used by top-converting SaaS, fintech, DTC, and web products.

Every component provides both **React (TypeScript)** and **HTML/CSS (Vanilla)** implementations, customized via shared CSS custom properties.

---

## Catalog Structure

- **Patterns Documentation:** [patterns/](./patterns/)
  - CTA Patterns: [patterns/cta/](./patterns/cta/) (21 patterns)
  - Social Proof: [patterns/social-proof/](./patterns/social-proof/) (14 patterns)
  - Lead Capture: [patterns/lead-capture/](./patterns/lead-capture/) (17 patterns)
  - Urgency & Scarcity: [patterns/urgency/](./patterns/urgency/) (10 patterns)
  - Interactive Tooling: [patterns/interactive-tooling/](./patterns/interactive-tooling/) (12 patterns)

- **Production Components (32):** [components/](./components/)
  - Each component contains:
    - `html/index.html` (vanilla HTML markup)
    - `react/` (React TypeScript component)
    - `styles.css` (CSS variables & responsive styling)
    - `README.md` (props, options, and guidelines)

---

## Featured Components Quick Reference

| Component | Category | Path | Description |
|---|---|---|---|
| **primary-button-cta** | CTA | [components/primary-button-cta/](./components/primary-button-cta/) | Standard solid/outline primary action button with icons |
| **hero-stack-cta** | CTA | [components/hero-stack-cta/](./components/hero-stack-cta/) | Primary button + secondary link for SaaS hero sections |
| **sticky-bar-cta** | CTA | [components/sticky-bar-cta/](./components/sticky-bar-cta/) | Fixed bottom notification / CTA bar for high conversion |
| **footer-cta-section** | CTA | [components/footer-cta-section/](./components/footer-cta-section/) | End-of-page high-converting sign-up / download section |
| **trust-logo-strip** | Social Proof | [components/trust-logo-strip/](./components/trust-logo-strip/) | Grayscale client / partner logo marquee |
| **single-quote-testimonial** | Social Proof | [components/single-quote-testimonial/](./components/single-quote-testimonial/) | Prominent quote with customer headshot and verification |
| **testimonial-grid** | Social Proof | [components/testimonial-grid/](./components/testimonial-grid/) | Multi-card customer reviews & social proof |
| **customer-count** | Social Proof | [components/customer-count/](./components/customer-count/) | Live / animated active user counter display |
| **review-aggregate** | Social Proof | [components/review-aggregate/](./components/review-aggregate/) | Star ratings + review count badges |
| **countdown-timer** | Urgency | [components/countdown-timer/](./components/countdown-timer/) | Real-time ticking deadline countdown |
| **limited-time-offer-banner** | Urgency | [components/limited-time-offer-banner/](./components/limited-time-offer-banner/) | Top/inline alert banner with urgency copy |
| **inline-single-field-form** | Lead Capture | [components/inline-single-field-form/](./components/inline-single-field-form/) | 1-field email capture form |
| **inline-multi-field-form** | Lead Capture | [components/inline-multi-field-form/](./components/inline-multi-field-form/) | Compact 2-3 field contact / lead submission form |
| **social-login-buttons** | Lead Capture | [components/social-login-buttons/](./components/social-login-buttons/) | Google, Apple, GitHub OAuth sign-in group |
| **savings-calculator** | Interactive | [components/savings-calculator/](./components/savings-calculator/) | Config-driven ROI & savings estimator slider |
| **comparison-tool-vs-competitors** | Interactive | [components/comparison-tool-vs-competitors/](./components/comparison-tool-vs-competitors/) | Feature matrix comparison vs competitors |

---

## How to Apply

1. **Identify the conversion need:** (e.g. hero section CTA, social proof, newsletter, pricing comparison).
2. **Consult the pattern rationale:** Read the relevant markdown file in `patterns/` to understand why and where this pattern succeeds.
3. **Copy or adapt the component:** Locate the component in `components/<component-name>/`, grab the `html/` or `react/` implementation along with `styles.css`.
4. **Theme matching:** Adjust the CSS variables defined in `:root` (e.g. `--color-primary`, `--border-radius`, `--font-family`) to match the project's design system.
