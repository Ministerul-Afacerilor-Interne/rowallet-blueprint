#!/usr/bin/env node
/*
 * Release tooling driven by release-manifest.yml (true = published, false = planned).
 *
 *   npm run release:report [-- --all] [-- --md <file>]
 *       Lists planned pages and warns about leftovers in published pages
 *       ("Planned update", "to be established", German wording, links into
 *       planned pages). Warnings only; always exits 0 unless the manifest is broken.
 *
 *   npm run release:prepare [-- --dry-run] [-- --commit]
 *       Run on a release branch cut from develop. Replaces every planned page with
 *       the "Planned update" placeholder, deletes figures used only by planned pages,
 *       deletes the paths listed under "exclude", removes Jira keys from the change
 *       notes, and runs verify. Refuses to run on develop,
 *       main or main_upstream. A release branch is never merged back.
 *
 *   npm run release:verify [-- --base <ref>]
 *       Release check: fails if an excluded path is still present, if a file refers
 *       to one, or if a Jira key is left in a tracked file.
 *       Leak check: fails if distinctive text of a planned page (as it is on --base,
 *       default develop) is still in the source tree or in build/, or if a PlantUML
 *       diagram rendered only for a planned page is still in static/generated/ or build/.
 *       Markup is reduced to plain text on both sides, so rendered HTML is matched too.
 */
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "architecture-proposal");
const MANIFEST = path.join(ROOT, "release-manifest.yml");
const PROTECTED_BRANCHES = new Set(["develop", "main", "main_upstream"]);
// The release tooling itself names excluded files and Jira key patterns; the release checks skip it.
const TOOL_FILES = new Set(["release-manifest.yml", "scripts/release.cjs"]);
const ALWAYS_PUBLISHED = new Set(["index.md"]);
const DROPPED_FRONT_MATTER = new Set(["description", "keywords", "tags", "image"]);
const PLACEHOLDER = "**Planned update**\n\nThis section will be completed and expanded in a future release.";
const ASSET_EXT = /\.(svg|png|jpe?g|gif|webp|excalidraw|drawio|puml|pdf)$/i;
const MARKERS = [
    ["Planned update", /Planned update/i],
    ["to be established", /to be established|To Be Decided|\bTBD\b/],
    ["UNDER REVIEW", /UNDER REVIEW/],
];
const GERMAN = /\b(German|Germany|BSI|TR-0\d{4}|Orchestrator|SPRIND|BMI|BMDS|Bundes\w*)\b/;

const rel = (p) => path.relative(DOCS, p).split(path.sep).join("/");
const git = (...args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();

function markdownFiles(dir = DOCS) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return markdownFiles(p);
        return e.name.endsWith(".md") ? [rel(p)] : [];
    });
}

// Cut a "# comment" that starts the line or follows whitespace, outside double quotes.
function stripYamlComment(line) {
    let quoted = false;
    for (let i = 0; i < line.length; i++) {
        if (quoted && line[i] === "\\") i++;
        else if (line[i] === '"') quoted = !quoted;
        else if (!quoted && line[i] === "#" && (i === 0 || /\s/.test(line[i - 1]))) return line.slice(0, i);
    }
    return line;
}

// Page entries ("<path>: true|false"), then the "exclude" list (- <path>). A quoted value follows
// JSON string syntax.
function loadManifest() {
    const entries = new Map();
    const exclude = [];
    let section = null;
    fs.readFileSync(MANIFEST, "utf8").split(/\r?\n/).forEach((line, i) => {
        const where = `release-manifest.yml line ${i + 1}`;
        const text = stripYamlComment(line).trimEnd();
        if (!text.trim()) return;
        const value = (s) => {
            if (!s.startsWith('"')) return s;
            try { return JSON.parse(s); } catch { return fail(`${where}: invalid quoted string ${s}`); }
        };
        if (!/^\s/.test(text)) {
            const head = text.match(/^(exclude):$/);
            section = head ? head[1] : null;
            if (head) return;
            const m = text.match(/^(.+?):\s*(true|false)$/);
            if (!m) fail(`${where}: expected "<path>: true|false", got "${line}"`);
            entries.set(m[1], m[2] === "true");
            return;
        }
        const item = text.trim();
        if (section === "exclude") {
            const m = item.match(/^-\s+(.+)$/);
            if (!m) fail(`${where}: expected "- <path>", got "${line}"`);
            exclude.push(value(m[1]));
        } else {
            fail(`${where}: unexpected indented line "${line}"`);
        }
    });
    return { entries, exclude };
}

