import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import LatestResults from "../components/LatestResults";
import LinkMonitorData from "../components/LinkMonitorData";
import Logout from "../components/Logout";
import MainDefault from "../components/MainDefault";
import Manage from "../components/Manage";

export interface Data {
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}

export interface Picture {
  data: Data;
}

export interface ISession {
  _id: string;
  id: string;
  name: string;
  picture: Picture;
}

const Home: NextPage = () => {
  const [userInfo, setUserInfo] = useState<ISession | undefined>();
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "applictacion/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        setUserInfo(responseJson.user);
      })
      .catch((error) => {
        setUserInfo(undefined);
      });
  }, []);

  // menu
  const [open, setOpen] = useState(false);
  const menus = [
    {
      title: "New Monitor",
      src: "/static/images/newmonitor.svg",
      path: "/",
      gap: false,
    },
    {
      title: "Latest Results",
      src: "/static/images/latestresults.svg",
      path: "/",
      gap: false,
    },
    {
      title: "Manage",
      src: "/static/images/manage.svg",
      path: "/",
      gap: false,
    },
    {
      title: "Logout",
      src: "/static/images/logout.svg",
      path: process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/facebook/logout",
      gap: true,
    },
  ];

  const [component, setComponent] = useState<string>();
  function switchComonent() {
    switch (component) {
      case "Home":
        return <MainDefault />;
      case "Latest Results":
        return <LatestResults userInfo={userInfo!} />;
      case "New Monitor":
        return <LinkMonitorData userInfo={userInfo!} />;
      case "Manage":
        return <Manage userInfo={userInfo!} />;
      case "Logout":
        return <Logout />;
      default:
        return <MainDefault />;
    }
  }
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-40" : "w-16"
        } duration-300 h-screen p-2 pt-2 bg-blue-400 relative`}>
        <img
          onClick={() => setOpen(!open)}
          src="/static/images/menu_open.svg"
          alt="menu button"
          className={`bg-slate-300 absolute cursor-pointer rounded-md -right-3 top-20 w-7 border-2 border-slate-600 ${
            !open && "rotate-180"
          }`}
        />
        <div className="flex flex-col gap-x-3 items-start">
          <img
            onClick={() => setComponent("Home")}
            src="/static/images/logo.svg"
            alt="logo"
            className={`cursor-pointer duration-500 w-12 h-12 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xs duration-300 -mr-20 ${
              !open && "scale-0"
            }`}>
            Monitoring Links
          </h1>
        </div>
        <ul className="pt-10">
          <li
            className={`text-white  text-xs flex items-center gap-x-2 cursor-pointer p-1 md:hover:bg-slate-500 rounded-md`}>
            {!!userInfo ? (
              <div className="flex items-center gap-x-2 cursor-pointer p-1">
                <img
                  className="w-8 h-8 rounded"
                  src={`${
                    !!userInfo
                      ? userInfo.picture.data.url
                      : "/static/images/login.svg"
                  }`}
                  alt="User Info"
                />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}>
                  {userInfo.name}
                </span>
              </div>
            ) : (
              <Link
                className="flex items-center gap-x-2 cursor-pointer pr-1"
                href={process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/facebook"}>
                <img
                  className="w-8 h-8"
                  src="/static/images/login.svg"
                  alt="Face Book Login"
                />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-left`}>
                  FB Login
                </span>
              </Link>
            )}
          </li>
          {userInfo &&
            menus.map((menu, idx) => (
              <li
                key={idx}
                className={`text-white  text-xs flex items-center gap-x-2 cursor-pointer p-1  rounded-md ${
                  menu.gap ? "mt-8" : "mt-1"
                } ${component === menu.title ? "bg-slate-500" : ""}`}>
                <button
                  onClick={() => setComponent(menu.title)}
                  role="div"
                  className="flex gap-x-2 items-center">
                  <img className="w-8 h-8" src={menu.src} alt={menu.title} />
                  <span
                    className={`${
                      !open && "hidden"
                    } origin-left duration-200 text-left`}>
                    {menu.title}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="pt-6 text-2xl font-semibold flex-1 h-screen bg-slate-200">
        {switchComonent()}
      </div>
    </div>
  );
};

export default Home;
