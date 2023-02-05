export function cls(...args: string[]) {
  return args.join(" ");
}

export function makeImgPath(url?: string, resolution?: number) {
  return url
    ? `https://image.tmdb.org/t/p/w${resolution || 500}${url}`
    : "https://picsum.photos/id/237/200/300";
}

/* "backdrop_sizes": [
  "w300",
  "w780",
  "w1280",
  "original"
],
"logo_sizes": [
  "w45",
  "w92",
  "w154",
  "w185",
  "w300",
  "w500",
  "original"
],
"poster_sizes": [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
],
"profile_sizes": [
  "w45",
  "w185",
  "h632",
  "original"
], */

export interface Placeholder {
  id: number;
  bullShit: number;
}

export function placeholders(l = 3): Placeholder[] {
  return Array.from({ length: l }, (_, i) => ({ id: i, bullShit: i }));
}

export function isPlaceholder<T>(data: T | Placeholder): data is Placeholder {
  return (data as Placeholder).bullShit !== undefined;
}
