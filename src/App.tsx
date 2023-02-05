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
    <main className="max-w-7xl min-h-screen mx-auto bg-black text-gray-200 relative">
      <Outlet />
      <div id="modal" />
    </main>
  );
}
