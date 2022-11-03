import { useState, useEffect } from "react";
import { ISession } from "../pages";

interface IURLsStatus {
  urlstatus_id: number;
  url: string;
  user_id: string;
  url_id: number;
  status: string;
  load_time: string;
}

interface IDashboardProps {
  userInfo: ISession;
}

export default function Dashboard(props: IDashboardProps) {
  const [urlStatus, setUrlStatus] = useState<IURLsStatus[]>([]);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + `/urls/${props.userInfo.id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "applictacion/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((response) => {
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

  return (
    <div className="w-full max-w-lg text-left mt-6">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-10/12 px-4 md:px-8">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="p-2">URL</th>
                <th className="p-2">Status</th>
                <th className="p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {urlStatus.map((item: IURLsStatus) => (
                <tr>
                  <td className="p-2">
                    {item.url.replace("https://", "").replace("http://", "")}
                  </td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2">{item.load_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