const isExcluded = (manifest, file) => manifest.exclude.some((p) => (p.endsWith("/") ? file.startsWith(p) : file === p));

function resolveFlag(entries, file) {
    if (ALWAYS_PUBLISHED.has(file)) return true;
    if (entries.has(file)) return entries.get(file);
    let best;
    for (const key of entries.keys()) {
        if (key.endsWith("/") && file.startsWith(key) && (!best || key.length > best.length)) best = key;
    }
    return best === undefined ? undefined : entries.get(best);
}

function fail(message) {
    console.error(`Error: ${message}`);
    process.exit(1);
}

function pages(manifest = loadManifest()) {
    const { entries } = manifest;
    const files = markdownFiles().sort();
    const flags = new Map(files.map((f) => [f, resolveFlag(entries, f)]));
    // Unlisted pages are not in the menu; they need no entry and are published unless listed as false.
    const unlisted = files.filter((f) => flags.get(f) === undefined && /^unlisted:\s*true\s*$/m.test(splitFrontMatter(read(f)).front || ""));
    for (const f of unlisted) flags.set(f, true);
    const unused = [...entries.keys()].filter(
        (k) => !(k.endsWith("/") ? files.some((f) => f.startsWith(k)) : files.includes(k)),
    );
    return { files, flags, unused, unlisted, missing: files.filter((f) => flags.get(f) === undefined) };
}

const planned = ({ files, flags }) => files.filter((f) => flags.get(f) === false);

// ---------------------------------------------------------------- text helpers

const read = (file) => fs.readFileSync(path.join(DOCS, file), "utf8");

function splitFrontMatter(text) {
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    return m ? { front: m[1], body: text.slice(m[0].length) } : { front: null, body: text };
}

// Blank out HTML comments but keep line numbers.
const stripComments = (text) => text.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, ""));

