import { create, StateCreator } from "zustand";
import createModalSlice, { IModalSlice } from "./modalSlice";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createUserAgentSlice, { IUserAgentSlice } from "./userAgentSlice";
import createCacheSlice, { ICacheSlice } from "./cacheSlice";
import createFavsSlice, { IFavsSlice } from "./favsSlice";

export type Store = IModalSlice & IUserAgentSlice & ICacheSlice & IFavsSlice;

export type Slice<T> = StateCreator<
  Store,
  [
    ["zustand/persist", unknown],
    ["zustand/immer", never],
    ["zustand/devtools", never]
  ],
  [],
  T
>;

const useBoundStore = create<Store>()(
  persist(
    immer(
      devtools((...a) => ({
        ...createModalSlice(...a),
        ...createUserAgentSlice(...a),
        ...createCacheSlice(...a),
        ...createFavsSlice(...a),
      }))
    ),
    {
      name: "jmdb-storage",
      partialize: (state) => ({ favs: state.favs }),
    }
  )
);

export default useBoundStore;
