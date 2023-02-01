import { IMovie } from "../api/types";

export function cls(...args: string[]) {
  return args.join(" ");
}

export function makeImgPath(url?: string) {
  return url
    ? `https://image.tmdb.org/t/p/w500${url}`
    : "https://picsum.photos/id/237/200/300";
}

export function placeholders(l = 3) {
  return Array.from({ length: l }, (_, i) => ({ id: i }));
}

export interface Placeholder {
  id: number;
}

export function isMovie(data: IMovie | Placeholder): data is IMovie {
  return (data as IMovie).adult !== undefined;
}
