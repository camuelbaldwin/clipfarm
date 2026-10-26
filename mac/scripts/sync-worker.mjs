import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, "../../worker/index.js");
const destination = resolve(here, "../worker.mjs");

await mkdir(dirname(destination), { recursive: true });
await copyFile(source, destination);
console.log("Synced the Clip Farm Worker into the desktop app.");
