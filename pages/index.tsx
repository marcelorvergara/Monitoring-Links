import type { NextPage } from "next";
import { useEffect, useState } from "react";
import HowTo from "../components/HowTo";
import LatestResults from "../components/LatestResults";
import LinkMonitorData from "../components/LinkMonitorData";
import Login from "../components/Login";
import Logout from "../components/Logout";
import MainDefault from "../components/MainDefault";
import Manage from "../components/Manage";
import Statistics from "../components/Statistics";
import Table from "../components/Table";

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
  displayName: string;
  _id: string;
  id: string;
  name: string;
  picture?: Picture; // facebook
  photos?: any; // google
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

  function logoutUser(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "applictacion/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) return response.json();
        throw new Error("Failed to authenticate user");
      })
      .then((responseJson) => {
        setComponent("Logout");
        setTimeout(() => {
          window.open("/", "_self");
        }, 2500);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      title: "Table",
      src: "/static/images/table.svg",
      path: "/",
      gap: false,
    },
    {
      title: "Statistics",
      src: "/static/images/statistics.svg",
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
      title: "HowTo",
      src: "/static/images/howto.svg",
      path: "/",
      gap: true,
    },
  ];

  const [component, setComponent] = useState<string>();
  function switchComonent() {
    switch (component) {
      case "Home":
        return <MainDefault />;
      case "Login":
        return <Login />;
      case "Latest Results":
        return <LatestResults userInfo={userInfo!} />;
      case "New Monitor":
        return <LinkMonitorData userInfo={userInfo!} />;
      case "Manage":
        return <Manage userInfo={userInfo!} />;
      case "HowTo":
        return <HowTo />;
      case "Logout":
        return <Logout />;
      case "Table":
        return <Table userInfo={userInfo!} />;
      case "Statistics":
        return <Statistics userInfo={userInfo!} />;

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
          className={`bg-slate-300 absolute cursor-pointer rounded-sm -right-3 top-20 w-7 border-2 border-slate-600 ${
            !open && "rotate-180"
          }`}
        />
        {/* home */}
        <div className="flex flex-col gap-x-3 items-center">
          <img
            onClick={() => setComponent("Home")}
            src="/static/images/logo.svg"
            alt="logo"
            className={`cursor-pointer duration-500 w-12 h-12 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white font-bold origin-left text-xs duration-300 mt-2 ${
              !open && "scale-0"
            }`}>
            Monitoring Links
          </h1>
        </div>
        <ul className="pt-10">
          {/* login */}
          <li
            className={`text-white  text-xs flex items-center gap-x-2 cursor-pointer pl-0.5 md:hover:bg-slate-500 rounded-sm`}>
            {!!userInfo ? (
              <div className="flex items-center gap-x-2 cursor-pointer p-1">
                <img
                  className="w-8 h-8 rounded-sm"
                  src={`${
                    !!userInfo.picture
                      ? userInfo.picture.data.url
                      : !!userInfo.photos[0]
                      ? userInfo.photos[0].value
                      : "/static/images/login.svg"
                  }`}
                  alt="User Info"
                />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}>
                  {`${
                    !!userInfo.displayName
                      ? userInfo.displayName
                      : userInfo.name
                  }`}
                </span>
              </div>
            ) : (
              <button
                className="flex items-center gap-x-2 cursor-pointer pr-1"
                onClick={() => setComponent("Login")}>
                <img
                  className="w-8 h-8"
                  src="/static/images/login.svg"
                  alt="Login facebook or google"
                />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-left`}>
                  Login
                </span>
              </button>
            )}
          </li>
          {/* menus */}
          {userInfo &&
            menus.map((menu, idx) => (
              <li
                key={idx}
                className={`text-white  text-xs flex items-center gap-x-2 cursor-pointer p-1  rounded-sm ${
                  menu.gap ? "mt-3 border-t-2 rounded-sm" : "mt-1"
                } ${component === menu.title ? "bg-slate-500" : ""}`}>
                <button
                  onClick={() => setComponent(menu.title)}
                  className="flex gap-x-2 items-center justify-center">
                  <img className="w-8 h-8" src={menu.src} alt={menu.title} />
                  <span
                    className={`${
                      !open && "hidden"
                    } origin-left duration-300 text-left`}>
                    {menu.title}
                  </span>
                </button>
              </li>
            ))}
          {/* logout */}
          {userInfo && (
            <li
              className={`text-white  text-xs flex items-center gap-x-2 cursor-pointer p-1 md:hover:bg-slate-500 rounded-sm`}>
              <button
                className="flex items-center gap-x-2 cursor-pointer pr-1"
                onClick={logoutUser}>
                <img
                  className="w-8 h-8"
                  src="/static/images/logout.svg"
                  alt="Face Book Login"
                />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-300 text-left`}>
                  Logout
                </span>
              </button>
            </li>
          )}
        </ul>
      </div>
      <div className="text-2xl font-semibold flex-1 h-screen bg-slate-200">
        {switchComonent()}
      </div>
    </div>
  );
};

export default Home;
