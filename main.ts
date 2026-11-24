import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Real-Life Patch Notes: The Comedy
// Changelog" bounty. The program writes a single line to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): a software patch
// note for a bug in human biology, in the terse register of a real
// release note — version number, engineering voice, a fix stated
// as if it shipped.
// Pass 2 (final): the lost sneeze. Pass 1's doorway bug was
// recognisable but its joke was a situation; this one has a real
// comedic mechanism — a bodily process described in software
// terms, loading to 99% and then cancelling without an error
// message, leaving the face frozen mid-scrunch in public. Every
// reader has lived the exact frame it freezes on, which is the
// wince the brief asks for, and the note stays dry about it.
// buildEntryLine() is the single source of truth for the exact
// text; nothing below duplicates the line.
const NOTE_BEATS = [
  "v31.4.2: fixed a bug where sneezes cancelled at 99% loaded,",
  "leaving the face stuck in the pre-sneeze scrunch.",
] as const;

export function buildEntryLine(): string {
  return NOTE_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 160;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