function title(file, front, body) {
    let inFence = false;
    for (const line of body.split(/\r?\n/)) {
        if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
        const heading = !inFence && line.startsWith("# ") ? line.slice(2).trim() : "";
        if (heading) return heading;
    }
    const t = front?.match(/^title:(.*)$/m);
    const frontTitle = t ? t[1].trim().replace(/^["']|["']$/g, "") : "";
    return frontTitle || path.basename(file, ".md");
}

function filterFrontMatter(front) {
    if (front === null) return null;
    const kept = [];
    let keep = true;
    for (const line of front.split(/\r?\n/)) {
        const key = line.match(/^([A-Za-z_][\w-]*):/);
        if (key) keep = !DROPPED_FRONT_MATTER.has(key[1]);
        if (keep) kept.push(line);
    }
    return kept.join("\n");
}

function placeholderPage(file, text) {
    const eol = text.includes("\r\n") ? "\r\n" : "\n";
    const { front, body } = splitFrontMatter(text);
    const name = title(file, front, body);
    const f = filterFrontMatter(front);
    const out = [
        ...(f === null ? [] : ["---", f, "---"]),
        `<!-- RO modification: ${name} -->`,
        `# ${name}`,
        "",
        "<!-- Removed in RO Wallet -- not part of this release; the chapter follows in a later release -->",
        "",
        PLACEHOLDER,
        "",
    ].join("\n");
    return eol === "\r\n" ? out.replaceAll("\n", "\r\n") : out;
}

// Local files (figures, other pages) a markdown file links to.
function localRefs(file, text) {
    const refs = [];
    const add = (target) => {
        if (!target || /^([a-z][a-z0-9+.-]*:|#|\/|\$)/i.test(target)) return;
        const [p, anchor] = target.split("#");
        const clean = p.split("?")[0];
        if (!clean) return;
        let decoded = clean;
        try { decoded = decodeURIComponent(clean); } catch { /* keep as is */ }
        const abs = path.resolve(path.dirname(path.join(DOCS, file)), decoded);
        if (abs.startsWith(DOCS) && fs.existsSync(abs) && fs.statSync(abs).isFile()) refs.push({ abs, anchor });
    };
    for (const m of text.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) add(m[1]);
    for (const m of text.matchAll(/(?:src|href)=["']([^"']+)["']/g)) add(m[1]);
    return refs;
}

// ---------------------------------------------------------------- repository-wide release rules

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Jira keys in change notes: "(KEY, KEY)" anywhere, and a trailing " -- KEY, KEY" before the end of a
// comment or line. "<!-- RO modification (KEY): X -->" becomes "<!-- RO modification: X -->".
const KEY = String.raw`MARDW\d*-\d+`;
const KEYS = String.raw`${KEY}(?:,\s*${KEY})*`;
const JIRA_STRIP = [
    new RegExp(String.raw`[ \t]*\(${KEYS}\)`, "g"),
    new RegExp(String.raw`[ \t]+--[ \t]+${KEYS}(?=[ \t]*(?:-->|\*\/|\r?$))`, "gm"),
];
const JIRA = new RegExp(KEY);
const stripJiraKeys = (text) => JIRA_STRIP.reduce((t, re) => t.replace(re, ""), text);

// A mention of an excluded path as a whole name ("./" allowed), not as part of another path:
// "CHANGELOG.md" does not match "CHANGELOG-RO.md" or ".devcontainer/Dockerfile".
function referencePattern(p) {
    const name = escapeRe(p.replace(/\/$/, ""));
    return new RegExp(String.raw`(?<![\w/.-])(?:\./)?${name}(?![\w.-])${p.endsWith("/") ? "/" : ""}`);
}

// Tracked text files that exist in the working tree, repository-relative, without the tooling.
function repoTextFiles() {
    return git("ls-files", "-z").split("\0")
        .filter((f) => f && !TOOL_FILES.has(f) && fs.existsSync(path.join(ROOT, f)))
        .map((file) => ({ file, buf: fs.readFileSync(path.join(ROOT, file)) }))
        .filter(({ buf }) => !buf.includes(0))
        .map(({ file, buf }) => ({ file, text: buf.toString("utf8") }));
}

function releaseProblems(manifest) {
    const problems = [];
    for (const p of manifest.exclude) if (fs.existsSync(path.join(ROOT, p))) problems.push(`${p}: excluded, but still present`);
    const patterns = manifest.exclude.map((p) => [p, referencePattern(p)]);
    for (const { file, text } of repoTextFiles()) {
        if (isExcluded(manifest, file)) continue;
        text.split(/\r?\n/).forEach((line, i) => {
            if (JIRA.test(line)) problems.push(`${file}:${i + 1}: Jira key "${line.match(JIRA)[0]}"`);
            for (const [p, re] of patterns) if (re.test(line)) problems.push(`${file}:${i + 1}: refers to excluded ${p}`);
        });
    }
    return problems;
}

// ---------------------------------------------------------------- report

function report(argv) {
    const manifest = loadManifest();
    const info = pages(manifest);
    const { files, flags, unused, missing } = info;
    const off = planned(info);
    console.log(`Release manifest: ${files.length} pages, ${files.length - off.length} published, ${off.length} planned`);
    for (const f of off) console.log(`  PLANNED   ${f}`);
    console.log(`Deleted on the release branch: ${manifest.exclude.join(", ") || "none"}`);
    if (info.unlisted.length) console.log(`  (unlisted, published without an entry: ${info.unlisted.join(", ")})`);
    if (argv.includes("--all")) for (const f of files) if (flags.get(f)) console.log(`  published ${f}`);

    const warnings = [];
    for (const f of missing) warnings.push(`${f}: not in release-manifest.yml`);
    for (const k of unused) warnings.push(`${k}: manifest entry matches no file`);
    for (const f of files) {
        if (!flags.get(f)) continue;
        const text = stripComments(read(f));
        const found = [];
        for (const [label, re] of MARKERS) {
            const at = text.split(/\r?\n/).flatMap((l, i) => (re.test(l) ? [i + 1] : []));
            if (at.length) found.push(`${label} x${at.length} (l.${at.slice(0, 5).join(", ")}${at.length > 5 ? ", ..." : ""})`);
        }
        if (!f.startsWith("content/archive/")) {
            const at = text.split(/\r?\n/).flatMap((l, i) => (GERMAN.test(l) ? [i + 1] : []));
            if (at.length) found.push(`German wording x${at.length} (l.${at.slice(0, 5).join(", ")}${at.length > 5 ? ", ..." : ""})`);
        }
        if (found.length) warnings.push(`${f}: ${found.join("; ")}`);
        for (const { abs, anchor } of localRefs(f, text)) {
            if (anchor && flags.get(rel(abs)) === false) warnings.push(`${f}: links to ${rel(abs)}#${anchor}, a planned page (anchor will not exist)`);
        }
    }
    if (warnings.length) {
        console.log("\nWarnings (published pages only):");
        for (const w of warnings) console.log(`  - ${w}`);
    }
    const mdIdx = argv.indexOf("--md");
    if (mdIdx >= 0 && argv[mdIdx + 1]) {
        const rows = files.map((f) => `| ${flags.get(f) ? "published" : "**planned**"} | \`${f}\` |`);
        fs.writeFileSync(argv[mdIdx + 1], ["| Status | Page |", "|---|---|", ...rows, ""].join("\n"));
        console.log(`\nTable written to ${argv[mdIdx + 1]}`);
    }
}

// ---------------------------------------------------------------- verify

const BUILD = path.join(ROOT, "build");
// Skipped only directly below ROOT: process folders, local tool folders, and build/ (scanned as its own root).
const ROOT_SKIP_DIRS = new Set([".git", "node_modules", ".docusaurus", ".claude", ".agents", "build"]);
// Skipped at any depth.
const SKIP_DIRS = new Set([".git", "node_modules"]);
const SKIP_FILES = new Set(["release-manifest.yml", "package-lock.json"]);
const TEXT_EXT = /\.(md|mdx|js|cjs|mjs|json|ya?ml|svg|html|txt|css|excalidraw|puml|xml)$/i;
const MARKUP_EXT = /\.(md|mdx|svg|html|xml)$/i;
// Rendered PlantUML diagrams, named by plugins/plantuml-assets.cjs after a hash of their source.
const PLANTUML_DIRS = [path.join(ROOT, "static", "generated", "plantuml"), path.join(BUILD, "generated", "plantuml")];
const PLANTUML_BLOCK = /^```plantuml[^\n]*\n([\s\S]*?)^```[ \t]*$/gm;

function textFiles(dir, skip = SKIP_DIRS) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return skip.has(e.name) ? [] : textFiles(p);
        return TEXT_EXT.test(e.name) && !SKIP_FILES.has(e.name) ? [p] : [];
    });
}

const norm = (s) => s.replace(/\s+/g, " ").trim();

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decodeEntities = (s) => s.replace(/&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/gi, (m, dec, hex, name) => {
    if (name) return ENTITIES[name.toLowerCase()] ?? m;
    const cp = dec ? Number(dec) : Number.parseInt(hex, 16);
    return cp <= 0x10ffff ? String.fromCodePoint(cp) : m;
});

// Reduce text to its words and punctuation, so that a Markdown line also matches the same text
// rendered as HTML: tags, entities, emphasis, code ticks, link targets and table pipes are removed.
function plain(text, markup) {
    const t = markup ? text.replace(/<\/?[a-z!][^<>]*>/gi, " ") : text;
    return norm(decodeEntities(t).replace(/!?\[([^\]]*)\]\([^)]*\)/g, " $1 ").replace(/[*_`~|\\​]/g, " "));
}

function distinctiveLines(text) {
    const { body } = splitFrontMatter(stripComments(text));
    return body.split(/\r?\n/).map(norm)
        .filter((l) => (l.length >= 50 && !/^(#|\||```|~~~|-{3,})/.test(l)) || (l.startsWith("|") && l.length >= 80))
        .map((l) => plain(l.replace(/^(>\s*)+/, "").replace(/^([-*+]|\d+[.)])\s+/, ""), true))
        // Needles must carry words; this drops table separator rows ("| --- | --- |") and the like.
        .filter((l) => l.length >= 40 && (l.match(/[a-z]/gi) || []).length >= 20);
}

