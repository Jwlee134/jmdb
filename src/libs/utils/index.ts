import { IMovie } from "../api/types";

export function cls(...args: string[]) {
  return args.join(" ");
}

export function makeImgPath(url?: string, resolution?: number) {
  return url
    ? `https://image.tmdb.org/t/p/w${resolution || 500}${url}`
    : "https://picsum.photos/id/433/200/300";
}

export interface Placeholder {
  id: number;
}

export function placeholders(l = 3): Placeholder[] {
  return Array.from({ length: l }, (_, i) => ({ id: i }));
}

export function isMovie(data: IMovie | Placeholder): data is IMovie {
  return (data as IMovie).adult !== undefined;
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
