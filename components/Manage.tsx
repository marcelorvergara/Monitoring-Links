import { SetStateAction, useEffect, useState } from "react";
import { deleteUrlHelper, getUserUrls, parseDate } from "../helpers/helpers";
import { IFeedback } from "../interfaces/IFeedback";
import { IURLsStatus } from "../interfaces/IURLsStatus";
import { ISession } from "../pages";

interface IManageProps {
  userInfo: ISession;
  switchComonent: () => void;
  setComponent: React.Dispatch<SetStateAction<string>>;
  setTotUrls: React.Dispatch<SetStateAction<number>>;
}

export default function Manage(props: IManageProps) {
  const [urlStatus, setUrlStatus] = useState<IURLsStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<IFeedback>({});

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
  }, [feedback]);

  async function deleteUrl(id: number) {
    deleteUrlHelper(id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) return response.json();
        throw new Error("Failed to delete URL");
      })
      .then((responseJson) => {
        setFeedback(responseJson);
      })
      .catch((error) => {
        setFeedback(error);
      });
  }

  return (
    <main className="flex justify-center mt-2 text-xs">
      <div className="w-full sm:w-6/12">
        <div className="w-full md:w-11/12 md:px-8 px-6">
          <table className="table w-full">
            <thead>
              <tr className="flex-1  text-lg text-left">
                <th className="align-top">Manage URL</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td>
                    <div className="flex w-full items-center justify-center">
                      <div className="w-16 h-16 mt-12 border-4 border-dashed border-slate-600 rounded-full animate-spin dark:border-blue-700"></div>
                    </div>
                  </td>
                </tr>
              ) : !urlStatus.length ? (
                <tr className="border-2 border-gray-400">
                  <td>
                    <div className="p-6 text-2xl">
                      Go to{" "}
                      <img
                        src="/static/images/newmonitor.svg"
                        alt="New monitor"
                      />{" "}
                      to register your first Monitoring Link!
                    </div>
                  </td>
                </tr>
              ) : (
                urlStatus.map((item: IURLsStatus, i: number) => (
                  <tr key={i}>
                    <td className="border-2 border-gray-400 py-2 px-1.5 text-right">
                      <span>
                        {item.url
                          .toLowerCase()
                          .replace("https://", "")
                          .replace("http://", "")}
                      </span>
                      <br />
                      <button
                        onClick={() => deleteUrl(item.url_id)}
                        className="mt-2 text-xs bg-red-400 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full md:w-11/12 md:px-8 px-6">
          {feedback.error ? (
            <div role="alert" className="text-sm mt-4 md:w-full md:px-8 m-4">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Registration not completed
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>{feedback.error}</p>
              </div>
            </div>
          ) : !!feedback.url ? (
            <div role="alert" className="text-sm mt-4 md:w-full md:px-8 m-4">
              <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                Success
              </div>
              <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                <p>{feedback.url} removed. </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
