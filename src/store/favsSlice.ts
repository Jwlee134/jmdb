import { Slice } from ".";

export interface IFavsSlice {
  favs: number[];
  toggleFav: (id: number) => void;
  isFav: (id: number) => boolean;
}

const createFavsSlice: Slice<IFavsSlice> = (set, get) => ({
  favs: [],
  toggleFav(id) {
    return set((state) => {
      const i = state.favs.findIndex((favId) => favId === id);
      if (i === -1) state.favs.push(id);
      else state.favs.splice(i, 1);
    });
  },
  isFav(id) {
    return get().favs.some((favId) => favId === id);
  },
});

export default createFavsSlice;
