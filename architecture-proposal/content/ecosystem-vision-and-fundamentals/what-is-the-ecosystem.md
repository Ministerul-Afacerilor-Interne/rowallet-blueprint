---
format: md
---
<!-- RO modification: Ecosystem Overview -->
# Ecosystem Vision & Fundamentals

## RO Wallet Ecosystem Overview

<!-- RO addition: Ecosystem Overview -->
!!! note "Note"
    The roles and responsibilities within the RO Wallet Ecosystem are described in accordance with the provisions of the draft Emergency Ordinance published for public consultation as part of the legislative transparency process in Romania. If the Emergency Ordinance undergoes any changes after its final adoption, these changes will be reflected in the documentation accordingly.

The RO Wallet Ecosystem comprises a set of clearly defined roles and systems that together enable the secure issuance, management, and use of digital credentials data across Europe. These roles interact to deliver value to users, relying parties, and public administrations, while ensuring trust, legal certainty, and fundamental rights protection.

While the ecosystem is inherently complex, not all interacting entities are part of the operational RO Wallet Ecosystem itself. Some actors act as authoritative sources, governance bodies, or supervisory entities that enable or oversee the ecosystem without participating in credential transactions.

Figure 1 provides an overview of the RO Wallet Ecosystem roles and their interactions. Stacked boxes indicate that multiple instances of a role may exist.

![RO Wallet Ecosystem Overview.](./figures/Introduction_Figure%201_Ecosystem%20Overview-ro.excalidraw.svg)

*Figure 1: RO Wallet Ecosystem Roles and Components*

<!-- Adapted from Figure 1 (Introduction_Figure 1_Ecosystem Overview.excalidraw.svg), German Blueprint v2.13.0: "(State) Data Protection Supervisory Authority" label changed to "Data Protection Supervisory Authority". Editable source: the embedded Excalidraw scene in the `-ro` SVG, also saved as `Introduction_Figure 1_Ecosystem Overview-ro.excalidraw`. "German eID Card" label changed to "Romanian CEI". "Orchestrator" label changed to "WRP Registrar". "EUDI Wallet Conformity Assessment Body" labels changed to "RO Wallet Conformity Assessment Body"; "EUDI Wallet Providers" labels kept. Labels now name the responsible Romanian institutions: "Romanian eID (CEI)", "PID Provider (DGEP)", "Wallet Provider (DGCTI)", "QES Provider (STS)", "WRP Registrar (STS)", "Conformity Assessment Body (DNSC - CB & Accredited CABs)", "Data Protection Supervisory Authority (ANSPDCP)"; "EUDI Wallet Providers" and "RO Wallet Conformity Assessment Body" labels replaced; boxes "National Policy and Ecosystem Coordination (MEDAT)" and "National Accreditation Body (RENAR)" (Rule-Setters) and "Supervisory Body (ADR)" (Oversight) added; Rule-Setters boxes arranged in two rows, frame moved up to align with the top of Providers and Consumers and the Ecosystem frame extended upwards; Wallet Provider and QES Provider shown as single (not stacked) boxes; Consumers frame hatch fill redrawn to stay within its border; box "Consumer Protection Organizations/Public" removed (not mentioned in the draft Emergency Ordinance). Oversight frame moved to the top row, aligned with Rule-Setters (Rule-Setters frame moved left, Providers, Consumers and Wallet Provider shifted down, Ecosystem frame resized); stacked box "Cybersecurity Coordination Authorities" added to Oversight. -->

!!! Scope Note

    This chapter focuses exclusively on defining the roles within the RO Wallet Ecosystem and their responsibilities. Trust relationships, certification mechanisms, and interaction flows between roles are defined in dedicated chapters and are intentionally not depicted here.

The following sections first describe the **individual roles** of the ecosystem. These roles are subsequently grouped into **functional categories** to provide a clearer understanding of responsibilities, governance, and oversight.

---

## Core Operational Roles

This section describes the roles that directly participate in credential issuance, storage, presentation, and verification.

### PID Provider

A PID Provider is a trusted entity responsible for:

* verifying the identity of the user in compliance with Level of Assurance (LoA) high requirements,
* issuing a Person Identification Data (PID) credential to the RO Wallet, and
* making available, in a privacy-preserving manner, information that allows Relying Parties to verify the validity of the PID.

The PID Provider ensures that person identification data - such as name and date of birth - is securely generated, validated, and made available to the wallet. The PID Provider is part of the core infrastructure of the RO Wallet Ecosystem. The current ecosystem foresees a single PID Provider, while allowing for future evaluation of additional issuance methods that meet the mandatory functional and security requirements.

<!-- RO addition: Ecosystem Overview -->
In Romania, the PID Provider is the General Directorate for Persons' Record (DGEP), within the Ministry of Internal Affairs (MAI).

---

### (Q-, Pub-) EAA Provider

