export default function DefaultMain() {
  return (
    <main className="flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-500">
        Welcome to <br />
        <span className="text-slate-800">Monitoring Links</span>
      </h1>
      <h2 className="text-sm mt-4 mb-2 font-body">
        Check out this! Here you can monitor your website with just a few
        clicks. Try it now and you even can benchmark with other sites how is
        your service performing.
      </h2>
      <div className="flex flex-wrap items-center justify-center mt-3 min-w-full">
        <div className="m-2 basis-11/12 p-2 text-left border-2 border-gray-700 rounded transition-colors duration-150 ease-in">
          <h3 className="text-md text-sm mb-2">Login</h3>
          <p className="flex items-start gap-2 text-xs">
            <img
              className="bg-gray-400 p-1 rounded"
              src="/static/images/login.svg"
              alt="how to use Monitoring Links"
            />
            Click in the face icon in the side menu to login
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center mt-3 min-w-full">
        <div className="m-2 basis-11/12 p-2 text-left border-2 border-gray-700 rounded transition-colors duration-150 ease-in">
          <h3 className="text-md text-sm mb-2">Documentation</h3>
          <p className="flex items-start gap-2 text-xs">
            <img
              className="bg-gray-400 p-1 rounded"
              src="/static/images/howto.svg"
              alt="how to use Monitoring Links"
            />
            After login, find information about how to use Monitoring Links
            clicking in the question mark in the side menu
          </p>
        </div>
      </div>
    </main>
  );
}
