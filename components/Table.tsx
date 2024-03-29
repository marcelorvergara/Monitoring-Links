import { useEffect, useState } from "react";
import { geStatistics } from "../helpers/helpers";
import { IURLsStatistics } from "../interfaces/IURLsStatistics";
import { ISession } from "../pages";

interface ITableProps {
  userInfo: ISession;
}

export default function Table(props: ITableProps) {
  const [urlStatistics, setUrlStatistics] = useState<IURLsStatistics[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  }, []);

  return (
    <main className="flex flex-wrap justify-center text-sm">
      <div className="w-full pl-2 pr-1">
        <div className="w-full mx-auto sm:w-11/12">
          <table className="table-fixed w-full ">
            <thead>
              <tr className="flex-1 min-w-full text-sm text-center">
                <th className="align-top" colSpan={2}>
                  {urlStatistics.length > 0 ? "Average Response Time" : ""}
                </th>
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
              ) : (
                urlStatistics.map((item: IURLsStatistics, i: number) => (
                  <tr
                    key={i}
                    className={`border-2 border-gray-400 ${
                      parseFloat(item.avg).toFixed(2) === "0.00"
                        ? "bg-gray-500"
                        : item.avg < item.warning_th
                        ? "bg-green-100"
                        : item.avg > item.warning_th &&
                          item.avg < item.danger_th
                        ? "bg-yellow-100"
                        : "bg-red-100"
                    }`}>
                    <td className="truncate align-top text-left">
                      {item.url
                        .toLowerCase()
                        .replace("https://", "")
                        .replace("http://", "")}
                    </td>
                    <td className="grid grid-rows-2 text-right">
                      <div>
                        <span>{parseFloat(item.avg).toFixed(2)}s.</span>
                      </div>
                      <div className="text-xs">
                        Min. <span>{item.min}s.</span>
                        <br />
                        Max.
                        <span>{item.max}s.</span>
                      </div>
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
