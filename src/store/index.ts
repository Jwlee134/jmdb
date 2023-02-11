import { create, StateCreator } from "zustand";
import createModalSlice, { IModalSlice } from "./modalSlice";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createUserAgentSlice, { IUserAgentSlice } from "./userAgentSlice";
import createCacheSlice, { ICacheSlice } from "./cacheSlice";

export type Store = IModalSlice & IUserAgentSlice & ICacheSlice;

export type Slice<T> = StateCreator<
  Store,
  [["zustand/immer", never], ["zustand/devtools", never]],
  [],
  T
>;

const useBoundStore = create<Store>()(
  immer(
    devtools((...a) => ({
      ...createModalSlice(...a),
      ...createUserAgentSlice(...a),
      ...createCacheSlice(...a),
    }))
  )
);

export default useBoundStore;
