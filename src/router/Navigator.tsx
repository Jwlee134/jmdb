import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import TabBar from "../components/TabBar";

export default function Navigator() {
  return (
    <Fragment>
      <div className="pb-20 max-w-[inherit]">
        <Outlet />
      </div>
      <TabBar />
    </Fragment>
  );
}
