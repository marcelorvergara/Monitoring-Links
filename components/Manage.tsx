import { useEffect, useState } from "react";
import { deleteUrlHelper, getUserUrls, parseDate } from "../helpers/helpers";
import { IURLsStatus } from "../interfaces/IURLsStatus";
import { ISession } from "../pages";

interface IManageProps {
  userInfo: ISession;
}

export default function Manage(props: IManageProps) {
  const [urlStatus, setUrlStatus] = useState<IURLsStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUserUrls(props.userInfo.id)
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        console.log(responseJson);
        setUrlStatus(responseJson);
      })
      .catch((error) => {
        setUrlStatus([]);
      });
  }, []);

  function deleteUrl(id: number) {
    deleteUrlHelper(id);
  }

  return (
    <main className="text-left text-xs">
      <div className="w-full md:w-11/12 md:px-8 px-6">
        <table className="table w-full">
          <thead>
            <tr className="flex-1">
              <th className="align-top">Manage URL</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <div className="flex w-full items-center justify-center m-8 mt-14 mr-24">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-700"></div>
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
              urlStatus.map((item: IURLsStatus) => (
                <tr key={item.urlstatus_id}>
                  <td className="border-2 py-2 px-1.5 text-right">
                    <span>
                      {item.url.replace("https://", "").replace("http://", "")}
                    </span>
                    <br />
                    <button
                      onClick={() => deleteUrl(item.url_id)}
                      className="mt-4 text-xs bg-red-400 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
                      Delete
                    </button>
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
