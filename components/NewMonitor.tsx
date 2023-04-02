import { SetStateAction, useEffect, useState } from "react";
import { getUrlStatus, setUrlMonitor } from "../helpers/helpers";
import { IFeedback } from "../interfaces/IFeedback";
import { ISession } from "../pages";

interface ILinkMonitorDataProps {
  userInfo: ISession;
  switchComonent: () => void;
  setComponent: React.Dispatch<SetStateAction<string>>;
  setTotUrls: React.Dispatch<SetStateAction<number>>;
}

// threshold options
const thOptions = [
  { label: "0.25", value: 0.25 },
  { label: "0.5", value: 0.5 },
  { label: "1.0", value: 1.0 },
  { label: "1.5", value: 1.5 },
  { label: "2.0", value: 2.0 },
  { label: "2.5", value: 2.5 },
  { label: "3.0", value: 3.0 },
  { label: "5.0", value: 5.0 },
];

export default function LinkMonitorData(props: ILinkMonitorDataProps) {
  const [url, setUrl] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("https://");
  const [warningTh, setWarningTh] = useState<string>("-1");
  const [dangerTh, setDangerTh] = useState<string>("-1");
  const [feedback, setFeedback] = useState<IFeedback>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [smsWhatsapp, setSmsWhatsapp] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");

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

  function handleSmsWhatsappValue(event: React.FormEvent<HTMLInputElement>) {
    setSmsWhatsapp(event.currentTarget.value);
  }

  async function registerUrl(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // fetch get cancelled when this is not present
    setFeedback({});
    if (url.includes("http://") || url.includes("https://")) {
      setFeedback({
        error: "Invalid URL. Do not use http or https in the url string",
      });
      return;
    }
    if (dangerTh <= warningTh) {
      setFeedback({
        error: "Danger Threshold must be greater than Warning Threshold",
      });
      return;
    }
    setIsLoading(true);
    const phoneNumber = smsWhatsapp !== "" ? `+${smsWhatsapp}` : "";
    try {
      const resp = await setUrlMonitor(
        protocol + url,
        props.userInfo.id,
        warningTh,
        dangerTh,
        alertType + phoneNumber
      );
      const respJson = await resp.json();
      if (resp.status === 201) {
        setFeedback(respJson);
        props.setTotUrls(1); // refresh side menu
      } else {
        setFeedback({ error: respJson.error.split(":")[1] });
      }
    } catch (err) {
      setFeedback({ error: "Invalid URL or firewall block rule" });
    } finally {
      setIsLoading(false);
    }
  }

  function onProtocolChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProtocol(event.currentTarget.value);
  }

  function onAlertTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAlertType(event.currentTarget.value);
  }

  return (
    <form className="flex flex-wrap justify-center mt-2">
      <div className="w-full sm:w-6/12 text-left">
        <div className="text-center text-lg font-bold">
          Register URL to Monitor
        </div>
        <div className="text-sm mt-4 md:w-full md:px-8 m-4">
          <div className="flex flex-wrap gap-4 items-center justify-start text-sm mt-4 md:w-full">
            <label className="uppercase tracking-wide text-gray-700 font-bold text-xs">
              Protocol
            </label>
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => onProtocolChange(e)}
                type="radio"
                value="https://"
                name="https://"
                checked={protocol === "https://"}
              />
              HTTPS
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => onProtocolChange(e)}
                type="radio"
                value="http://"
                name="http://"
                checked={protocol === "http://"}
              />
              HTTP
            </div>
          </div>
          <label
            className="mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="urlText">
            URL
          </label>
          <input
            onChange={handleUrlValue}
            value={url}
            className="mt-2 appearance-none block text-xs w-full text-gray-700 border border-gray-200 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="urlText"
            type="text"
            placeholder="www.google.com"
          />
          <div className="flex gap-7 mt-4">
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="warningThreshold">
                Warning Threshold
              </label>
              <select
                onChange={(opt) => setWarningTh(opt.currentTarget.value)}
                defaultValue={"-1"}
                name="warningThreshold"
                id="warningThreshold"
                className="mt-2 appearance-none block text-xs w-full text-gray-700 border border-yellow-400 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="-1" disabled>
                  Select
                </option>
                {thOptions.map((opt) => (
                  <option key={opt.label} value={opt.value}>
                    {opt.label}s.
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="dangerThreshold">
                Danger Threshold
              </label>
              <select
                onChange={(opt) => setDangerTh(opt.currentTarget.value)}
                defaultValue={"-1"}
                name="dangerThreshold"
                id="dangerThreshold"
                className="mt-2 appearance-none block text-xs w-full text-gray-700 border border-red-300 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="-1" disabled>
                  Select
                </option>
                {thOptions.map((opt) => (
                  <option key={opt.label} value={opt.value}>
                    {opt.label}s.
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-start text-sm mt-4 md:w-full">
            <label className="uppercase tracking-wide text-gray-700 font-bold text-xs">
              Alert
            </label>
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => onAlertTypeChange(e)}
                type="radio"
                value=""
                name=""
                checked={alertType === ""}
              />
              SMS
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => onAlertTypeChange(e)}
                type="radio"
                value="whatsapp:"
                name="whatsapp:"
                checked={alertType === "whatsapp:"}
              />
              WHATSAPP
            </div>
          </div>
          <label
            className="mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="urlText">
            Mobile Number
          </label>
          <input
            onChange={handleSmsWhatsappValue}
            value={smsWhatsapp}
            className="mt-2 appearance-none block text-xs w-full text-gray-700 border border-gray-200 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="urlText"
            type="number"
            placeholder="552198899559"
          />
        </div>
        <div className="text-sm mt-5 md:w-full md:px-8 m-4 flex justify-end">
          <button
            onClick={registerUrl}
            className="w-full bg-blue-600 text-white hover:bg-blue-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
            Register
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
      {isLoading ? (
        <div className="flex-none w-full">
          <div>
            <div className="flex w-full items-center justify-center">
              <div className="w-16 h-16 mt-12 border-4 border-dashed border-slate-600 rounded-full animate-spin dark:border-blue-700"></div>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
