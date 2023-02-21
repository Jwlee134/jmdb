import { Outlet } from "react-router-dom";
import { useCallback, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import useBoundStore from "./store";
import { shallow } from "zustand/shallow";

export default function App() {
  const { setCountryInfo, theme, setTheme, isSystemDefault } = useBoundStore(
    (state) => ({
      setCountryInfo: state.setCountryInfo,
      theme: state.theme,
      setTheme: state.setTheme,
      isSystemDefault: state.isSystemDefault,
    }),
    shallow
  );

  useEffect(() => {
    axios.get("https://ipapi.co/json/").then(({ data }) => {
      setCountryInfo(data.country_code, data.country_name);
    });
  }, [setCountryInfo]);

  const setClassList = useCallback(
    (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add("dark");
        document
          .querySelector('meta[name="theme-color"]')!
          .setAttribute("content", "#0a1419");
        setTheme("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document
          .querySelector('meta[name="theme-color"]')!
          .setAttribute("content", "#ffffff");
        setTheme("light");
      }
    },
    [setTheme]
  );

  const callback = useCallback(
    (e: MediaQueryListEvent) => {
      setClassList(e.matches);
    },
    [setClassList]
  );

  useLayoutEffect(() => {
    const e = window.matchMedia("(prefers-color-scheme: dark)");
    if (isSystemDefault) {
      // system default로 변경했는데 현재 system은 dark고 변경전은 light였다면 sync 맞추기 위해
      setClassList(window.matchMedia("(prefers-color-scheme: dark)").matches);
      e.addEventListener("change", callback);
    } else {
      e.removeEventListener("change", callback);
      setClassList(theme === "dark");
    }
  }, [theme, isSystemDefault, callback, setClassList]);

  return (
    <main className="max-w-screen-lg min-h-screen mx-auto relative">
      <Outlet />
      <div id="modal" className="max-w-[inherit]" />
    </main>
  );
}
