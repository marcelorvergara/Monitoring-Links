import { SetStateAction, useEffect, useState } from "react";
import { getUrlStatus, setUrlMonitor } from "../helpers/helpers";
import { IFeedback } from "../interfaces/IFeedback";
import { ISession } from "../pages";

interface ILinkMonitorDataProps {
  userInfo: ISession;
  switchComonent: () => void;
  setComponent: React.Dispatch<SetStateAction<string>>;
}

export default function LinkMonitorData(props: ILinkMonitorDataProps) {
  const [url, setUrl] = useState<string>("");
  const [feedback, setFeedback] = useState<IFeedback>({});

  // check if logged in
  useEffect(() => {
    getUrlStatus(props.userInfo.id).then((response) => {
      if (response.status === 401) {
        props.setComponent("Login");
        props.switchComonent();
      }
    });
  }, []);

  function handleUrlValue(event: React.FormEvent<HTMLInputElement>) {
    setUrl(event.currentTarget.value);
  }

  async function registerUrl(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // fetch get cancelled when this is not present
    try {
      const resp = await setUrlMonitor(url, props.userInfo.id);
      if (resp.status === 201) {
        const respJson = await resp.json();
        setFeedback(respJson);
      }
    } catch (err) {
      setFeedback({ error: "Invalid URL or firewall block rule" });
    }
  }

  return (
    <form className="flex justify-center mt-2">
      <div className="w-full sm:w-6/12 text-left ">
        <div className="text-center text-lg font-bold">
          Register URL to Monitor
        </div>
        <div className="text-sm mt-4 md:w-full md:px-8 m-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name">
            Enter a URL to monitor:
          </label>
          <input
            onChange={handleUrlValue}
            value={url}
            className="appearance-none block text-xs w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="http://www.google.com"
          />
        </div>
        <div className="text-sm mt-4 md:w-full md:px-8 m-4 flex justify-end">
          <button
            onClick={registerUrl}
            className="text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
            Go
          </button>
        </div>
        {feedback.error ? (
          <div role="alert" className="text-sm mt-4 md:w-full md:px-8 m-4">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Registration not completed
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>{feedback.error}</p>
            </div>
          </div>
        ) : parseInt(feedback.status) === 200 ? (
          <div role="alert" className="text-sm mt-4 md:w-full md:px-8 m-4">
            <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
              Success
            </div>
            <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
              <p>{feedback.url} registred. </p>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
