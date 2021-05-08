import { FC, useEffect, useState } from "react";
import { WorldWideHistoricalUrl } from "../../Helper/UrlHelper";
import { BuildLineChart } from "../../Helper/GraphHelper";
import { Line } from "react-chartjs-2";
import { ILineGraph } from "../../Interfaces/IHistoricData";

export const HistoricalChart: FC = () => {
  const [historicalData, setHistoricalData] = useState<ILineGraph[]>();

  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  const data: any = {
    datasets: [
      {
        label: "Affected Case",
        data: historicalData,
        fill: false,
        backgroundColor: "rgba(204, 16, 52, 0.5)",
        borderColor: "#CC1034",
      },
    ],
  };

  useEffect(() => {
    const getHistoricalData = async () => {
      const response = await fetch(WorldWideHistoricalUrl);
      const jsonResponse = await response.json();

      if (jsonResponse) {
        const chartData = BuildLineChart(jsonResponse.cases);
        setHistoricalData(chartData);
      }
    };
    getHistoricalData();
  }, []);

  return (
    <div>
      {historicalData ? (
        <Line type={Line} data={data} options={options} />
      ) : (
        "Not Ready Yet"
      )}
    </div>
  );
};
