const fs = require("node:fs");
const path = require("node:path");
const redirects = require("../plugins/redirects.js");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const BASE_URL = process.env.DOCUSAURUS_BASE_URL || "/rowallet-blueprint/";
const SITE_URL = process.env.DEPLOY_BASE_URL || "https://ministerul-afacerilor-interne.github.io";
const DOC_ROUTES = [
    "/",
    "/how-to-read-the-blueprint/",
    "/content/ecosystem-vision-and-fundamentals/what-is-the-ecosystem/",
    "/content/ecosystem-vision-and-fundamentals/what-is-the-wallet/",
    "/content/ecosystem-vision-and-fundamentals/standards/",
    "/content/ecosystem-vision-and-fundamentals/EUDI-value-proposition/",
    "/content/ecosystem-vision-and-fundamentals/governance-and-operation-model/",
    "/content/ecosystem-concepts/",
    "/content/ecosystem-concepts/introduction-and-goals/",
    "/content/ecosystem-concepts/constraints-and-decisions/",
    "/content/ecosystem-concepts/building-block-view/",
    "/content/ecosystem-concepts/deployment-view/",
    "/content/ecosystem-concepts/crosscutting-concepts/privacy-requirements/",
    "/content/ecosystem-concepts/crosscutting-concepts/security-requirements/",
    "/content/ecosystem-concepts/trust/",
    "/content/ecosystem-concepts/trust/decision-guide/",
    "/content/ecosystem-concepts/trust/trust-validation/",
    "/content/ecosystem-concepts/trust/trust_pid_issuance_presentation/",
    "/content/ecosystem-concepts/trust/trust_eaa_issuance_presentation/",
    "/content/ecosystem-concepts/trust/trust_q_pub_eaa_issuance_presentation/",
    "/content/ecosystem-concepts/trust/wallet-relying-party-authentication/",
    "/content/ecosystem-concepts/trust/overasking-protection/",
    "/content/ecosystem-concepts/trust/status-management/",
    "/content/features/PID/german-pid-rulebook/",
    "/content/features/PID/design-decisions/",
    "/content/features/PID/runtime-views/",
    "/content/features/EAA/",
    "/content/features/EAA/credential-anatomy/",
    "/content/features/EAA/design-recommendations/",
    "/content/features/EAA/catalog-of-attestations/",
    "/content/features/EAA/EAA-Issuance-OpenID4VC/",
    "/content/features/EAA/EAA-Presentation-OpenID4VC/",
    "/content/upcoming-features/",
    "/content/upcoming-features/qes/",
    "/content/archive/",
    "/content/archive/EUDI-link-governance/",
    "/content/archive/06-disclosure-policies/",
    "/content/archive/00-pid-issuance-and-presentation/",
    "/content/archive/01-qeaa-issuance-and-presentation/",
    "/content/archive/02-pseudonym/",
    "/content/archive/03-combined-presentation/",
    "/content/archive/flows/OID4VC-with-WRP-attestations/",
    "/content/archive/flows/PID-AuthenticatedChannel-cloud/",
    "/content/archive/flows/PID-AuthenticatedChannel-eIDcard-RESTAPI/",
    "/content/archive/flows/PID-AuthenticatedChannel-eIDcard/",
    "/content/archive/flows/PID-AuthenticatedChannel-secureElement/",
    "/content/archive/flows/PID-IssuerSigned-eIDcard/",
    "/content/archive/flows/PID-IssuerSigned/",
    "/content/archive/flows/Presentation-During-Issuance/",
    "/content/archive/flows/Wallet-Attestation/",
    "/content/glossary/",
];

function routeFile(route) {
    return route === "/"
        ? path.join(BUILD_DIR, "index.html")
        : path.join(BUILD_DIR, route.slice(1), "index.html");
}

function filesBelow(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        return entry.isDirectory() ? filesBelow(entryPath) : [entryPath];
    });
}

function fail(message) {
    console.error(message);
    process.exitCode = 1;
}

if (!fs.existsSync(BUILD_DIR)) {
    fail("The build directory does not exist. Run npm run build first.");
} else {
    // A page deleted from the source (release-manifest.yml "exclude") is not expected in the build.
    const DOCS_DIR = path.resolve(__dirname, "..", "architecture-proposal");
    const hasSource = (route) => {
        const base = path.join(DOCS_DIR, route.replace(/^\/|\/$/g, ""));
        return route === "/" || fs.existsSync(`${base}.md`) || fs.existsSync(path.join(base, "index.md"));
    };
    const expectedRoutes = [
        ...DOC_ROUTES.filter(hasSource),
        ...redirects.map(({ from }) => from),
    ];
    const missingRoutes = expectedRoutes.filter(
        (route) => !fs.existsSync(routeFile(route)),
    );
    if (missingRoutes.length > 0) {
        fail(`Missing legacy routes:\n${missingRoutes.join("\n")}`);
    }

    const textFiles = filesBelow(BUILD_DIR).filter((filePath) =>
        /\.(?:css|html|js)$/.test(filePath),
    );
    const forbiddenDependencies = [
        "www.plantuml.com/plantuml",
        "fonts.googleapis.com",
        "fonts.gstatic.com",
    ];
    for (const filePath of textFiles) {
        const content = fs.readFileSync(filePath, "utf8");
        for (const dependency of forbiddenDependencies) {
            if (content.includes(dependency)) {
                fail(
                    `Forbidden runtime dependency ${dependency} in ${path.relative(BUILD_DIR, filePath)}`,
                );
            }
        }
    }

    const homePage = fs.readFileSync(routeFile("/"), "utf8");
    const expectedCanonicalUrl = `${SITE_URL.replace(/\/$/, "")}${BASE_URL}`;
    if (!homePage.includes(`property="og:url" content="${expectedCanonicalUrl}"`)) {
        fail(`Expected canonical URL is missing: ${expectedCanonicalUrl}`);
    }
    for (const footerText of [
        "Copyright © 2026",
        "MAI-DGCTI",
        "CC BY 4.0",
    ]) {
        if (!homePage.includes(footerText)) {
            fail(`Footer text is missing: ${footerText}`);
        }
    }

    const diagramDir = path.join(BUILD_DIR, "generated", "plantuml");
    const diagramCount = fs.existsSync(diagramDir)
        ? fs.readdirSync(diagramDir).filter((name) => name.endsWith(".svg")).length
        : 0;
    if (diagramCount === 0) fail("No local PlantUML SVG assets were built.");

    const diagramPage = fs.readFileSync(
        routeFile("/content/ecosystem-concepts/building-block-view/"),
        "utf8",
    );
    if (!diagramPage.includes(`src="${BASE_URL}generated/plantuml/`)) {
        fail(`PlantUML assets do not use the configured base URL: ${BASE_URL}`);
    }

    if (!process.exitCode) {
        console.log(
            `Built-site checks passed (${expectedRoutes.length} routes, ${diagramCount} local diagrams).`,
        );
    }
}
