import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import TabBar from "./components/common/TabBar";

export default function Navigator() {
  return (
    <Fragment>
      <div className="pb-20">
        <Outlet />
      </div>
      <TabBar />
    </Fragment>
  );
}