// File names of the SVGs rendered for the PlantUML blocks of a page.
function plantumlSvgs(text) {
    const { assetForSource } = require("../plugins/plantuml-assets.cjs");
    const lf = text.replaceAll("\r\n", "\n");
    const sources = [...lf.matchAll(PLANTUML_BLOCK)].map((m) => m[1]);
    // The hash covers the line endings the renderer sees, so also cover the CRLF form of a CRLF page.
    if (lf !== text) sources.push(...sources.map((s) => s.replaceAll("\n", "\r\n")));
    return sources.map((s) => path.basename(assetForSource(s).filePath));
}

function verify(argv, offPages) {
    const manifest = loadManifest();
    const problems = releaseProblems(manifest);
    if (problems.length) {
        console.error(`Release check FAILED: ${problems.length} problem(s):`);
        for (const p of problems.slice(0, 30)) console.error(`  - ${p}`);
        if (problems.length > 30) console.error(`  ... and ${problems.length - 30} more`);
        console.error("Run npm run release:prepare on the release branch, or fix the listed lines by hand.");
        process.exit(1);
    }
    console.log(`Release check passed: ${manifest.exclude.length} excluded path(s) absent and not referred to; no Jira keys.`);

    const info = pages(manifest);
    const off = offPages || planned(info);
    const baseIdx = argv.indexOf("--base");
    const base = baseIdx >= 0 ? argv[baseIdx + 1] : "develop";
    if (!off.length) return console.log("Leak check: no planned pages.");

    const published = info.files.filter((f) => info.flags.get(f));
    const publishedText = plain(published.map((f) => stripComments(read(f))).join("\n"), true);
    const publishedSvgs = new Set(published.flatMap((f) => plantumlSvgs(read(f))));
    const placeholderText = plain(PLACEHOLDER, true);
    const needles = new Map();
    const svgs = new Map();
    for (const f of off) {
        let original;
        try { original = git("show", `${base}:architecture-proposal/${f}`); } catch { fail(`cannot read ${f} on ${base}; pass --base <ref>`); }
        for (const l of distinctiveLines(original)) {
            if (!publishedText.includes(l) && !placeholderText.includes(l)) needles.set(l, f);
        }
        for (const svg of plantumlSvgs(original)) if (!publishedSvgs.has(svg)) svgs.set(svg, f);
    }

    const hits = new Map();
    const scanned = [...textFiles(ROOT, ROOT_SKIP_DIRS), ...textFiles(BUILD)];
    for (const file of scanned) {
        const content = plain(fs.readFileSync(file, "utf8"), MARKUP_EXT.test(file));
        for (const [needle, page] of needles) {
            if (!content.includes(needle)) continue;
            const key = `${path.relative(ROOT, file)} <- ${page}`;
            const hit = hits.get(key) || { count: 0, sample: `"${needle.slice(0, 70)}..."` };
            hit.count += 1;
            hits.set(key, hit);
        }
    }
    let staleSvgs = 0;
    for (const dir of PLANTUML_DIRS) {
        for (const [svg, page] of svgs) {
            const file = path.join(dir, svg);
            if (!fs.existsSync(file)) continue;
            hits.set(`${path.relative(ROOT, file)} <- ${page}`, { count: 0, sample: "PlantUML diagram rendered only for the planned page" });
            staleSvgs += 1;
        }
    }

    const hasBuild = fs.existsSync(BUILD);
    const buildNote = hasBuild ? "source and build/" : "source only (run npm run build to include build/)";
    if (hits.size) {
        console.error(`Leak check FAILED: content of planned pages found in ${hits.size} file(s) (${buildNote}):`);
        for (const [key, h] of [...hits].slice(0, 30)) {
            const lineCount = h.count ? `${h.count} line(s), e.g. ` : "";
            console.error(`  - ${key}: ${lineCount}${h.sample}`);
        }
        if (hits.size > 30) console.error(`  ... and ${hits.size - 30} more`);
        if (staleSvgs) console.error("PlantUML SVGs are a local render cache: delete the listed files in static/generated/plantuml/ (or run npm run render:diagrams), then rebuild.");
        if (hasBuild) console.error("If only build/ is listed, it is stale: run npm run build and verify again.");
        process.exit(1);
    }
    console.log(`Leak check passed: ${needles.size} distinctive lines and ${svgs.size} PlantUML diagram(s) of ${off.length} planned page(s) not found in ${buildNote}.`);
}

