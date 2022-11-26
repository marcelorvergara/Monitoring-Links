import { useEffect, useState } from "react";
import { geStatistics } from "../helpers/helpers";
import { IFeedback } from "../interfaces/IFeedback";
import { IURLsStatistics } from "../interfaces/IURLsStatistics";
import { IURLsStatus } from "../interfaces/IURLsStatus";
import { ISession } from "../pages";

interface IStatisticsProps {
  userInfo: ISession;
}

export default function Statistics(props: IStatisticsProps) {
  const [urlStatistics, setUrlStatistics] = useState<IURLsStatistics[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<IFeedback>({});

  useEffect(() => {
    geStatistics(props.userInfo.id)
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) return response.json();
        throw new Error("Failed to get URLs");
      })
      .then((responseJson) => {
        setUrlStatistics(responseJson);
      })
      .catch((error) => {
        setUrlStatistics([]);
      });
  }, [feedback]);

  return (
    <main className="flex justify-center mt-2 text-xs">
      <div className="w-full sm:w-6/12 md:px-8 pl-6">
        <div className="w-full md:w-11/12 md:px-8 pr-1">
          <table className="table-fixed w-full">
            <thead>
              <tr className="flex-1 min-w-full text-sm text-left">
                <th className="align-top">URL</th>
                <th className="align-top">MIN</th>
                <th className="align-top">MAX</th>
                <th className="align-top">AVG</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4}>
                    <div className="flex w-full items-center justify-center">
                      <div className="w-16 h-16 mt-12 border-4 border-dashed border-slate-600 rounded-full animate-spin dark:border-blue-700"></div>
                    </div>
                  </td>
                </tr>
              ) : !urlStatistics.length ? (
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
                urlStatistics.map((item: IURLsStatistics, i: number) => (
                  <tr key={i} className="border-2 border-gray-400">
                    <td className="truncate">
                      {item.url
                        .toLowerCase()
                        .replace("https://", "")
                        .replace("http://", "")}
                    </td>
                    <td>
                      <span>{item.min}s.</span>
                    </td>
                    <td>
                      <span>{item.max}s.</span>
                    </td>
                    <td>
                      <span>{parseFloat(item.avg).toFixed(2)}s.</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
