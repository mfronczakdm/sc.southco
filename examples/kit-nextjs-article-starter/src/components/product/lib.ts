export function splitLines(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseSpecs(value: string | undefined): Array<[string, string]> {
  return splitLines(value)
    .map<[string, string] | null>((line) => {
      const idx = line.indexOf(':');
      if (idx === -1) return null;
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      if (!key || !val) return null;
      return [key, val];
    })
    .filter((entry): entry is [string, string] => entry !== null);
}

export function splitBreadcrumb(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split('>')
    .map((s) => s.trim())
    .filter(Boolean);
}
