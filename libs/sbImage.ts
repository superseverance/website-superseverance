// https://a.storyblok.com/f/288126534695537/4400x2750/aa485a1a15/shutterstock_2590548009.jpg

interface ResizedImage {
  filename: string | null;
  focus: string | null;
}

export default function getResizedImage({ filename, focus }: ResizedImage) {
  if (!filename) return "";
  const regex = /\/(\d+)x(\d+)\//;
  const match = filename?.match(regex);
  let resize: string | null = null;

  if (match) {
    const width = Number(match[1]) > 1920 ? 1920 : 0;
    const height = Number(match[2]) > 1440 ? 1440 : 0;
    if (width || height) {
      resize = `${width}x${height}`;
    }
    if (focus) {
      resize += `/filters:focal(${focus})`;
    }
  }
  return !!resize ? `${filename}/m/${resize}` : filename;
}
