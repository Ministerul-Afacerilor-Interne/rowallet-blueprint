---
format: md
slug: /
---
<!-- RO modification: Landing page -->
# Blueprint for the RO Wallet Ecosystem in Romania

Everything you need to understand the architecture, trust model, governance, and core features of the RO Wallet Ecosystem.

## Discover

<div class="homepage-card-grid">
<a class="homepage-card" href="content/ecosystem-vision-and-fundamentals/what-is-the-ecosystem/">
<strong>Ecosystem Fundamentals</strong>
<span>Understand the purpose, actors, value proposition, standards, and operating model of the RO Wallet Ecosystem.</span>
</a>
<a class="homepage-card" href="content/ecosystem-concepts/">
<strong>Ecosystem Concepts</strong>
<span>Explore goals, constraints, building blocks, deployment concepts, security, privacy, and trust foundations.</span>
</a>
<a class="homepage-card" href="content/features/PID/ro-pid-rulebook/">
<strong>PID</strong>
<span>Read the Romanian PID Rulebook and the current design decisions and runtime views for PID issuance and presentation.</span>
</a>
<a class="homepage-card" href="content/features/EAA/">
<strong>EAA</strong>
<span>Review credential anatomy, design recommendations, the catalogue of attestations, and EAA issuance and presentation flows.</span>
</a>
</div>

## Integrate

<div class="homepage-card-grid">
<!-- Removed in RO Wallet -- link pointed to the German developer guide; an RO developer guide is planned and will be published at a later stage -->
<a class="homepage-card" href="https://ministerul-afacerilor-interne.github.io/rowallet-documentation/latest/">
<strong>Wallet Architecture</strong>
<span>Dive into the implementation-specific architecture documentation of the RO Wallet (progressively updated during implementation).</span>
</a>
<a class="homepage-card" href="how-to-read-the-blueprint/">
<strong>How to Read This Blueprint</strong>
<span>Use the reader guidance to find the sections most relevant to your role and level of technical depth.</span>
</a>
<a class="homepage-card" href="content/ecosystem-concepts/trust/decision-guide/">
<strong>Trust Decision Guide</strong>
<span>Understand trust establishment and validation decisions across PID, EAA, QEAA, relying parties, and wallet components.</span>
</a>
</div>

## About This Blueprint

This document is part of Romania’s process for implementing the EU Digital Identity Wallet (EUDIW). It proposes **architectural, governance, and operational models** for the RO Wallet Ecosystem that is interoperable across the EU while respecting Romania’s legal, technical, and institutional landscape.

It is based on the **eIDAS Regulation**, the **Architecture and Reference Framework (ARF)**, relevant **ETSI specifications**, national requirements, and identified use cases.

The blueprint serves as a **discussion and design basis**, not as a final or binding specification. Future ARF updates and Implementing Acts may influence the final design.

## Audience

This document is intended for:

- policy makers and regulators
- public and private service providers
- wallet and relying party implementers
- auditors and conformity assessment bodies
- standards and ecosystem contributors
- other interested parties or individuals that want to better understand the ecosystem

Different sections are relevant depending on the reader’s role.

:::info Looking for Wallet implementation details?

<!-- RO modification: Landing page -->
This blueprint describes the **ecosystem and trust architecture**, not a concrete wallet implementation.
Please refer to the [**Architecture Documentation of the RO Wallet**](https://ministerul-afacerilor-interne.github.io/rowallet-documentation/latest/) for implementation-specific architecture, flows, and interfaces.

:::

## Additional Links

<div class="homepage-card-grid homepage-card-grid--compact">
<a class="homepage-card" href="content/glossary/">
<strong>Glossary</strong>
<span>Look up key ecosystem, identity, credential, and trust terminology used throughout the blueprint.</span>
</a>
<a class="homepage-card" href="mailto:contact.rowallet@mai.gov.ro">
<strong>Feedback</strong>
<span>Send feedback, questions, or proposed improvements for this blueprint by email.</span>
</a>
<a class="homepage-card" href="https://github.com/Ministerul-Afacerilor-Interne/rowallet-blueprint">
<strong>Repository</strong>
<span>Browse the public source repository of this blueprint on GitHub.</span>
</a>
</div>

## Providing Feedback

We welcome feedback on all aspects of this blueprint, including:

- clarity and completeness of the descriptions
- architectural soundness
- security, privacy, and user experience considerations
- operational feasibility and complexity

<!-- RO modification: Landing page -->
Please send feedback to [contact.rowallet@mai.gov.ro](mailto:contact.rowallet@mai.gov.ro).

---

## Change History

<!-- RO modification: Change History -->
All changes to this document are tracked in [CHANGELOG-RO.md](https://github.com/Ministerul-Afacerilor-Interne/rowallet-blueprint/blob/main/CHANGELOG-RO.md).
