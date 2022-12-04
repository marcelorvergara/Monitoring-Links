import { SetStateAction, useEffect, useState } from "react";
import { geStatisticsLastHour, parseDate } from "../helpers/helpers";
import { ISession } from "../pages";

interface IStatisticsProps {
  userInfo: ISession;
  switchComonent: () => void;
  setComponent: React.Dispatch<SetStateAction<string>>;
}

interface IRespObj {
  url: string;
  load_time: number[];
  created_at: string[];
  warning_th: string;
  danger_th: string;
}

interface IDataset {
  label: string;
  data: number[];
}

interface IChart {
  labels: string[];
  datasets: IDataset[];
}

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

export default function Statistics(props: IStatisticsProps) {
  const [lastHourStatistics, setLastHourStatistics] = useState<IChart[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    geStatisticsLastHour(props.userInfo.id)
      .then((response) => {
        if (response.status === 200) return response.json();
        if (response.status === 401) {
          props.setComponent("Login");
          props.switchComonent();
        }
        setIsLoading(false);
        throw new Error("Failed to get URLs");
      })
      .then((responseJson) => {
        let result: IRespObj[] = [];
        for (let respObj of responseJson) {
          const urlExist = result.find((f) => f.url === respObj.url);
          if (urlExist === undefined) {
            const lt: number[] = [];
            const ca: string[] = [];
            lt[0] = parseFloat(respObj.load_time);
            // apply tz
            const newDate = parseDate(respObj.created_at);
            ca[0] = newDate.split(":")[0] + "h";
            result.push({
              url: respObj.url,
              load_time: lt,
              created_at: ca,
              warning_th: respObj.warning_th,
              danger_th: respObj.danger_th,
            });
          } else {
            const idx = result.findIndex((f) => f.url === respObj.url);
            result[idx].load_time.push(parseFloat(respObj.load_time));
            // apply tz
            const newDate = parseDate(respObj.created_at);
            result[idx].created_at.push(newDate.split(":")[0] + "h");
          }
        }
        let chartData: any = [];
        result.forEach((el, idx) => {
          chartData.push({
            labels: el.created_at,
            datasets: [
              { label: el.url, data: el.load_time },
              {
                label: "Warning TH",
                data: Array(el.load_time.length).fill(result[idx].warning_th),
                borderColor: "rgb(251, 191, 36)",
                backgroundColor: "rgb(251, 191, 36, 0.4)",
              },
              {
                label: "Danger TH",
                data: Array(el.load_time.length).fill(result[idx].danger_th),
                borderColor: "rgb(239, 68, 68)",
                backgroundColor: "rgb(239, 68, 68, 0.4)",
              },
            ],
          });
        });
        setLastHourStatistics(chartData);
        setIsLoading(false);
      })
      .catch((error) => {
        setLastHourStatistics([]);
      });
  }, []);

  return (
    <main className="flex flex-wrap items-center justify-center w-full gap-1 mt-2">
      <div className="text-center text-lg font-bold w-full">
        Statistical Graphics
      </div>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <div className="w-16 h-16 mt-12 border-4 border-dashed border-slate-600 rounded-full animate-spin dark:border-blue-700"></div>
        </div>
      ) : !lastHourStatistics.length ? (
        <div className="border-2 border-gray-400 m-5">
          <div className="p-6 text-2xl">
            Go to <img src="/static/images/newmonitor.svg" alt="New monitor" />{" "}
            to register your first Monitoring Link!
          </div>
        </div>
      ) : (
        lastHourStatistics.map((item: IChart, idx: number) => (
          <div key={idx} className="w-64 sm:w-3/12 ml-4">
            <Line options={options} data={item} />
          </div>
        ))
      )}
    </main>
  );
}
