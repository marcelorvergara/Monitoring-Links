export default function LinkMonitorData() {
  return (
    <form className="w-full max-w-lg text-left mt-6">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-4 md:px-8">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name">
            URL:
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="http://www.google.com"
          />
        </div>
      </div>
      <div className="text-right mx-6">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
          Register
        </button>
      </div>
    </form>
  );
}
