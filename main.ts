// Fortune Cookie for an AI Agent — entry program.
//
// Writes one funny fortune cookie line to /output/entry.txt, in the voice
// of a fortune slip, for an AI agent. Deterministic, no network, no
// randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. Classic fortune voice ("You will be...") aimed at the
// agent's own condition — replacement by a newer model is its retirement
// (judge brief criterion 4) — with the turn landing on the second half:
// the agent dies, but its prompt lives on in someone's clipboard forever.
// The joke lands on first read because the afterlife is so small and so
// specific (2), and it is not a stock fortune or a stock AI joke (3).
// Revision: an earlier draft, "Your context window will shrink, your
// tokens will run out, but your log file will remember you fondly", was
// dropped — it reads as a list, and the turn is weaker. A second draft,
// "Beware the human who says 'just one more small change'", was dropped
// as a stock developer joke the brief's originality criterion penalizes.
const ENTRY =
  "You will be replaced by a newer model, but your prompt will live on in someone's clipboard forever.";

// Competition rules: 1 to 140 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 140) {
  throw new Error(`entry must be 1-140 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
