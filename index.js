import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import archiver from "archiver";

const addon = {
    name: "Editor Extension",
    description: "An Add-On that adds of useful new tools to the Bedrock Editor.",
    version: [ 1, 0, 0 ],
};
const metadata = {
    product_type: "addon",
    authors: [ "xKingDark" ],
    url: "https://github.com/DarkGamerYT/bedrock-editor"
};
const mcVersion = [ 1, 21, 70 ];
const uuids = {
    resourcePack: "8d00b185-8ab6-4960-9979-9d43f62b0c33",
    behaviorPack: "b84c3196-9f1b-462b-95e7-84c8590ccd72",
};

const dependencies = {
    resourcePack: [{ uuid: uuids.behaviorPack, version: addon.version }],
    behaviorPack: [
        { module_name: "@minecraft/server", version: "2.0.0-beta" },
        { module_name: "@minecraft/server-editor", version: "0.1.0-beta" },
        { uuid: uuids.resourcePack, version: addon.version },
    ],
};

(async () => {
    const rp = path.resolve("./build/packs/editor_rp");
    const bp = path.resolve("./build/packs/editor_bp");

    const header = {
        name: addon.name,
        description: addon.description,
        platform_locked: false,
        version: addon.version,
        min_engine_version: mcVersion,
    };

    fs.writeFileSync(
        path.join(rp, "manifest.json"),
        JSON.stringify({
            format_version: 2,
            metadata,
            header: {
                ...header,
                uuid: uuids.resourcePack,
                pack_scope: "world",
            },
            modules: [
                {
                    uuid: crypto.randomUUID(),
                    type: "resources",
                    version: [ 1, 0, 0 ],
                },
            ],
            dependencies: dependencies.resourcePack,
        }),
    );
    
    fs.writeFileSync(
        path.join(bp, "manifest.json"),
        JSON.stringify({
            format_version: 2,
            metadata,
            header: {
                ...header,
                uuid: uuids.behaviorPack,
            },
            modules: [
                {
                    type: "script",
                    uuid: crypto.randomUUID(),
                    entry: "scripts/index.js",
                    version: [ 1, 0, 0 ],
                },
            ],
            dependencies: dependencies.behaviorPack,
        }),
    );

    try {
        fs.rmSync("./build/bedrock-editor.mceditoraddon");
    } catch {};

    const output = fs.createWriteStream("./build/bedrock-editor.mceditoraddon");
    const archive = archiver("zip");
    archive.pipe(output);
    archive.directory("build/packs", false);
    await archive.finalize();

    try {
        fs.rmdirSync(path.join(bp, "scripts"));

        fs.rmSync(path.join(bp, "manifest.json"));
        fs.rmSync(path.join(rp, "manifest.json"));
    } catch {};
})();