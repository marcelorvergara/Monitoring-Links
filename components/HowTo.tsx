import Link from "next/link";

export default function HowTo() {
  return (
    <div className="flex justify-center bg-slate-200 p-4 h-screen">
      <div className="text-sm space-y-4 w-full sm:w-6/12">
        <div className="text-center text-lg font-bold">
          How To use Monitoring Links
        </div>
        <div className="flex gap-2 mt-6  bg-gray-400 px-2 py-2.5 rounded text-white">
          <img
            src="/static/images/login.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>Login with facebook or google account</span>
        </div>
        <div className="flex gap-2 bg-gray-400 px-2 py-2.5 rounded text-white">
          <img
            src="/static/images/newmonitor.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>Configure a URL to monitor</span>
        </div>
        <div className="flex gap-2 bg-gray-400 px-2 py-2.5 rounded text-white">
          <img
            src="/static/images/latestresults.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>
            Check results of the URL(s) that you have already configured
          </span>
        </div>
        <div className="flex gap-2 bg-gray-400 px-2 py-2.5 rounded text-white">
          <img
            src="/static/images/manage.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>Manage URL(s) already registered</span>
        </div>
        <div className="flex gap-2 bg-gray-400 px-2 py-2.5 rounded text-white">
          <img
            src="/static/images/logout.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>Logout</span>
        </div>
        <div className="text-right">
          <Link
            href="/"
            className="text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
