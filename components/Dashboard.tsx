import { useState, useEffect } from "react";
import { ISession } from "../pages";

interface IURLsStatus {
  urlstatus_id: number;
  url: string;
  user_id: string;
  url_id: number;
  status: string;
  load_time: string;
  created_at: string;
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

  function parseDate(date: string) {
    const newDate = new Date(date);
    return `${newDate.toLocaleTimeString()} - ${newDate.toLocaleDateString()}`;
  }

  return (
    <main className="text-left text-xs">
      <div className="w-full md:w-11/12 md:px-8 px-6">
        <table className="table w-full">
          <thead>
            <tr className="flex-1">
              <th>Last Results</th>
              <th className="text-end">Loading time</th>
            </tr>
          </thead>
          <tbody>
            {urlStatus.map((item: IURLsStatus) => (
              <tr key={item.urlstatus_id} className="border-2 rounded-lg">
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
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
