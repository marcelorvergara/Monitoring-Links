export default function HowTo() {
  return (
    <div className="flex justify-center bg-slate-200 p-4 h-screen">
      <div className="text-sm space-y-4 w-full sm:w-6/12">
        <div className="text-center text-lg font-bold">
          How To use Monitoring Links
        </div>
        <div className="flex items-center gap-2 mt-6 font-body bg-gray-600 px-2 py-2.5 rounded text-white text-xs sm:text-md">
          <img
            src="/static/images/login.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>Login with facebook or google account</span>
        </div>
        <div className="flex items-center gap-2 font-body bg-gray-600 px-2 py-2.5 rounded text-white text-xs sm:text-md">
          <img
            src="/static/images/newmonitor.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>Configure a URL to monitor</span>
        </div>
        <div className="flex items-center gap-2 font-body bg-gray-600 px-2 py-2.5 rounded text-white text-xs sm:text-md">
          <img
            src="/static/images/latestresults.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>
            Check results of the URL(s) that you have already configured
          </span>
        </div>
        <div className="flex items-center gap-2 font-body bg-gray-600 px-2 py-2.5 rounded text-white text-xs sm:text-md">
          <img
            src="/static/images/statistics.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>
            Visual information about last six hours monitoring results
          </span>
        </div>
        <div className="flex items-center gap-2 font-body bg-gray-600 px-2 py-2.5 rounded text-white text-xs sm:text-md">
          <img
            src="/static/images/manage.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>Manage URL(s) already registered</span>
        </div>
        <div className="flex items-center gap-2 font-body bg-gray-600 px-2 py-2.5 rounded text-white text-xs sm:text-md">
          <img
            src="/static/images/logout.svg"
            alt="login button"
            className="w-10 h-10"
          />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
