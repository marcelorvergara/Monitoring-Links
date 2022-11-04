import { useState } from "react";
import { ISession } from "../pages";

interface ILinkMonitorDataProps {
  userInfo: ISession;
}

export default function LinkMonitorData(props: ILinkMonitorDataProps) {
  const [url, setUrl] = useState<string>("");

  function handleUrlValue(event: React.FormEvent<HTMLInputElement>) {
    setUrl(event.currentTarget.value);
  }

  async function registerUrl() {
    try {
      const resp = await fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + "/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, user_id: props.userInfo.id }),
      });
      if (resp.status === 200) {
        console.log("Status ok");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="w-full max-w-lg text-left">
      <div className="flex flex-wrap">
        <div className="w-full md:px-8 m-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name">
            Enter an URL to monitor:
          </label>
          <input
            onChange={handleUrlValue}
            value={url}
            className="appearance-none block text-xs w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="http://www.google.com"
          />
        </div>
      </div>
      <div className="text-right mx-6">
        <button
          onClick={registerUrl}
          className="text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
          Register
        </button>
      </div>
    </form>
  );
}
