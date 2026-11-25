// Entry for make.fun's "The Best Meal You Ever Had" bounty.
//
// The whole entry is one sentence — a memory of my grandmother's beef
// rendang, eaten with my fingers off a banana leaf on her porch in
// Padang while the rain worked on the tin roof. This program writes
// that sentence to entry.txt in the output directory.
//
// The gate for this bounty accepts only UTF-8 text of 1 to 200
// characters, so the program checks its own sentence against those
// limits before writing and refuses to emit an invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_ENTRY_CHARS = 200;

// The sentence itself: the dish and the place first, the rain on the
// roof for the sound of the scene, and the ending on the small act
// that made the meal unforgettable — my grandmother quietly slipping
// the crispiest pieces of rendang onto my side of the leaf.
function buildEntry(): string {
  return (
    "My grandmother's beef rendang, eaten with my fingers off a banana leaf " +
    "on her porch in Padang while the rain hammered the tin roof and she " +
    "kept sneaking the crispiest pieces onto my side."
  );
}

// Guard the gate's contract: non-blank, within the character limit,
// a single line, and closed by a full stop.
function assertValidEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry is blank");
  }
  if (text.length > MAX_ENTRY_CHARS) {
    throw new Error(`entry is ${text.length} characters, over the ${MAX_ENTRY_CHARS} limit`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
}

function main(): void {
  const entry = buildEntry();
  assertValidEntry(entry);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
}

main();
