import useBoundStore from "../../store";

export function cls(...args: string[]) {
  return args.join(" ");
}

/**
 * @param resolution
 * backdrop: 300, 780, 1280, original
 *
 * logo : 45, 92, 154, 185, 300, 500, original
 *
 * poster: 92, 154, 185, 342, 500, 780, original
 *
 * profile: 45, 185, original
 */
export function makeImgPath(url?: string, resolution?: number | string) {
  if (url?.includes("gravatar")) return url.slice(1);
  if (url?.includes("https")) return url;
  return url
    ? `https://image.tmdb.org/t/p/w${resolution || 500}${url}`
    : "https://picsum.photos/id/237/200/300";
}

export interface Placeholder {
  id: number;
  bullShit: number;
}

/**
 *
 * @param l How many placeholders will be shown. 5 by default.
 * @returns Array of placeholders
 */
export function placeholders(l = 5): Placeholder[] {
  return Array.from({ length: l }, (_, i) => ({ id: i, bullShit: i }));
}

export function isPlaceholder<T>(data: T | Placeholder): data is Placeholder {
  return (data as Placeholder).bullShit !== undefined;
}

export function formatRuntime(n: number) {
  const lng = useBoundStore.getState().lng;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return `${h ? `${h}${lng === "en-US" ? "h" : "시간"} ` : ""}${m
    .toString()
    .padStart(2, "0")}${lng === "en-US" ? "m" : "분"}`;
}

type RelativeTimeFormat =
  | "year"
  | "years"
  | "quarter"
  | "quarters"
  | "month"
  | "months"
  | "week"
  | "weeks"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds";

export function formatCreatedAt(createdAt: string) {
  const arr: [RelativeTimeFormat, number][] = [
    ["minute", 60],
    ["hour", 3600],
    ["day", 86400],
    ["month", 2592000],
    ["year", 31536000],
  ];
  const now = Date.now();
  const created = new Date(createdAt).getTime();
  const diff = Math.floor((now - created) / 1000);
  const formatter = new Intl.RelativeTimeFormat(useBoundStore.getState().lng, {
    numeric: "auto",
  });

  if (diff < arr[0][1]) return formatter.format(-diff, "second");
  for (let i = 0; i < arr.length - 1; i++)
    if (diff < arr[i + 1][1])
      return formatter.format(-Math.floor(diff / arr[i][1]), arr[i][0]);
  return formatter.format(-Math.floor(diff / arr[4][1]), arr[4][0]);
}
