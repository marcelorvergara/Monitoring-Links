import Link from "next/link";
import { useState } from "react";
import { ISession } from "../pages";

interface IUser {
  userInfo?: ISession;
}

export default function Header(props: IUser) {
  const { userInfo } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleClasses =
    "w-full flex-grow lg:items-center lg:w-auto lg:block pt-6 lg:pt-0";
  function handleMenu() {
    setIsOpen((current) => !current);
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-blue-400 p-6 fixed w-full z-10 top-0">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link
            className="text-white no-underline hover:text-white hover:no-underline"
            href="/">
            <span className="text-2xl pl-2">Monitoring Links</span>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={handleMenu}
            id="nav-toggle"
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={isOpen ? `${toggleClasses}` : `hidden ${toggleClasses}`}
          id="nav-content">
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            {/* <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline"
                href="#">
                Active
              </a>
            </li> */}
            <li className="mr-3">
              {typeof userInfo === "undefined" && (
                <a
                  href={process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/facebook"}
                  className="flex items-center justify-center w-full px-4 py-2 mt-2 space-x-3 text-sm text-center bg-blue-500 text-white transition-colors duration-200 transform border rounded-lg dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  <span className="text-sm text-white dark:text-gray-200">
                    Sign In with Facebook
                  </span>
                </a>
              )}
              {typeof userInfo !== "undefined" && (
                <a
                  href={
                    process.env.NEXT_PUBLIC_BACKEND_SRV +
                    "/auth/facebook/logout"
                  }
                  className="flex items-center justify-center w-full px-4 py-2 mt-2 space-x-3 text-sm text-center bg-blue-500 text-white transition-colors duration-200 transform border rounded-lg dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  <span className="text-sm text-white dark:text-gray-200">
                    Sign Off - {userInfo.name}
                  </span>
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <div className="container shadow-lg mx-auto bg-white mt-24 md:mt-18"></div>
    </>
  );
}
