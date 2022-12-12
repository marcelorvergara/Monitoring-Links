import { it } from "node:test";
import { useState, useEffect, SetStateAction } from "react";
import { getUrlStatus, parseDate } from "../helpers/helpers";
import { IURLsStatus } from "../interfaces/IURLsStatus";
import { ISession } from "../pages";

interface ILatestResultsProps {
  userInfo: ISession;
  switchComonent: () => void;
  setComponent: React.Dispatch<SetStateAction<string>>;
}

export default function LatestResults(props: ILatestResultsProps) {
  const [urlStatus, setUrlStatus] = useState<IURLsStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getUrlStatus(props.userInfo.id)
      .then((response) => {
        if (response.status === 200) return response.json();
        if (response.status === 401) {
          props.setComponent("Login");
          props.switchComonent();
        }
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        // limiting the latest results
        setUrlStatus(responseJson.splice(0, 11));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setUrlStatus([]);
      });
  }, []);

  return (
    <main className="flex justify-center text-xs mt-2">
      <div className="w-full sm:w-6/12 md:px-8 px-6">
        <div className="text-center text-lg font-bold">Latest Results</div>
        <table className="table w-full">
          <thead>
            <tr className="flex-1 text-sm">
              <th className="align-top text-left">
                Lastest <br /> Checks
              </th>
              <th className="text-end">
                Response <br /> Time
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2}>
                  <div className="flex w-full items-center justify-center">
                    <div className="w-16 h-16 mt-12 border-4 border-dashed border-slate-600 rounded-full animate-spin dark:border-blue-700"></div>
                  </div>
                </td>
              </tr>
            ) : (
              urlStatus.map((item: IURLsStatus, i: number) => (
                <tr
                  key={i}
                  className={`border-2 border-gray-400 ${
                    item.load_time < item.warning_th
                      ? "bg-green-200"
                      : item.load_time > item.danger_th
                      ? "bg-red-100"
                      : "bg-yellow-100"
                  }`}>
                  <td>
                    {item.url.replace("https://", "").replace("http://", "")}
                    <div>
                      <span>{parseDate(item.created_at)}</span>
                      <br />
                      <span
                        className={`${
                          parseInt(item.status) > 399
                            ? "bg-red-400 px-1 py-0.5 rounded-sm"
                            : ""
                        }`}>
                        Status code: {item.status}
                      </span>
                      <br />
                    </div>
                  </td>
                  <td className="align-top text-right">
                    <span>{item.load_time}s.</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
