import { FC, useEffect, useState } from "react";
import { WorldWideHistoricalUrl } from "../../Helper/UrlHelper";
import { Line } from "react-chartjs-2";
import { IHistoricData, IHistory } from "../../Interfaces/IHistoricData";

export const HistoricalChart: FC = () => {
  const [historicalData, setHistoricalData] = useState<IHistoricData>();

  const options: any = {
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
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const data: any = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  useEffect(() => {
    getHistoricalData();
  }, []);

  useEffect(() => {
    if (historicalData?.cases) {
      console.log("From UseEffect: " + historicalData.cases);
      BuildLineChart();
    }
  }, [historicalData]);

  const getHistoricalData = async () => {
    const fetching = await fetch(WorldWideHistoricalUrl);

    const data = await fetching.json();

    return data;

    // .then((response) => response.json())
    // .then((data: IHistoricData) => {
    //   console.log("From the Fetch: " + data.cases);
    //   BuildLineChart(data);
    // });
  };

  const BuildLineChart = () => {
    if (historicalData?.cases) {
      console.log(
        "From The Build Line Function Using Hooks: " +
          historicalData.cases.values
      );
      console.log(historicalData.cases.length);
    }
  };

  return (
    <div>
      <Line type={Line} data={data} options={options} />
    </div>
  );
};
