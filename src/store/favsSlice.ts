import { Slice } from ".";

interface Fav {
  id: number;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  title: string;
  release_date: string;
}

export interface IFavsSlice {
  favs: Fav[];
  toggleFav: (id: number, data?: Omit<Fav, "id">) => void;
  isFav: (id: number) => boolean;
}

const createFavsSlice: Slice<IFavsSlice> = (set, get) => ({
  favs: [],
  toggleFav(id, data) {
    return set((state) => {
      const i = state.favs.findIndex((fav) => fav.id === id);
      if (i === -1 && data) state.favs.push({ id, ...data });
      else state.favs.splice(i, 1);
    });
  },
  isFav(id) {
    return get().favs.some((fav) => fav.id === id);
  },
});

export default createFavsSlice;
