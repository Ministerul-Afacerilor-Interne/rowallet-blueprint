const doc = (id, label) => ({ type: "doc", id, label });

module.exports = {
    blueprint: [
        doc("index", "Home"),
        doc("how-to-read-the-blueprint", "How to Read This Blueprint"),
        {
            type: "category",
            label: "Ecosystem Vision & Fundamentals",
            items: [
                doc(
                    "content/ecosystem-vision-and-fundamentals/what-is-the-ecosystem",
                    "What is the Ecosystem?",
                ),
                doc(
                    "content/ecosystem-vision-and-fundamentals/what-is-the-wallet",
                    "What is the Wallet?",
                ),
                doc(
                    "content/ecosystem-vision-and-fundamentals/standards",
                    "Standards",
                ),
                {
                    type: "category",
                    label: "Foundations",
                    items: [
                        doc(
                            "content/ecosystem-vision-and-fundamentals/EUDI-value-proposition",
                            "RO Wallet Value Proposition",
                        ),
                        doc(
                            "content/ecosystem-vision-and-fundamentals/governance-and-operation-model",
                            "Governance & Operation Model",
                        ),
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Ecosystem Concepts",
            link: { type: "doc", id: "content/ecosystem-concepts/index" },
            items: [
                doc(
                    "content/ecosystem-concepts/introduction-and-goals",
                    "Introduction and Goals",
                ),
                doc(
                    "content/ecosystem-concepts/constraints-and-decisions",
                    "Constraints and Decisions",
                ),
                doc(
                    "content/ecosystem-concepts/building-block-view",
                    "Building Block View",
                ),
                doc(
                    "content/ecosystem-concepts/deployment-view",
                    "Deployment View",
                ),
                {
                    type: "category",
                    label: "Crosscutting Concepts",
                    items: [
                        doc(
                            "content/ecosystem-concepts/crosscutting-concepts/privacy-requirements",
                            "Privacy Requirements",
                        ),
                        doc(
                            "content/ecosystem-concepts/crosscutting-concepts/security-requirements",
                            "Security Requirements",
                        ),
                    ],
                },
                {
                    type: "category",
                    label: "Trust",
                    link: {
                        type: "doc",
                        id: "content/ecosystem-concepts/trust/index",
                    },
                    items: [
                        doc(
                            "content/ecosystem-concepts/trust/decision-guide",
                            "Decision Guide",
                        ),
                        doc(
                            "content/ecosystem-concepts/trust/trust-validation",
                            "Validation",
                        ),
                        doc(
                            "content/ecosystem-concepts/trust/trust_pid_issuance_presentation",
                            "PID",
                        ),
                        doc(
                            "content/ecosystem-concepts/trust/trust_eaa_issuance_presentation",
                            "EAA",
                        ),
                        doc(
                            "content/ecosystem-concepts/trust/trust_q_pub_eaa_issuance_presentation",
                            "QEAA/PubEAA",
                        ),
                        doc(
                            "content/ecosystem-concepts/trust/wallet-relying-party-authentication",
                            "Wallet Relying Party Authentication",
                        ),
                        doc(
                            "content/ecosystem-concepts/trust/overasking-protection",
                            "Overasking Protection",
                        ),
                        doc(
                            "content/ecosystem-concepts/trust/status-management",
                            "Status Management",
                        ),
                        doc(
                            "content/ecosystem-concepts/trust/pki-and-trust-anchor",
                            "PKI and Trust Anchor",
                        ),
                        doc(
                            "content/ecosystem-concepts/trust/national-trust-list",
                            "National Trust List (Planned update)",
                        ),
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Features",
            items: [
                {
                    type: "category",
                    label: "PID",
                    items: [
                        doc(
                            "content/features/PID/ro-pid-rulebook",
                            "Romanian PID Rulebook",
                        ),
                        doc(
                            "content/features/PID/design-decisions",
                            "Design Decisions",
                        ),
                        doc(
                            "content/features/PID/runtime-views",
                            "Runtime Views",
                        ),
                    ],
                },
                {
                    type: "category",
                    label: "EAA",
                    link: { type: "doc", id: "content/features/EAA/index" },
                    items: [
                        doc(
                            "content/features/EAA/credential-anatomy",
                            "Credential Anatomy",
                        ),
                        doc(
                            "content/features/EAA/design-recommendations",
                            "Design Recommendations",
                        ),
                        doc(
                            "content/features/EAA/catalog-of-attestations",
                            "Catalogue of Attestations",
                        ),
                        doc(
                            "content/features/EAA/EAA-Issuance-OpenID4VC",
                            "EAA Issuance Flow",
                        ),
                        doc(
                            "content/features/EAA/EAA-Presentation-OpenID4VC",
                            "EAA Presentation Flow",
                        ),
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Upcoming Features",
            link: { type: "doc", id: "content/upcoming-features/index" },
            items: [
                doc(
                    "content/upcoming-features/qes/index",
                    "Qualified Electronic Signature (QES)",
                ),
            ],
        },
        // RO modification: the Archive category is hidden because the archive is not published.
        // TODO: restore the category below once the archive is released.
        /*
        {
            type: "category",
            label: "Archive",
            link: { type: "doc", id: "content/archive/index" },
            items: [
                doc(
                    "content/archive/EUDI-link-governance",
                    "EUDI Link Governance",
                ),
                doc(
                    "content/archive/disclosure-policies/index",
                    "EAA Disclosure Policies",
                ),
                {
                    type: "category",
                    label: "PID Issuance and Presentation Overview",
                    link: {
                        type: "doc",
                        id: "content/archive/pid-issuance-and-presentation/index",
                    },
                    items: [
                        doc(
                            "content/archive/flows/PID-IssuerSigned",
                            "Signed Credential with Secure Element (Option C)",
                        ),
                        doc(
                            "content/archive/flows/PID-IssuerSigned-eIDcard",
                            "Signed Credential with eID Card (Option C'')",
                        ),
                        doc(
                            "content/archive/flows/PID-AuthenticatedChannel-secureElement",
                            "Authenticated Channel with Secure Element (Option D)",
                        ),
                        doc(
                            "content/archive/flows/PID-AuthenticatedChannel-cloud",
                            "Authenticated Channel with Cloud Support (Option B')",
                        ),
                        doc(
                            "content/archive/flows/PID-AuthenticatedChannel-eIDcard",
                            "Authenticated Channel with eID Card (Option B)",
                        ),
                        doc(
                            "content/archive/flows/PID-AuthenticatedChannel-eIDcard-RESTAPI",
                            "Authenticated Channel with eID Card REST API",
                        ),
                    ],
                },
                {
                    type: "category",
                    label: "(Q)EAA Issuance and Presentation Overview",
                    link: {
                        type: "doc",
                        id: "content/archive/qeaa-issuance-and-presentation/index",
                    },
                    items: [
                        doc(
                            "content/archive/flows/Presentation-During-Issuance",
                            "Credential Presentation during Issuance Flow",
                        ),
                    ],
                },
                doc(
                    "content/archive/combined-presentation/index",
                    "Combined Presentation",
                ),
                doc(
                    "content/archive/flows/Wallet-Attestation",
                    "Wallet Attestation",
                ),
                doc(
                    "content/archive/flows/OID4VC-with-WRP-attestations",
                    "OID4VC Protocol Integration",
                ),
                doc("content/archive/pseudonym/index", "Pseudonyms"),
            ],
        },
        */
        doc("content/glossary", "Glossary"),
    ],
};
