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
    const width = Number(sizes.w) > 1920 ? 1920 : sizes.w;
    const height = Number(sizes.h) > 1440 ? 1440 : sizes.h;

    console.log(`origin: ${sizes.w}x${sizes.h}`)
    console.log(`resize: ${width}x${height}`)

    if (width || height) {
      resize = `${width}x${height}`;
    }
    if (focus) {
      resize += `/filters:focal(${focus})`;
    }
  }
  return !!resize ? `${filename}/m/${resize}` : filename ?? undefined;
}