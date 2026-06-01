// https://a.storyblok.com/f/288126534695537/4400x2750/aa485a1a15/shutterstock_2590548009.jpg

interface SizesImage {
  filename: string | null;
}

export function getAspectRatio({ filename }: SizesImage): string | null {
  const sizes = getSizesImage({ filename })
  if (!sizes) return null
  return `${sizes.w}/${sizes.h}`
}

export function getSizesImage({ filename }: SizesImage): { w: number, h: number } | null {
  if (!filename) return null;
  const regex = /\/(\d+)x(\d+)\//;
  const match = filename?.match(regex);
  return match ? { w: Number(match[1]), h: Number(match[2]) } : null
}

interface ResizedImage {
  filename: string | null;
  focus: string | null;
}

export function getResizedImage({ filename, focus }: ResizedImage): string | undefined {
  const sizes = getSizesImage({ filename })

  let resize: string | null = null;

  if (sizes) {
    const MAX_W = 1920;
    const MAX_H = 1440;
    const ratio = sizes.w / sizes.h;

    let width = sizes.w;
    let height = sizes.h;

    if (width > MAX_W) {
      width = MAX_W;
      height = Math.round(MAX_W / ratio);
    }

    if (height > MAX_H) {
      height = MAX_H;
      width = Math.round(MAX_H * ratio);
    }

    resize = `${width}x${height}`;

    if (focus) {
      resize += `/filters:focal(${focus})`;
    }
  }

  return !!resize ? `${filename}/m/${resize}` : filename ?? undefined;
}