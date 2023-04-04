import Link from "next/link";
import { ISession } from "../pages";
import Table from "./Table";

interface IMainDefaultProps {
  userInfo?: ISession;
  totUrls?: number;
  open: boolean;
}

export default function MainDefault(props: IMainDefaultProps) {
  return (
    <main className="flex flex-col items-center justify-center text-center mt-2">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-600">
        Welcome to <br />
        <span className="text-slate-800">Monitoring Links</span>
      </h1>
      {!props.userInfo ? (
        <>
          <h2 className="text-sm mt-2 mb-2 font-body mx-2 pl-1">
            Discover how you can monitor your website's performance with just a
            few clicks. Try it now and compare your site's performance with
            others in your industry.
          </h2>
          <div className="p-2 ml-2 mr-1 mt-2 text-left border-2 border-gray-700 rounded transition-colors duration-150 ease-in sm:w-11/12">
            <h3 className="text-md text-sm mb-2">Login</h3>
            <p className="flex items-start gap-2 text-xs">
              <img
                className="bg-gray-400 p-1 rounded h-12 w-12"
                src="/static/images/login.svg"
                alt="how to use Monitoring Links"
              />
              Click in the face icon in the side menu to login. Upon logging in,
              we store your name, profile picture link and user ID in our
              database solely for the purpose of this application.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="m-2 basis-11/12 p-2 text-center font-body transition-colors duration-150 ease-in">
            <h3 className="text-md text-sm">
              Hello{" "}
              {`${
                !!props.userInfo.displayName
                  ? props.userInfo.displayName
                  : props.userInfo.name
              }`}
              . You have{" "}
              {`${
                props.totUrls === 1
                  ? `${props.totUrls} link`
                  : `${props.totUrls} links`
              }`}{" "}
              being monitored.
            </h3>
          </div>
          <Table userInfo={props.userInfo!} />
        </>
      )}
      <div className="p-2 ml-2 mr-1 mt-2 text-left border-2 border-gray-700 rounded transition-colors duration-150 ease-in sm:w-11/12">
        <h3 className="text-md text-sm mb-2">Documentation</h3>
        <div className="flex items-start gap-2 text-xs">
          <img
            className="bg-gray-400 p-1 rounded h-12 w-12"
            src="/static/images/howto.svg"
            alt="how to use Monitoring Links"
          />
          <p>
            After logging in, access information on how to use{" "}
            <span className="font-semibold">Monitoring Links</span> by clicking
            the question mark icon in the side menu.
          </p>
        </div>
      </div>
      {!props.userInfo && !props.open ? (
        <div className="p-2 ml-2 mr-1 mt-2 text-left border-2 border-gray-700 rounded transition-colors duration-150 ease-in sm:w-11/12">
          <h3 className="text-md text-sm mb-2">Privacy Policy</h3>
          <div className="flex items-start gap-2 text-xs">
            <img
              className="bg-gray-400 p-1 rounded h-12 w-12"
              src="/static/images/policy.svg"
              alt="how to use Monitoring Links"
            />
            <p>
              Monitoring Links Privacy Policy addresses data collection, usage,
              and disclosure, with third party logins. It prioritizes security
              and aggregated data sharing. Users should periodically review.
              Full policy:{" "}
              <Link href="/privacypolicy" target="_blank">
                <span className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </span>
              </Link>
            </p>
          </div>
        </div>
      ) : !props.userInfo && props.open ? (
        <div className="p-2 ml-2 mr-1 mt-2 text-left border-2 border-gray-700 rounded transition-colors duration-150 ease-in sm:w-11/12">
          <h3 className="text-md text-sm mb-2">Privacy Policy</h3>
          <div className="flex items-start gap-2 text-xs">
            <img
              className="bg-gray-400 p-1 rounded h-12 w-12"
              src="/static/images/policy.svg"
              alt="how to use Monitoring Links"
            />
            <p>
              Monitoring Links{" "}
              <Link href="/privacypolicy" target="_blank">
                <span className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </span>
              </Link>
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
