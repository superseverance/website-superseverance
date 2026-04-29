type Palette = Record<number, string>;

const normalizeHex = (hex?: string): string | null => {
  if (!hex || typeof hex !== "string") return null;

  let clean = hex.trim().replace("#", "");

  // supporto shorthand #fff
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map(c => c + c)
      .join("");
  }

  if (clean.length !== 6) return null;

  return clean;
};

const hexToRgb = (hex?: string) => {
  const clean = normalizeHex(hex);
  if (!clean) throw new Error(`Invalid HEX color: ${hex}`);

  const num = parseInt(clean, 16);

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

const rgbToHex = (r: number, g: number, b: number) =>
  "#" +
  [r, g, b]
    .map(v => Math.round(v).toString(16).padStart(2, "0"))
    .join("");

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function generatePalette(
  startHex?: string,
  endHex?: string
): Palette {
  if (!startHex || !endHex) {
    console.warn("generatePalette: missing colors", { startHex, endHex });
    return {};
  }

  const start = hexToRgb(startHex);
  const end = hexToRgb(endHex);

  const palette: Palette = {};

  for (let i = 0; i < 18; i++) {
    const step = 50 + i * 50;
    const t = i / 17;

    palette[step] = rgbToHex(
      lerp(start.r, end.r, t),
      lerp(start.g, end.g, t),
      lerp(start.b, end.b, t)
    );
  }

  return palette;
}
