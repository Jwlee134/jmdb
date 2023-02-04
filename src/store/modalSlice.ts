import { StateCreator } from "zustand";
import { Store } from ".";

export interface IModalSlice {
  isVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  totalResults: number;
  query: string;
  setTotalResults: (v: number) => void;
  setQuery: (s: string) => void;
}

const createModalSlice: StateCreator<
  Store,
  [["zustand/devtools", never]],
  [],
  IModalSlice
> = (set) => ({
  isVisible: false,
  totalResults: 0,
  query: "",
  openModal() {
    return set(() => ({ isVisible: true }));
  },
  closeModal() {
    return set(() => ({ isVisible: false }));
  },
  setTotalResults(v) {
    return set(() => ({ totalResults: v }));
  },
  setQuery(s) {
    return set(() => ({ query: s }));
  },
});

export default createModalSlice;
