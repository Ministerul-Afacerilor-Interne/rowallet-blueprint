---
format: md
---
<!-- RO modification: Standards -->

# Standards

The following standards and technical specifications are referenced in this blueprint. Their applicability to the RO Wallet implementation is subject to the relevant architectural and technical decisions.

## IETF Standards

| Standard                                                       | Version  | Description |
|----------------------------------------------------------------|----------|-------------|
| __[OAuth 2.0 Attestation-Based Client Authentication](https://www.ietf.org/archive/id/draft-ietf-oauth-attestation-based-client-auth-12.html)__ | draft 12 | This specification defines an extension to the OAuth 2 protocol as defined in [RFC6749] which enables a Client Instance to include a key-bound attestation in interactions with an Authorization Server or a Resource Server. This new method enables Client Instances involved in a client deployment that is traditionally viewed as a public client, to be able to utilize this key-bound attestation to authenticate. |
| __[Selective Disclosure for JWTs (SD-JWT)](https://www.rfc-editor.org/rfc/rfc9901.html)__ | RFC 9901 | This specification defines a mechanism for the selective disclosure of individual elements of a JSON data structure used as the payload of a JSON Web Signature (JWS). The primary use case is the selective disclosure of JSON Web Token (JWT) claims. |
| __[SD-JWT-based Verifiable Credentials (SD-JWT VC)](https://www.ietf.org/archive/id/draft-ietf-oauth-sd-jwt-vc-23.html)__ | draft 23 | This specification describes data formats as well as validation and processing rules to express Verifiable Credentials with JSON payloads with and without selective disclosure based on the SD-JWT [I-D.ietf-oauth-selective-disclosure-jwt] format. |
| __[Designated Verifier Signatures for JOSE](https://www.ietf.org/archive/id/draft-bastian-jose-dvs-02.html)__ | draft 02 | This specification defines designated verifier signatures for JOSE and defines algorithms that use a combination of key agreement and MACs. |

---

## OpenID Standards

| Standard | Version | Description |
|----------|-----| ----------- |
| __[OpenID4VC High Assurance Interoperability Profile with SD-JWT VC](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)__ | 1.0 | This document defines a profile of OpenID for Verifiable Credentials in combination with the credential formats IETF SD-JWT VC [I-D.ietf-oauth-sd-jwt-vc] and ISO mdoc [ISO.18013-5]. The aim is to select features and to define a set of requirements for the existing specifications to enable interoperability among Issuers, Wallets and Verifiers of Credentials where a high level of security and privacy is required. The profiled specifications include OpenID for Verifiable Credential Issuance [OIDF.OID4VCI], OpenID for Verifiable Presentations [OIDF.OID4VP], IETF SD-JWT VC [I-D.ietf-oauth-sd-jwt-vc], and ISO mdoc [ISO.18013-5]. |
| __[OpenId for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)__ | 1.0 | This specification defines an API for the issuance of Verifiable Credentials. |
| __[OpenID for Verifiable Presentations](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)__ | 1.0 | This specification defines a protocol for requesting and presenting Credentials. |

---

## ISO Standards

| Standard    | Version | Description                          |
| ----------- |:--------| ------------------------------------ |
|__[ISO/IEC 18013-5](https://www.iso.org/standard/69084.html)__| 2021    | This document establishes interface specifications for the implementation of a driving licence in association with a mobile device. This document specifies the interface between the mDL and mDL reader and the interface between the mDL reader and the issuing authority infrastructure. This document also enables parties other than the issuing authority (e.g. other issuing authorities, or mDL verifiers in other countries) to:<br>— use a machine to obtain the mDL data;<br>— tie the mDL to the mDL holder;<br>— authenticate the origin of the mDL data;<br>— verify the integrity of the mDL data.<br>The following items are out of scope for this document:<br>— how mDL holder consent to share data is obtained;<br>- requirements on storage of mDL data and mDL private keys. |

---

## ETSI Standards

| Standard | Verion | Description |
|----------|--------|-------------|
| __[ETSI TR 119 001](https://www.etsi.org/deliver/etsi_tr/119000_119099/119001/01.02.01_60/tr_119001v010201p.pdf)__ | 1.2.1  | The framework for standardization of signatures: Definitions and abbreviations |
| __[ETSI TS 119 152-1](https://www.etsi.org/deliver/etsi_ts/119100_119199/11915201/01.01.01_60/ts_11915201v010101p.pdf)__ | 1.1.1  | Specifies a CBOR format for AdES signatures (CB-AdES) built on CBOR Object Signing and Encryption (COSE) as specified in IETF RFC 9052 |
| __[ETSI TS 119 182-1](https://www.etsi.org/deliver/etsi_ts/119100_119199/11918201/01.02.01_60/ts_11918201v010201p.pdf)__ | 1.2.1  | Specifies JSON-based advanced electronic signature formats (JAdES) for interoperable and long-term validation |
| __[ETSI TS 119 411-8](https://www.etsi.org/deliver/etsi_ts/119400_119499/11941108/01.01.01_60/ts_11941108v010101p.pdf)__ | 1.1.1  | Defines Access Certificate Policy for EUDI Wallet Relying Parties . |
| __[ETSI TS 119 432](https://www.etsi.org/deliver/etsi_ts/119400_119499/119432/01.03.01_60/ts_119432v010301p.pdf)__ | 1.3.1  | Defines protocols for remote digital signature creation. |
| __[ETSI TS 119 461](https://www.etsi.org/deliver/etsi_ts/119400_119499/119461/02.01.01_60/ts_119461v020101p.pdf)__ | 2.1.1  | Specifies policy and security requirements for trust service components providing identity proofing of trust service subjects |
| __[ETSI TS 119 471](https://www.etsi.org/deliver/etsi_ts/119400_119499/119471/01.01.01_60/ts_119471v010101p.pdf)__ | 1.1.1  | Defines Policy and Security requirements for Providers of Electronic Attestation of Attributes Services |
| __[ETSI TS 119 472-1](https://www.etsi.org/deliver/etsi_ts/119400_119499/11947201/01.02.01_60/ts_11947201v010201p.pdf)__ | 1.2.1  | Specifies the general requirements and data models for Electronic Attestations of Attributes (EAA) |
| __[ETSI TS 119 472-2](https://www.etsi.org/deliver/etsi_ts/119400_119499/11947202/01.03.01_60/ts_11947202v010301p.pdf)__ | 1.3.1  | Specifies profiles for EAA/PID presentations to relying parties |
| __[ETSI TS 119 472-3](https://www.etsi.org/deliver/etsi_ts/119400_119499/11947203/01.01.01_60/ts_11947203v010101p.pdf)__ | 1.1.1  | Specifies profiles for issuance of EAA or PID |
| __[ETSI TS 119 475](https://www.etsi.org/deliver/etsi_ts/119400_119499/119475/01.02.01_60/ts_119475v010201p.pdf)__ | 1.2.1  | Structure of registration certificates with rulebook references |
| __[ETSI TS 119 478](https://www.etsi.org/deliver/etsi_ts/119400_119499/119478/01.01.01_60/ts_119478v010101p.pdf)__ | 1.1.1  | Specification of interfaces related to Authentic Sources |
| __[ETSI TS 119 602](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)__ | 1.1.1  | Specifies the Lists of Trusted Entities (LoTE) data model |
| __[ETSI TS 119 612](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.04.01_60/ts_119612v020401p.pdf)__ | 2.4.1  | Specifies the technical specifications for Trusted Lists |
| __[ETSI EN 319 102-1](https://www.etsi.org/deliver/etsi_en/319100_319199/31910201/01.04.01_60/en_31910201v010401p.pdf)__ | 1.4.1  | Procedures for Creation and Validation of AdES Digital Signatures |
| __[ETSI EN 319 122-1](https://www.etsi.org/deliver/etsi_en/319100_319199/31912201/01.03.01_60/en_31912201v010301p.pdf)__ | 1.3.1  | Specifies the CAdES (CMS Advanced Electronic Signatures) format, defining the technical requirements for advanced electronic signatures based on the Cryptographic Message Syntax (CMS) for binary data and documents |
| __[ETSI EN 319 132-1](https://www.etsi.org/deliver/etsi_en/319100_319199/31913201/01.03.01_60/en_31913201v010301p.pdf)__ | 1.3.1  | Specifies the XML Advanced Electronic Signatures (XAdES) format, defining the baseline requirements for creating and validating structured digital signatures within XML documents |
| __[ETSI EN 319 162](https://www.etsi.org/deliver/etsi_en/319100_319199/31916201/01.01.01_60/en_31916201v010101p.pdf)__ | 1.1.1  | Specifies the building blocks and the baseline containers of the Associated Signature Containers (ASiC) |

---

## CSC Technical Specifications

| Technical Specification | Version | Description                                                                                                                        |
|-------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------|
| __[CSC API](https://cloudsignatureconsortium.org/wp-content/uploads/2025/11/csc-api.pdf)__ | 2.2.0.0 | Provides a standardized interface for interoperable, cloud-based digital signatures and remote signing.                            |
| __[CSC Data Model](https://cloudsignatureconsortium.org/wp-content/uploads/2025/10/csc-dm.pdf)__ | 1.0.0   | Defines data models for (a) Requesting a signature, (b) Requesting a signing operation, (c) Authorization of a signing operation   |
| __[CSC Data Model Bindings](https://cloudsignatureconsortium.org/wp-content/uploads/2025/10/data-model-bindings.pdf)__ | 1.0.0   | Describes bindings of the CSC data model for use cases that are out of scope for CSC but may be used in relation with the CSC API. |

---

## CEN Standards

| Standard | Version | Description |
|----------|:--------|-------------|
| __[CEN EN 419 241-1](https://standards.cencenelec.eu/ords/f?p=CEN:110:::::FSP_PROJECT:61293&cs=197619E59B18776EC4C4865E1AB7A0037)__ | 2018    | Specifies security requirements and recommendations for Trustworthy Systems Supporting Server Signing (TW4S) that generate digital signatures. |

---

## Further Standards

- The most important cryptographic standards can be found
  [__here__](../ecosystem-concepts/crosscutting-concepts/security-requirements.md#cryptographic-algorithms).
- An overview of all standards and specifications can be found in the [__ARF__](https://github.com/orgs/eu-digital-identity-wallet/projects/29/views/2).