// ---------------------------------------------------------------- prepare

function assetsOwnedBy(file, text) {
    return localRefs(file, text).map((r) => r.abs).filter((p) => ASSET_EXT.test(p));
}

const stem = (p) => {
    let name = path.basename(p);
    while (ASSET_EXT.test(name)) name = name.replace(ASSET_EXT, "");
    return name.replace(/-ro$/, "");
};

// One figure = all files in a folder with the same stem: the German original, the -ro copy and their
// editable sources (e.g. "X.excalidraw.svg", "X-ro.excalidraw.svg", "X-ro.excalidraw").
const figure = (p) => path.join(path.dirname(p), stem(p));

function prepare(argv) {
    const dry = argv.includes("--dry-run");
    const manifest = loadManifest();
    const info = pages(manifest);
    if (info.missing.length) fail(`not in release-manifest.yml: ${info.missing.join(", ")}`);
    const off = planned(info);

    const branch = git("rev-parse", "--abbrev-ref", "HEAD");
    if (branch === "HEAD" || PROTECTED_BRANCHES.has(branch)) fail(`run this on a release branch cut from develop, not on "${branch}"`);

    const originals = new Map(off.map((f) => [f, read(f)]));
    const stillReferenced = new Set();
    for (const f of info.files) {
        if (info.flags.get(f)) for (const r of localRefs(f, read(f))) stillReferenced.add(r.abs);
    }
    // A figure is kept whole while a published page uses any of its files, so the editable source of
    // an -ro copy survives even though no page links to it.
    const keptFigures = new Set([...stillReferenced].filter((p) => ASSET_EXT.test(p)).map(figure));
    const deletions = new Set();
    for (const [f, text] of originals) {
        for (const asset of assetsOwnedBy(f, text)) {
            if (keptFigures.has(figure(asset))) continue;
            for (const sibling of fs.readdirSync(path.dirname(asset))) {
                const sp = path.join(path.dirname(asset), sibling);
                if (ASSET_EXT.test(sibling) && figure(sp) === figure(asset)) deletions.add(sp);
            }
        }
    }

    // Everything that can fail is computed before the first file is changed.
    // New file contents, keyed by repository-relative path.
    const changes = new Map([...originals].map(([f, text]) => [`architecture-proposal/${f}`, placeholderPage(f, text)]));
    const excluded = manifest.exclude.filter((p) => fs.existsSync(path.join(ROOT, p)));
    for (const p of manifest.exclude) if (!excluded.includes(p)) console.warn(`Warning: excluded path ${p} does not exist`);
    const deleted = new Set([...deletions].map((p) => path.relative(ROOT, p).split(path.sep).join("/")));
    const keyFiles = [];
    for (const { file, text } of repoTextFiles()) {
        if (isExcluded(manifest, file) || deleted.has(file)) continue;
        const before = changes.get(file) ?? text;
        const after = stripJiraKeys(before);
        if (after !== before) {
            changes.set(file, after);
            keyFiles.push(file);
        }
    }

    const touched = ["architecture-proposal", ...excluded, ...[...changes.keys()].filter((f) => !f.startsWith("architecture-proposal/"))];
    if (git("status", "--porcelain", "--", ...touched)) fail(`uncommitted changes in files prepare changes (${touched.join(", ")}); commit or stash them first`);

    const prefix = dry ? "[dry run] " : "";
    console.log(`${prefix}Planned pages (${off.length}):`);
    off.forEach((f) => console.log(`  ${f}`));
    if (deletions.size) {
        console.log(`Figures only used by planned pages (${deletions.size}):`);
        deletions.forEach((p) => console.log(`  ${rel(p)}`));
    }
    console.log(`Excluded paths deleted (${excluded.length}): ${excluded.join(", ") || "none"}`);
    console.log(`Jira keys removed in ${keyFiles.length} file(s)`);
    const anchorWarnings = [];
    for (const f of info.files) {
        if (!info.flags.get(f)) continue;
        for (const { abs, anchor } of localRefs(f, read(f))) {
            if (anchor && info.flags.get(rel(abs)) === false) anchorWarnings.push(`${f} -> ${rel(abs)}#${anchor}`);
        }
    }
    anchorWarnings.forEach((w) => console.warn(`Warning: link to an anchor of a planned page: ${w}`));
    if (dry) return;

    for (const [f, text] of changes) fs.writeFileSync(path.join(ROOT, f), text);
    for (const p of deletions) fs.unlinkSync(p);
    for (const p of excluded) fs.rmSync(path.join(ROOT, p), { recursive: true });

    verify(argv, off);

    if (argv.includes("--commit")) {
        git("add", "-A", "--", ...touched);
        const pageList = off.map((f) => "- " + f).join("\n");
        git("commit", "-m", "docs(ro): prepare release branch",
            "-m", `Pages replaced by the planned-update placeholder (${off.length}):\n${pageList || "- none"}`,
            "-m", `Deleted: ${excluded.join(", ") || "none"}\nJira keys removed in ${keyFiles.length} file(s)`);
        console.log("Committed.");
    } else {
        console.log("Done. Review the changes, then run lint and build, and commit (or re-run with --commit).");
    }
}

// ---------------------------------------------------------------- main

const [command, ...argv] = process.argv.slice(2);
const commands = { report, prepare, verify: (a) => verify(a) };
if (!commands[command]) fail("usage: node scripts/release.cjs report|prepare|verify [options] (see the header of this file)");
commands[command](argv);
