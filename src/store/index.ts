import { create, StateCreator } from "zustand";
import createModalSlice, { IModalSlice } from "./modalSlice";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createUserAgentSlice, { IUserAgentSlice } from "./userAgentSlice";
import createCacheSlice, { ICacheSlice } from "./cacheSlice";
import createFavsSlice, { IFavsSlice } from "./favsSlice";
import createThemeSlice, { IThemeSlice } from "./themeSlice";

export type Store = IModalSlice &
  IUserAgentSlice &
  ICacheSlice &
  IFavsSlice &
  IThemeSlice;

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
        ...createThemeSlice(...a),
      }))
    ),
    {
      name: "jmdb-storage",
      partialize: (state) => ({
        favs: state.favs,
        theme: state.theme,
        isSystemDefault: state.isSystemDefault,
        lng: state.lng,
      }),
    }
  )
);

export default useBoundStore;
