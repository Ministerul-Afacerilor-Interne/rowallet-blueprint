const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const plantumlEncoder = require("plantuml-encoder");

const SITE_DIR = path.resolve(__dirname, "..");
const ASSET_DIR = path.join(SITE_DIR, "static", "generated", "plantuml");
const pendingAssets = new Map();

const delay = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

function normalizeSource(source) {
    const trimmedSource = source.trim();
    return trimmedSource.startsWith("digraph ")
        ? `@startdot\n${trimmedSource}\n@enddot`
        : trimmedSource;
}

function assetForSource(source) {
    const normalizedSource = normalizeSource(source);
    const hash = crypto
        .createHash("sha256")
        .update(normalizedSource)
        .digest("hex");
    const filename = `${hash}.svg`;

    return {
        normalizedSource,
        filePath: path.join(ASSET_DIR, filename),
        publicPath: `/generated/plantuml/${filename}`,
    };
}

function validateSvg(svg, renderer) {
    if (!svg.includes("<svg")) {
        throw new Error(`${renderer} did not return an SVG document`);
    }
    return svg;
}

async function renderWithServer(source, server) {
    const baseUrl = server.replace(/\/$/, "");
    const url = `${baseUrl}/svg/${plantumlEncoder.encode(source)}`;
    let lastError;

    for (let attempt = 1; attempt <= 30; attempt += 1) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return validateSvg(
                    await response.text(),
                    `PlantUML server ${baseUrl}`,
                );
            }
            lastError = new Error(
                `PlantUML server returned HTTP ${response.status}`,
            );
        } catch (error) {
            lastError = error;
        }

        if (attempt < 30) await delay(1000);
    }

    throw new Error(
        `Could not render PlantUML using ${baseUrl}: ${lastError.message}`,
    );
}

function renderWithCommand(source, command) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, ["-tsvg", "-pipe"], {
            stdio: ["pipe", "pipe", "pipe"],
        });
        const stdout = [];
        const stderr = [];

        process.stdout.on("data", (chunk) => stdout.push(chunk));
        process.stderr.on("data", (chunk) => stderr.push(chunk));
        process.on("error", (error) => {
            reject(
                new Error(
                    `Could not run ${command}. Install PlantUML or set PUML_URL ` +
                        `to a local PlantUML server: ${error.message}`,
                ),
            );
        });
        process.on("close", (code) => {
            if (code !== 0) {
                reject(
                    new Error(
                        `${command} exited with status ${code}: ${Buffer.concat(stderr).toString("utf8")}`,
                    ),
                );
                return;
            }
            try {
                resolve(
                    validateSvg(
                        Buffer.concat(stdout).toString("utf8"),
                        command,
                    ),
                );
            } catch (error) {
                reject(error);
            }
        });

        process.stdin.end(source);
    });
}

async function ensureAsset(source, options = {}) {
    const asset = assetForSource(source);
    if (fs.existsSync(asset.filePath)) return asset;
    if (pendingAssets.has(asset.filePath)) return pendingAssets.get(asset.filePath);

    const rendering = (async () => {
        const server = options.server || process.env.PUML_URL;
        const command = options.command || process.env.PLANTUML_COMMAND || "plantuml";
        const svg = server
            ? await renderWithServer(asset.normalizedSource, server)
            : await renderWithCommand(asset.normalizedSource, command);

        await fs.promises.mkdir(ASSET_DIR, { recursive: true });
        await fs.promises.writeFile(asset.filePath, svg, "utf8");
        return asset;
    })();

    pendingAssets.set(asset.filePath, rendering);
    try {
        return await rendering;
    } finally {
        pendingAssets.delete(asset.filePath);
    }
}

module.exports = { assetForSource, ensureAsset };
