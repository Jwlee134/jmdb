import { create } from "zustand";
import createModalSlice, { IModalSlice } from "./modalSlice";
import { devtools } from "zustand/middleware";
import createUserAgentSlice, { UserAgentSlice } from "./userAgentSlice";

export type Store = IModalSlice & UserAgentSlice;

const useBoundStore = create<Store>()(
  devtools((...a) => ({
    ...createModalSlice(...a),
    ...createUserAgentSlice(...a),
  }))
);

export default useBoundStore;
