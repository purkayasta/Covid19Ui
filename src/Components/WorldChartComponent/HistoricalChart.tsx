import { FC, useEffect, useState } from "react";
import { BuildLineChart } from "../../Helper/GraphHelper";
import { IBuildChartData } from "../../Interfaces/IHistoricData";
import { Line } from "react-chartjs-2";

export interface IHistoricChart {
  countryName: string;
}

export const HistoricalChart: FC<IHistoricChart> = ({ countryName }) => {
  const [chartData, setChartData] = useState<IBuildChartData[]>();
  const data = {
    labels: chartData?.map((x) => x.chartDates),
    datasets: [
      {
        label: `Affected Country New Cases: ${countryName}`,
        data: chartData?.map((x) => x.chartCounts),
        fill: true,
        backgroundColor: "darkcyan",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const getHistoricalData = async () => {
    const response = await fetch(
      `https://corona.lmao.ninja/v2/historical/${countryName}?lastdays=800`
    );
    const jsonResponse = await response.json();
    if (jsonResponse) {
      const data = BuildLineChart(jsonResponse);
      if (data) {
        setChartData(data);
      }
    }
  };
  useEffect(() => {
    getHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryName]);

  return (
    <div className="ChartContainer">
      <Line
        height={150}
        width={350}
        type="line"
        data={data}
        options={options}
      />
    </div>
  );
};
