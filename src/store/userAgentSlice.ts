import { Slice } from ".";

export interface IUserAgentSlice {
  countryCode: string;
  countryName: string;
  setCountryInfo: (code: string, name: string) => void;
}

const createUserAgentSlice: Slice<IUserAgentSlice> = (set) => ({
  countryCode: "",
  countryName: "",
  setCountryInfo: (code, name) =>
    set(() => ({ countryCode: code, countryName: name })),
});

export default createUserAgentSlice;
