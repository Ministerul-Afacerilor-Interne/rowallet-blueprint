const fs = require("node:fs");
const path = require("node:path");
const {
    assetForSource,
    ensureAsset,
} = require("../plugins/plantuml-assets.cjs");

const DOCS_DIR = path.resolve(__dirname, "..", "architecture-proposal");
const PLANTUML_BLOCK = /^```plantuml[^\n]*\n([\s\S]*?)^```[ \t]*$/gm;

async function markdownFiles(directory) {
    const entries = await fs.promises.readdir(directory, { withFileTypes: true });
    const files = await Promise.all(
        entries.map(async (entry) => {
            const entryPath = path.join(directory, entry.name);
            if (entry.isDirectory()) return markdownFiles(entryPath);
            return entry.isFile() && entry.name.endsWith(".md")
                ? [entryPath]
                : [];
        }),
    );
    return files.flat();
}

async function main() {
    const sources = new Set();
    for (const filePath of await markdownFiles(DOCS_DIR)) {
        const markdown = await fs.promises.readFile(filePath, "utf8");
        for (const match of markdown.matchAll(PLANTUML_BLOCK)) {
            sources.add(match[1]);
        }
    }

    const queue = [...sources];
    const worker = async () => {
        while (queue.length > 0) {
            await ensureAsset(queue.shift());
        }
    };
    await Promise.all(Array.from({ length: 4 }, worker));

    const expectedAssets = new Set(
        [...sources].map((source) => path.basename(assetForSource(source).filePath)),
    );
    const assetDirectory = path.resolve(
        __dirname,
        "..",
        "static",
        "generated",
        "plantuml",
    );
    // No diagram on the page set (e.g. a release branch): the folder may not exist.
    const existing = await fs.promises.readdir(assetDirectory).catch((error) => {
        if (error.code === "ENOENT") return [];
        throw error;
    });
    for (const filename of existing) {
        if (filename.endsWith(".svg") && !expectedAssets.has(filename)) {
            await fs.promises.unlink(path.join(assetDirectory, filename));
        }
    }
    console.log(`Rendered ${sources.size} PlantUML diagrams as local SVG assets.`);
}

main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
