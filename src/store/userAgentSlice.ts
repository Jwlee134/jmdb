import { StateCreator } from "zustand";
import { Store } from ".";

export interface UserAgentSlice {
  countryCode: string;
  countryName: string;
  setCountryInfo: (code: string, name: string) => void;
}

const createUserAgentSlice: StateCreator<
  Store,
  [["zustand/devtools", never]],
  [],
  UserAgentSlice
> = (set) => ({
  countryCode: "",
  countryName: "",
  setCountryInfo: (code, name) =>
    set(() => ({ countryCode: code, countryName: name })),
});

export default createUserAgentSlice;
