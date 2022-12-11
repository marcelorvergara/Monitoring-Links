import { spawn } from "child_process";
import { SetStateAction, useEffect, useState } from "react";
import {
  deleteUrlHelper,
  getUserUrls,
  parseDate,
  updateUrlHelper,
} from "../helpers/helpers";
import { IFeedback } from "../interfaces/IFeedback";
import { IURLsStatus } from "../interfaces/IURLsStatus";
import { ISession } from "../pages";
import ConfirmDialog from "./confirmDialog/ConfirmDialog";

interface IManageProps {
  userInfo: ISession;
  switchComonent: () => void;
  setComponent: React.Dispatch<SetStateAction<string>>;
  setTotUrls: React.Dispatch<SetStateAction<number>>;
  open: boolean;
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

export default function Manage(props: IManageProps) {
  const [urlStatus, setUrlStatus] = useState<IURLsStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updateUrl, setUpdateUrl] = useState<IURLsStatus | null>(null);
  const [warningTh, setWarningTh] = useState<string>("-1");
  const [dangerTh, setDangerTh] = useState<string>("-1");
  const [feedback, setFeedback] = useState<IFeedback>({});
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<IURLsStatus>();
  const [whatsapp, setWhatsapp] = useState<string>("");

  useEffect(() => {
    getUserUrls(props.userInfo.id)
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) return response.json();
        if (response.status === 401) {
          props.setComponent("Login");
          props.switchComonent();
        }
        throw new Error("Failed to get URLs");
      })
      .then((responseJson) => {
        props.setTotUrls(responseJson.length);
        setUrlStatus(responseJson);
      })
      .catch((error) => {
        setUrlStatus([]);
      });
  }, [isLoading]);

  async function deleteUrl() {
    setIsLoading(true);
    deleteUrlHelper(itemToDelete?.url_id!)
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("Failed to delete URL");
      })
      .then((responseJson) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  function updateThresholdAndZap(item: IURLsStatus) {
    setFeedback({});
    if (item === updateUrl) {
      setUpdateUrl(null);
      return;
    }
    setWarningTh(item.warning_th);
    setDangerTh(item.danger_th);
    setUpdateUrl(item);
    setWhatsapp(item.whatsapp ?? "");
  }

  function updateUrlBE() {
    setFeedback({});
    if (dangerTh <= warningTh) {
      setFeedback({
        error: "Danger Threshold must be greater than Warning Threshold",
      });
      return;
    }
    setIsLoading(true);
    updateUrlHelper({
      user_id: updateUrl?.user_id,
      url_id: updateUrl?.url_id,
      warning_th: warningTh,
      danger_th: dangerTh,
      whatsapp: whatsapp,
    })
      .then((response) => {
        if (response.status === 202) return response.json();
        throw new Error("Failed to delete URL");
      })
      .then((responseJson) => {
        setIsLoading(false);
        if (responseJson) {
          setFeedback(responseJson);
        } else {
          setFeedback({ error: responseJson.error.split(":")[1] });
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  function handleWhatsappValue(event: React.FormEvent<HTMLInputElement>) {
    setWhatsapp(event.currentTarget.value);
  }

  return (
    <main className="flex flex-wrap justify-center mt-2 text-xs">
      <div className="text-center text-lg font-bold w-full mx-auto">
        Manage URL
      </div>
      <div className="w-full sm:w-6/12 text-center">
        <div className="w-full mx-auto md:w-11/12 md:px-8 px-6">
          <table className="table w-full">
            <tbody>
              {isLoading ? (
                <tr>
                  <td>
                    <div className="flex w-full items-center justify-center">
                      <div className="w-16 h-16 mt-12 border-4 border-dashed border-slate-600 rounded-full animate-spin dark:border-blue-700"></div>
                    </div>
                  </td>
                </tr>
              ) : urlStatus.length === 0 ? (
                <tr>
                  <td>
                    <div className="flex w-full items-center justify-center font-body">
                      You are not monitoring any URL
                    </div>
                  </td>
                </tr>
              ) : (
                urlStatus.map((item: IURLsStatus, i: number) => (
                  <tr
                    key={i}
                    className={`${
                      i % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                    }`}>
                    <td className="border-2 border-gray-400 py-2 px-1.5 text-left">
                      <span>
                        {item.url
                          .toLowerCase()
                          .replace("https://", "")
                          .replace("http://", "")}
                      </span>
                      <br />
                      <div className="flex flex-wrap items-center justify-between">
                        <button
                          onClick={() => {
                            setItemToDelete(item);
                            setConfirmOpen(true);
                          }}
                          className="mt-2 text-xs bg-red-400 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
                          Delete
                        </button>
                        <button
                          onClick={() => updateThresholdAndZap(item)}
                          className="mt-2 text-xs bg-yellow-400 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <ConfirmDialog
            title={`Delete ${itemToDelete?.url
              .toLowerCase()
              .replace("https://", "")
              .replace("http://", "")}?`}
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={deleteUrl}>
            All data related to this monitor will be lost!
          </ConfirmDialog>
        </div>
        {updateUrl ? (
          <div className="md:w-11/12 md:px-8 px-2 mt-6 mx-auto">
            <div
              className={`${
                props.open ? " w-[202px]" : " w-[260px]"
              } text-lg bg-gray-300 text-center px-1.5 py-2 rounded-sm font-body tracking-wider sm:w-full mx-auto`}>
              <span className="truncate block">{updateUrl.url}</span>
            </div>
            <div className="flex gap-7 mt-4">
              <div>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="warningThreshold">
                  Warning Threshold
                </label>
                <select
                  onChange={(opt) => setWarningTh(opt.currentTarget.value)}
                  value={parseFloat(warningTh)}
                  name="warningThreshold"
                  id="warningThreshold"
                  className="mt-2 appearance-none block text-xs w-full bg-gray-100 text-gray-700 border border-yellow-400 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
                  value={parseFloat(dangerTh)}
                  name="dangerThreshold"
                  id="dangerThreshold"
                  className="mt-2 appearance-none block text-xs w-full bg-gray-100 text-gray-700 border border-red-300 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  {thOptions.map((opt) => (
                    <option key={opt.label} value={opt.value}>
                      {opt.label}s.
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <label
              className="mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold text-left"
              htmlFor="urlText">
              Whatsapp Alert
            </label>
            <input
              onChange={handleWhatsappValue}
              value={whatsapp}
              className="mt-2 appearance-none block text-xs w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="urlText"
              type="text"
              placeholder="552198899559"
            />
            <button
              onClick={updateUrlBE}
              className="text-sm mt-4 w-full bg-blue-600 text-white hover:bg-blue-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
              Update
            </button>
          </div>
        ) : null}
        {feedback.error ? (
          <div role="alert" className="w-full md:w-11/12 md:px-8 px-2 mt-6">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Registration not completed
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>{feedback.error}</p>
            </div>
          </div>
        ) : (
          !!feedback.url && (
            <div
              role="alert"
              className="w-full md:w-11/12 md:px-8 px-2 mt-6 mx-auto">
              <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                Success
              </div>
              <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                <p>{feedback.url} updated. </p>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
