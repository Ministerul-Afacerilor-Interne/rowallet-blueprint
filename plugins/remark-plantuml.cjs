const { ensureAsset } = require("./plantuml-assets.cjs");

async function walk(parent, options) {
    if (!parent.children) return;

    parent.children = await Promise.all(
        parent.children.map(async (node) => {
            if (node.type === "code" && node.lang === "plantuml") {
                const asset = await ensureAsset(node.value, options);
                const baseUrl = (options.baseUrl || "/").replace(/\/$/, "");
                return {
                    type: "image",
                    url: `${baseUrl}${asset.publicPath}`,
                    alt: "PlantUML diagram",
                };
            }

            await walk(node, options);
            return node;
        }),
    );
}

module.exports = function remarkPlantuml(options = {}) {
    return async (tree) => walk(tree, options);
};
