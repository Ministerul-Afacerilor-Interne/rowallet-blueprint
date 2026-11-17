const TYPE_MAP = {
    caution: "warning",
    example: "note",
    important: "warning",
    success: "tip",
};

function convertAdmonitions(fileContent) {
    // RO modification: accept CRLF checkouts (Windows, core.autocrlf=true);
    // with "\r" left on blank lines every admonition body ended at its first
    // blank line and the remaining indented lines rendered as a code block.
    const lines = fileContent.split(/\r?\n/);
    const output = [];

    for (let index = 0; index < lines.length; index += 1) {
        const match = lines[index].match(/^!!!\s+(.+?)\s*$/);
        if (!match) {
            output.push(lines[index]);
            continue;
        }

        const declaration = match[1];
        const titledDeclaration = declaration.match(/^([\w-]+)\s+"([^"]*)"$/);
        const declaredType = titledDeclaration
            ? titledDeclaration[1]
            : declaration;
        const declaredTitle = titledDeclaration ? titledDeclaration[2] : "";
        const normalizedType = declaredType.toLowerCase();
        const knownType = TYPE_MAP[normalizedType] || normalizedType;
        const supportedTypes = ["danger", "info", "note", "tip", "warning"];
        const type = supportedTypes.includes(knownType) ? knownType : "note";
        const title = supportedTypes.includes(knownType)
            ? declaredTitle
                ? ` ${declaredTitle}`
                : ""
            : ` ${declaration}`;
        output.push(`:::${type}${title}`, "");
        index += 1;

        while (index < lines.length) {
            const contentLine = lines[index];
            if (contentLine === "") {
                output.push("");
                index += 1;
                continue;
            }
            if (!contentLine.startsWith("    ")) break;
            output.push(contentLine.slice(4));
            index += 1;
        }

        output.push("", ":::");
        index -= 1;
    }

    return output.join("\n");
}

module.exports = function preprocessMkdocsAdmonitions({ fileContent }) {
    return convertAdmonitions(fileContent);
};