An (Qualified, Public or domain driven) Electronic Attestation of Attributes (EAA) Provider is an entity responsible for issuing Electronic Attestations of Attributes at the user’s request.

EAAs allow users to prove specific attributes in a secure, standardized, and legally recognized way.

* **Qualified EAA (QEAA) Providers** meet the highest eIDAS trust and security requirements and issue legally binding attestations recognized across borders.
* **Public EAA (Pub-EAA) Providers** are trusted public entities issuing legally recognized, but non-qualified, attestations.
* **EAA Providers** are trustworthy parties in the RO Wallet Ecosystem and providing digital attestations in their specific domain. EAA Providers may originate from various domains such as mobility, telecommunications, education, or healthcare. They are typically supervised by competent authorities within their respective domains. The RO Wallet Ecosystem envisions multiple EAA Providers as well as QEAA- and Pub-EAA Providers.

---

### QES Provider / Qualified Trust Service Provider (QTSP)

Qualified Electronic Signatures (QES) provide legally binding signatures for digital documents. QES are regulated by the eIDAS framework and recognized by all EU member states. They have the equivalent legal effect of a handwritten signature. QES are technically based on digital signatures using certificates.

EUDI Wallet Providers must give users the ability to sign by means of qualified electronic signatures by default and free of charge for **non-professional use**. To fulfil this requirement, Wallet Providers may collaborate with Qualified Trust Service Providers (QTSPs). A QTSP is a trust service provider that has received qualified status from a supervisory body in an EU Member State, allowing it to provide qualified trust services with legal effects equivalent to handwritten signatures across the EU.

Beside free of charge QES there will be as well the option to use QES Services for any usecase. The RO Wallet Ecosystem interacts with multiple QES Providers / QTSPs listed in the specific EU Trust Lists.

<!-- RO addition: Ecosystem Overview -->
In Romania, the QTSP that will enable the RO Wallet users to generate free QES is the Special Telecommunications Service (STS).

---

<!-- RO modification: Ecosystem Overview -->
### Wallet Provider

An EUDI Wallet Provider develops and operates wallet solutions that store, manage, and present credentials on behalf of users. Wallet Providers ensure the secure handling of sensitive cryptographic material (e.g. private keys) and guarantee that users retain sole control over their PID, EAAs, and other personal data.

Wallet Providers deliver **certified** interfaces that enable secure data management, selective disclosure, pseudonymous authentication, payment authorizations, and qualified electronic signatures. The ecosystem vision foresees multiple EUDI Wallet Providers to foster competition and user choice.

<!-- RO addition: Ecosystem Overview -->
In Romania, the Wallet Provider is the General Directorate for Communications and Information Technology (DGCTI), within the Ministry of Internal Affairs (MAI).

---

### Relying Parties

A Relying Party (RP) is an entity—public or private—that interacts with RO Wallet to verify identity data or attributes for authentication, authorization, or service access.

Both public and private Relying Parties must register and declare their intended use of RO Wallet data to ensure compliance with eIDAS and ecosystem rules. The ecosystem envisions multiple public, civic, and private Relying Parties.

---

## Governance & Trust Infrastructure Roles

This section describes roles responsible for defining rules, onboarding participants, and establishing trust relationships.

<!-- Removed in RO Wallet -- section "EUDI Wallet Ecosystem Orchestrator" (heading and text): the role is not part of the Romanian implementation; the Registrar is operated by STS -->

### Wallet Relying Party Registrar (WRP Registrar)

<!-- Removed in RO Wallet -- sentence "The WRP Registrar is a governance function required by the RO Wallet Ecosystem. In Romania it is operated by STS.": replaced by the RO addition below -->

The Relying Party Registrar (WRP Registrar) is responsible for the registration, validation, and administration of Relying Parties and EAA Providers interacting with RO Wallet.

It ensures that participants declare their intended uses, comply with eIDAS requirements, and operate transparently to maintain trust and security. The RO Wallet Ecosystem envisions a single WRP Registrar.

<!-- RO addition: Ecosystem Overview -->
In Romania, the WRP Registrar is the Special Telecommunications Service (STS).

---

<!-- RO modification: Ecosystem Overview -->
### Conformity Assessment Bodies

RO Wallet Conformity Assessment Bodies are independent entities responsible for evaluating whether RO Wallet complies with the applicable security, interoperability, and regulatory requirements under eIDAS.

They perform assessments and audits as part of the RO Wallet certification process. Initially, certification is based on the national certification schema that will later transitions to the harmonized European cybersecurity certification scheme for EUDI Wallets, prepared by ENISA . These CABs ensure that Wallet Providers meet all required standards before being authorized for operation.

<!-- RO addition: Ecosystem Overview -->
In Romania, the National Cybersecurity Directorate (DNSC) hold the role of Certification Body (CB), while the CABs are still to be accredited.

---

