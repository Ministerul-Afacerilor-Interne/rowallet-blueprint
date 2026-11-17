// RO modification: defaults target GitHub Pages of the Ministry of
// Internal Affairs repository; override with DEPLOY_BASE_URL /
// DOCUSAURUS_BASE_URL in CI.
const baseUrl = process.env.DOCUSAURUS_BASE_URL || "/rowallet-blueprint/";
const docsVersion = process.env.DOCUSAURUS_DOCS_VERSION || "latest";
const siteUrl = process.env.DEPLOY_BASE_URL || "https://ministerul-afacerilor-interne.github.io";
const absoluteSiteUrl = (path) =>
    `${siteUrl.replace(/\/$/, "")}${baseUrl}${path}`;

module.exports = {
    title: "RO Wallet Blueprint",
    tagline: "Blueprint for the RO Wallet Ecosystem in Romania",
    url: siteUrl,
    baseUrl,
    // RO modification: RO-Q02 answer -- public GitHub repository of
    // the Ministry of Internal Affairs
    organizationName: "Ministerul-Afacerilor-Interne",
    projectName: "rowallet-blueprint",
    favicon: "img/favicon.svg",
    onBrokenLinks: "throw",
    trailingSlash: true,
    markdown: {
        format: "md",
        hooks: {
            onBrokenMarkdownLinks: "throw",
        },
        preprocessor: require("./plugins/preprocess-mkdocs-admonitions.cjs"),
    },
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },
    presets: [
        [
            "classic",
            {
                docs: {
                    path: "architecture-proposal",
                    routeBasePath: "/",
                    sidebarPath: require.resolve("./sidebars.js"),
                    showLastUpdateAuthor: false,
                    showLastUpdateTime: false,
                    // RO modification: no "Edit this page" links; feedback
                    // goes through the feedback email and the private review process.
                    versions: {
                        current: {
                            label: docsVersion,
                            path: "",
                        },
                    },
                    remarkPlugins: [
                        [
                            require("./plugins/remark-plantuml.cjs"),
                            { server: process.env.PUML_URL, baseUrl },
                        ],
                        require("remark-math").default,
                    ],
                    rehypePlugins: [require("rehype-katex").default],
                },
                blog: false,
                theme: {
                    customCss: [
                        require.resolve("@fontsource/ibm-plex-sans/latin-400.css"),
                        require.resolve("@fontsource/ibm-plex-sans/latin-500.css"),
                        require.resolve("@fontsource/ibm-plex-sans/latin-600.css"),
                        require.resolve("./src/css/custom.css"),
                    ],
                },
            },
        ],
    ],
    plugins: [
        "docusaurus-plugin-image-zoom",
        [
            "docusaurus-plugin-llms",
            {
                docsDir: [
                    {
                        path: "architecture-proposal",
                        routeBasePath: "/",
                        label: "Blueprint",
                    },
                ],
                title: "RO Wallet Blueprint",
                description:
                    "Architecture, governance, and operational models for the RO Wallet Ecosystem.",
                version: docsVersion,
                rootContent:
                    "This file lists the main documentation pages for the RO Wallet Blueprint.",
                fullRootContent:
                    "This file contains the complete documentation content for the RO Wallet Blueprint.",
            },
        ],
        [
            require.resolve("@docusaurus/plugin-client-redirects"),
            { redirects: require("./plugins/redirects.js") },
        ],
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                indexDocs: true,
                indexBlog: false,
                indexPages: false,
                docsRouteBasePath: "/",
                docsDir: "architecture-proposal",
                language: ["en"],
                hashed: "filename",
                removeDefaultStopWordFilter: true,
                highlightSearchTermsOnTargetPage: true,
                ignoreFiles: [/^content\/archive(\/|$)/],
            },
        ],
    ],
    themeConfig: {
        zoom: {
            selector: ".markdown img",
            background: {
                light: "rgb(255, 255, 255)",
                dark: "rgb(50, 50, 50)",
            },
        },
        navbar: {
            // RO modification: RO Wallet logo in the navbar; the
            // logo already carries the "RO Wallet" name, so the title is reduced
            // to "Blueprint".
            title: "Blueprint",
            logo: {
                alt: "RO Wallet",
                src: "img/ro-wallet-logo-horizontal-white.svg",
            },
            items: [
                {
                    type: "docsVersionDropdown",
                    position: "left",
                },
                {
                    type: "dropdown",
                    label: "Documentation",
                    position: "left",
                    items: [
                        {
                            label: "Blueprint",
                            to: "/",
                        },
                        // Removed in RO Wallet -- navbar "Developer Guide" link
                        // pointed to the German developer guide; RO developer
                        // guide planned for later publication
                        {
                            label: "Wallet Architecture",
                            href: "https://ministerul-afacerilor-interne.github.io/rowallet-documentation/latest/",
                        },
                    ],
                },
                {
                    href: "https://github.com/Ministerul-Afacerilor-Interne/rowallet-blueprint",
                    label: "Repository",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            // RO modification: footer reduced to the copyright and licence
            // line, matching the public RO Wallet documentation repository. No link
            // columns; attribution to the German Blueprint is kept in ATTRIBUTION.md
            // and NOTICE.
            copyright:
                'Copyright © 2026 <a href="https://www.mai.gov.ro/">MAI-DGCTI</a><br />Licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>',
        },
        prism: {
            additionalLanguages: [
                "bash",
                "http",
                "java",
                "json",
                "kotlin",
                "typescript",
                "yaml",
            ],
        },
    },
};
