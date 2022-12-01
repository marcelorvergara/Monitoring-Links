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
        <table className="table w-full">
          <thead>
            <tr className="flex-1 text-lg">
              <th className="align-top  text-left">
                Lastest <br /> Checks
              </th>
              <th className="text-end">
                Loading <br /> Time
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
            ) : !urlStatus.length ? (
              <tr>
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
                <tr
                  key={i}
                  className={`${
                    item.status !== "200" ? "bg-green-100" : "bg-red-100"
                  } border-2 border-gray-400`}>
                  <td>
                    {item.url.replace("https://", "").replace("http://", "")}
                    <div>
                      <span>{parseDate(item.created_at)}</span>
                      <br />
                      <span>Status code: {item.status}</span>
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
