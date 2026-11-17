---
format: md
---
<!-- RO modification: How to Read This Blueprint -->
# How to Read This Blueprint

This document combines policy, governance, and technical architecture perspectives. The following guide aims to help readers find the sections most relevant to them.

---

## If you want to understand the overall idea

Start with:

- Ecosystem Vision & Fundamentals
- Ecosystem Concepts
- RO Wallet Value Proposition

---

## If you are responsible for governance or regulation

Focus on [Governance & Operation Model](./content/ecosystem-vision-and-fundamentals/governance-and-operation-model.md)

These chapters describe **rule-setting, onboarding, and supervision**, not technical validation.

---

## If you are implementing a wallet or relying party

Focus on:

- [Ecosystem Concepts](./content/ecosystem-concepts/introduction-and-goals.md)
- [Trust → Validation](./content/ecosystem-concepts/trust/trust-validation.md)
- [Wallet Relying Party Authentication](./content/ecosystem-concepts/trust/wallet-relying-party-authentication.md)

These chapters describe **technical trust establishment and validation logic**.

---

## Trust, Governance, and Oversight — a clarification

Trust validation in this blueprint refers to **local, cryptographic validation** performed by wallets and relying parties using trust lists and trust anchors.

It is **not** a governance or supervisory activity.

Governance defines _who may issue_.  
Trust validation defines _how artefacts are verified_.

---

## Appendix

The appendix provides detailed flows and rulebooks referenced from the main chapters. It is not intended to be read linearly.
