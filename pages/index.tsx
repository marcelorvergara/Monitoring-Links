import type { NextPage } from "next";
import { useEffect, useState } from "react";
import HowTo from "../components/HowTo";
import LatestResults from "../components/LatestResults";
import LinkMonitorData from "../components/NewMonitor";
import Login from "../components/Login";
import Logout from "../components/Logout";
import MainDefault from "../components/MainDefault";
import Manage from "../components/Manage";
import Statistics from "../components/Statistics";

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
  const [totUrls, setTotUrls] = useState<number>(0);
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
        setTotUrls(responseJson.totUrls);
        setUserInfo(responseJson.user);
      })
      .catch(() => {
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
        if (response.status === 200) return response.json();
        throw new Error("Failed to authenticate user");
      })
      .then((responseJson) => {
        setComponent("Logout");
        setTimeout(() => {
          window.open("/", "_self");
        }, 500);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // menu
  const [open, setOpen] = useState(false);
  const menus = [
    {
      title: "New Monitor",
      src: "/static/images/newmonitor.svg",
      path: "/",
      gap: true,
    },
    {
      title: "Latest Results",
      src: "/static/images/latestresults.svg",
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

  const [component, setComponent] = useState<string>("");
  function switchComonent() {
    switch (component) {
      case "Home":
        return <MainDefault userInfo={userInfo} totUrls={totUrls} />;
      case "Login":
        return <Login />;
      case "Latest Results":
        return (
          <LatestResults
            userInfo={userInfo!}
            switchComonent={switchComonent}
            setComponent={setComponent}
          />
        );
      case "New Monitor":
        return (
          <LinkMonitorData
            userInfo={userInfo!}
            switchComonent={switchComonent}
            setComponent={setComponent}
            setTotUrls={setTotUrls}
          />
        );
      case "Manage":
        return (
          <Manage
            userInfo={userInfo!}
            switchComonent={switchComonent}
            setComponent={setComponent}
            setTotUrls={setTotUrls}
            open={open}
          />
        );
      case "HowTo":
        return <HowTo />;
      case "Logout":
        return <Logout />;
      case "Statistics":
        return (
          <Statistics
            userInfo={userInfo!}
            switchComonent={switchComonent}
            setComponent={setComponent}
            open={open} // resize charts
          />
        );

      default:
        return <MainDefault userInfo={userInfo} totUrls={totUrls} />;
    }
  }
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-40" : "w-16"
        } duration-300 h-screen p-2 pt-2 bg-[#181B20] relative`}>
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
            className={`text-white  text-xs flex items-center gap-x-2 cursor-pointer pl-0.5 rounded-sm`}>
            {!!userInfo ? (
              <div className="flex items-center gap-x-2 cursor-pointer p-1 w-full">
                <img
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-sm"
                  src={`${
                    !!userInfo.picture
                      ? "https://graph.facebook.com/" + userInfo.id + "/picture"
                      : !!userInfo.photos[0]
                      ? userInfo.photos[0].value
                      : "/static/images/login.svg"
                  }`}
                  alt="User Info"
                />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-300 truncate`}>
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
                className={`text-white text-xs cursor-pointer p-1 md:hover:bg-slate-500 rounded-sm ${
                  menu.gap ? "mt-3 border-t-2 rounded-sm" : "mt-1"
                } ${component === menu.title ? "bg-slate-500" : ""} 
                  ${
                    totUrls > 0
                      ? "visible"
                      : menu.title === "HowTo" || menu.title === "New Monitor"
                      ? "visible"
                      : "invisible"
                  }`}>
                <button
                  onClick={() => setComponent(menu.title)}
                  className="flex gap-x-2 items-center justify-start w-full">
                  <img className="w-8 h-8" src={menu.src} alt={menu.title} />
                  <span
                    className={`${
                      !open && "hidden"
                    } origin-left duration-300 text-left truncate`}>
                    {menu.title}
                  </span>
                </button>
              </li>
            ))}
          {/* logout */}
          {userInfo && (
            <li
              className={`text-white text-xs flex items-center gap-x-2 cursor-pointer p-1 md:hover:bg-slate-500 rounded-sm`}>
              <button
                className="flex items-center gap-x-2 cursor-pointer pr-1 w-full"
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
