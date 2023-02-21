import { Slice } from ".";

export type Theme = "dark" | "light";

export interface IThemeSlice {
  theme: Theme;
  isSystemDefault: boolean;
  setTheme: (theme: Theme) => void;
  setIsSystemDefault: (v: boolean) => void;
}

const createThemeSlice: Slice<IThemeSlice> = (set) => ({
  theme: "light",
  isSystemDefault: true,
  setTheme(v) {
    return set(() => ({ theme: v }));
  },
  setIsSystemDefault(v) {
    return set(() => ({ isSystemDefault: v }));
  },
});

export default createThemeSlice;
