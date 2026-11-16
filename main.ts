// ai-excited-01 entry: copy the fixed image to the output directory.
// The program runs twice and both runs must write byte-identical output,
// so it copies the image file the repository holds and generates nothing
// at runtime. No network, standard library only.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
// Fail loudly on a truncated copy instead of submitting a broken file.
const srcBytes = statSync(src).size;
const dstBytes = statSync(dst).size;
if (srcBytes !== dstBytes) {
  throw new Error(`entry.png copy incomplete: ${dstBytes} of ${srcBytes} bytes`);
}
console.log(`wrote ${dst} (${dstBytes} bytes)`);
