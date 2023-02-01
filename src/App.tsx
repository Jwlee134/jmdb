import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <main className="max-w-7xl min-h-screen mx-auto bg-black text-gray-200 relative">
      <Outlet />
    </main>
  );
}
