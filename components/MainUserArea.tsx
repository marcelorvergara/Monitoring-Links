import { useState } from "react";
import { ISession } from "../pages";
import Dashboard from "./Dashboard";
import LinkMonitorData from "./LinkMonitorData";

interface IMainUserAreaProps {
  userInfo: ISession;
}

export default function MainUserArea(props: IMainUserAreaProps) {
  const activeBtn = "border-blue-500  bg-blue-500 hover:bg-blue-700 text-white";
  const notActiveBtn =
    " border-white  hover:border-gray-200 text-blue-500 hover:bg-gray-200 ";
  const [display, setDisplay] = useState<"dashboard" | "newMonitor">(
    "dashboard"
  );
  function toggleDisplay(display: "dashboard" | "newMonitor") {
    setDisplay(display);
  }

  return (
    <main className="flex w-full flex-1 flex-col items-start justify-start px-6 text-center">
      <ul className="flex justify-between">
        <li className="mr-3">
          <a
            onClick={() => toggleDisplay("dashboard")}
            className={
              display === "dashboard"
                ? `inline-block border rounded py-2 px-4 ${activeBtn}`
                : `inline-block border rounded py-2 px-4 ${notActiveBtn}`
            }
            href="#">
            Dashboard
          </a>
        </li>
        <li className="mr-3">
          <a
            onClick={() => toggleDisplay("newMonitor")}
            className={
              display === "newMonitor"
                ? `inline-block border rounded py-2 px-4 ${activeBtn}`
                : `inline-block border rounded py-2 px-4 ${notActiveBtn}`
            }
            href="#">
            New Monitor
          </a>
        </li>
      </ul>
      {display === "newMonitor" && (
        <LinkMonitorData userInfo={props.userInfo} />
      )}
      {display === "dashboard" && <Dashboard userInfo={props.userInfo} />}
    </main>
  );
}
