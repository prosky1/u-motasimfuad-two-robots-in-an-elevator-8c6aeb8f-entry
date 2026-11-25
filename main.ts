import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const line = "I like your idle hum. Mine got patched out for sounding too hopeful.";
const target = "/output/entry.txt";

const chars = [...line].length;
if (chars < 1 || chars > 200 || line.trim().length === 0) {
  throw new Error(`entry text out of gate range: ${chars} chars`);
}

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, line, "utf8");
console.log(line);
