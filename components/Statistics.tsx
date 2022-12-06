import { SetStateAction, useEffect, useState } from "react";
import { geStatisticsLastHour, parseDate } from "../helpers/helpers";
import { ISession } from "../pages";

interface IStatisticsProps {
  userInfo: ISession;
  switchComonent: () => void;
  setComponent: React.Dispatch<SetStateAction<string>>;
  open: boolean;
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
    setIsLoading(true);
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
              {
                label: el.url,
                data: el.load_time,
                borderColor: "rgb(134, 134, 134)",
                backgroundColor: "rgb(85, 85, 85, 0.4)",
              },
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
  }, [props.open]);

  return (
    <main className="flex flex-wrap items-center justify-center w-full gap-1 mt-2 pr-1 h-64">
      <div className="text-center text-lg font-bold w-full">
        Statistical Graphics
      </div>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <div className="w-16 h-16 mt-12 border-4 border-dashed border-slate-600 rounded-full animate-spin dark:border-blue-700"></div>
        </div>
      ) : (
        lastHourStatistics.map((item: IChart, idx: number) => (
          <Line
            className="ml-4 w-11/12"
            key={idx}
            options={options}
            data={item}
            updateMode={"resize"}
          />
        ))
      )}
    </main>
  );
}