<!-- RO addition: Ecosystem Overview -->
### National Accreditation Body

In Romania, the National Accreditation Body is the Romanian Accreditation Association (RENAR).

RENAR is responsible for verifying, accrediting, and overseeing Conformity Assessment Bodies (CABs) that perform technical assessments of European Digital Identity Wallet solutions.

As the National Accreditation Body, RENAR develops and publishes the national accreditation scheme for CABs, along with the procedures governing their accreditation and oversight.

RENAR is also responsible for ensuring that nationally accredited CABs are notified to the European Commission, in accordance with the applicable regulatory requirements.

---

<!-- RO addition: Ecosystem Overview -->
### National Policy and Ecosystem Coordination

In Romania, the National Policy and Ecosystem Coordination role is fulfilled by the Ministry of Economy, Digitalization, Entrepreneurship and Tourism (MEDAT).

MEDAT is responsible for developing and coordinating national public policies and interinstitutional cooperation related to the implementation and operation of the RO Wallet Ecosystem, ensuring alignment of the national regulatory framework with the eIDAS Regulation and its implementing acts.

MEDAT also coordinates public awareness and educational initiatives, promotes the adoption and use of RO Wallet among citizens and public and private service providers, facilitates cooperation and dialogue among ecosystem stakeholders, and monitors wallet adoption and usage at the national level.

---

## Oversight & Public Control Roles

This section describes entities that provide independent, ex-post oversight of the ecosystem.

### Data Protection Supervisory Authority *(outside ecosystem)*

<!-- RO modification: Ecosystem Overview -->
Data Protection Supervisory Authorities supervise compliance with data protection regulations within the EUDI Wallet ecosystem. They investigate complaints, enforce corrective measures, and protect the rights of wallet users. Multiple supervisory authorities interact with the ecosystem.

In Romania, the Data Protection Supervisory Authority is the National Supervisory Authority for Personal Data Processing (ANSPDCP).

ANSPDCP is the competent authority responsible for supervising the processing of personal data within the RO Wallet Ecosystem, in accordance with Regulation (EU) 2016/679 (GDPR) and Article 45h of the eIDAS Regulation. Wallet users may report suspected personal data protection violations by Relying Parties directly to ANSPDCP.

---

<!-- RO addition: Ecosystem Overview -->
### Supervisory Body

In Romania, the Supervisory Body is the Authority for the Digitalization of Romania (ADR).

ADR is responsible for supervising Wallet Providers at the national level, in accordance with Article 46a of the eIDAS Regulation. In cases of non-compliance, ADR may impose proportionate corrective measures, including setting compliance deadlines and temporarily suspending certain wallet functionalities. ADR is also responsible for informing public authorities and citizens, where applicable, and submitting the required reports to the European Commission in accordance with Article 46a(6) of the eIDAS Regulation and Commission Implementing Regulation (EU) 2025/1571.

---

<!-- RO addition: Ecosystem Overview -->
### Cybersecurity Coordination Authorities

In Romania, cybersecurity coordination and oversight within the national RO Wallet Ecosystem are jointly carried out by the competent public authorities and institutions referred to in Law No. 58/2023 on Romania's cybersecurity and cyber defence, in accordance with Article 31 of the draft Emergency Ordinance.

In exercising their cybersecurity responsibilities, these authorities collaborate with each other and cooperate with the private sector, academia, professional associations, and non-governmental organizations.

---

<!-- Removed in RO Wallet -- section "Consumer Protection Organizations and the Public" (heading and text): not mentioned in the draft Emergency Ordinance -->

## External Systems & Sources

### Authentic Sources *(outside ecosystem)*

Authentic Sources are public or private systems or repositories, held under the responsability of a public sector body, that contains and provides attributes about a natural or legal person or object and that is considered to be a primary source of that information or recognized as authentic in accordance with Union or nationa law, including administrative practice. Examples include civil registries, education databases, licensing authorities, or company registers.

Authentic Sources provide the factual basis for attribute issuance but are outside the scope of the RO Wallet Ecosystem.

---

### Romanian eID (CEI) Infrastructure *(outside ecosystem)*

<!-- RO modification: Ecosystem Overview -->
The Romanian eID card (CEI, *Cartea Electronică de Identitate*) serves as the means of electronic identification for PID issuance within the RO Wallet Ecosystem.

The CEI is issued by the General Directorate for Persons' Record (DGEP), within the Ministry of Internal Affairs (MAI), and contains an electronic chip storing the holder's identity data and two digital certificates: one for electronic authentication and one for electronic signing.

The authentication certificate is used during the remote onboarding process for PID issuance, in accordance with requirement RO_PID_31 of the [Romanian PID Rulebook](../features/PID/ro-pid-rulebook.md), to authenticate the holder and support identity verification.

The CEI is not the authoritative source of PID attribute values. These attributes are retrieved from the National Register for Persons' Records (RNEP).
