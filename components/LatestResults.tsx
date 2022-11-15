import { useState, useEffect } from "react";
import { getUrlStatus, parseDate } from "../helpers/helpers";
import { IURLsStatus } from "../interfaces/IURLsStatus";
import { ISession } from "../pages";

interface ILatestResultsProps {
  userInfo: ISession;
}

export default function LatestResults(props: ILatestResultsProps) {
  const [urlStatus, setUrlStatus] = useState<IURLsStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getUrlStatus(props.userInfo.id)
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        // limiting the latest results
        setUrlStatus(responseJson.splice(0, 11));
      })
      .catch((error) => {
        setUrlStatus([]);
      });
  }, []);

  return (
    <main className="text-left text-xs">
      <div className="w-full md:w-11/12 md:px-8 px-6">
        <table className="table w-full">
          <thead>
            <tr className="flex-1 text-lg">
              <th className={`${!urlStatus.length && "hidden"} align-top`}>
                Last Results
              </th>
              <th className={`${!urlStatus.length && "hidden"} text-end`}>
                Loading time
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <div className="flex w-full items-center justify-center m-8 mt-14 mr-10">
                    <div className="w-16 h-16 border-4 border-dashed border-slate-600 rounded-full animate-spin dark:border-blue-700"></div>
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
                <tr key={i} className="border-2">
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
                    <span>{item.load_time}</span>
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
