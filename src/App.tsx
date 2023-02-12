import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import useBoundStore from "./store";

export default function App() {
  const setCountryInfo = useBoundStore((state) => state.setCountryInfo);

  useEffect(() => {
    axios.get("https://ipapi.co/json/").then(({ data }) => {
      setCountryInfo(data.country_code, data.country_name);
    });
  }, [setCountryInfo]);

  return (
    <main className="max-w-screen-sm min-h-screen mx-auto relative">
      <Outlet />
      <div id="modal" className="max-w-[inherit]" />
    </main>
  );
}
