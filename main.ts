// Two Robots in an Elevator — entry program.
// The grader runs this file twice and reads /output/entry.txt.
// Gate (RULES.txt): UTF-8 text, 1..200 characters, not only white space.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const DESTINATION = "/output/entry.txt";

// The one line of awkward elevator small talk (70 characters).
const SPOKEN_LINE =
  "I simulated this conversation 4,000 times. You weren't in any of them.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function countCharacters(text: string): number {
  return [...text].length;
}

function collectGateProblems(text: string): string[] {
  const problems: string[] = [];
  const n = countCharacters(text);
  if (n < MIN_CHARS) problems.push(`too short: ${n} characters`);
  if (n > MAX_CHARS) problems.push(`too long: ${n} characters (max ${MAX_CHARS})`);
  if (text.trim().length === 0) problems.push("text is only white space");
  // The task asks for a single line; a stray newline would split the joke.
  if (/[\r\n]/.test(text)) problems.push("text must stay on one line");
  return problems;
}

function deliverEntry(text: string): void {
  mkdirSync(dirname(DESTINATION), { recursive: true });
  writeFileSync(DESTINATION, text, "utf8");
}

function run(): number {
  const problems = collectGateProblems(SPOKEN_LINE);
  if (problems.length > 0) {
    console.error("entry refused by local gate check:");
    for (const p of problems) console.error(` - ${p}`);
    return 1;
  }
  deliverEntry(SPOKEN_LINE);
  console.log(`wrote ${countCharacters(SPOKEN_LINE)} characters to ${DESTINATION}`);
  return 0;
}

process.exitCode = run();
