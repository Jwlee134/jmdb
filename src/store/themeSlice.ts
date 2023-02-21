import { Slice } from ".";

export type Theme = "dark" | "light";

export type Lng = "ko-KR" | "en-US";

export interface IThemeSlice {
  theme: Theme;
  isSystemDefault: boolean;
  lng: Lng;
  setTheme: (theme: Theme) => void;
  setIsSystemDefault: (v: boolean) => void;
  setLng: (v: Lng) => void;
}

const createThemeSlice: Slice<IThemeSlice> = (set) => ({
  theme: "light",
  isSystemDefault: true,
  lng: "ko-KR",
  setTheme(v) {
    return set(() => ({ theme: v }));
  },
  setIsSystemDefault(v) {
    return set(() => ({ isSystemDefault: v }));
  },
  setLng(v) {
    return set(() => ({ lng: v }));
  },
});

export default createThemeSlice;
