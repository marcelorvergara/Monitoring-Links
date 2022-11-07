import { useEffect, useState } from "react";
import { getUrls } from "../helpers/helpers";
import { IURLsStatus } from "../interfaces/IURLsStatus";
import { ISession } from "../pages";

interface IManageProps {
  userInfo: ISession;
}

export default function Manage(props: IManageProps) {
  const [urlStatus, setUrlStatus] = useState<IURLsStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getUrls(props.userInfo.id)
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

  return (
    <main className="w-full max-w-lg text-left mt-2">
      <div className="flex flex-wrap">
        <div className="w-full md:px-8 m-4">
          <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Manage URL:
          </span>
        </div>
      </div>
    </main>
  );
}
