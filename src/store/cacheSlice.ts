import { Slice } from ".";
import { DeepPartial } from "../libs/utils/types";

interface NormalCache {
  discover: number;
  nowPlaying: number;
  upcoming: number;
  topRated: number;
  trendingMovies: number;
  trendingPeople: number;
}

interface DetailCache {
  casts: number;
  similarMovies: number;
  movieCredits: number;
}

interface Cache extends NormalCache {
  detail: ({ id: number } & DetailCache)[];
}

export type CacheKey = keyof (NormalCache & DetailCache);

export interface ICacheSlice {
  cache: DeepPartial<Cache>;
  setCache: (key: CacheKey, index: number, id?: number) => void;
  getCache: (key: CacheKey, id?: number) => number;
}

const createCacheSlice: Slice<ICacheSlice> = (set, get) => ({
  cache: {},
  setCache(key, index, id) {
    if (id) {
      return set(({ cache }) => {
        if (!Object.hasOwn(cache, "detail")) {
          cache["detail"] = [{ id, [key as keyof DetailCache]: index }];
        } else {
          if ((cache["detail"]!.length as number) === 20)
            cache["detail"]!.shift();
          if (cache["detail"]!.some((item) => item?.id === id)) {
            const i = cache["detail"]!.findIndex((item) => item?.id === id);
            cache["detail"]![i]![key as keyof DetailCache] = index;
          } else {
            cache["detail"]!.push({ id, [key as keyof DetailCache]: index });
          }
        }
      });
    }
    return set(({ cache }) => {
      cache[key as keyof NormalCache] = index as number;
    });
  },
  getCache(key, id) {
    if (id) {
      return (
        get().cache["detail"]?.find((item) => item?.id === id)?.[
          key as keyof DetailCache
        ] || 0
      );
    }
    return get().cache?.[key as keyof NormalCache] || 0;
  },
});

export default createCacheSlice;
