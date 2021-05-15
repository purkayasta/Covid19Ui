import { FC, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IMapData } from "../../Interfaces/IMapInterface";

interface IBarChart {
  datas: IMapData[];
}

export const BarChartComponent: FC<IBarChart> = ({ datas }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [recovered, setRecovered] = useState<number[]>([]);

  const data = {
    labels: countries,
    datasets: [
      {
        label: "Number of recovered people",
        data: recovered,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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
  useEffect(() => {
    if (datas.length > 0) {
      const countryNames: string[] = [];
      const values: number[] = [];
      for (let index = 0; index < datas.length; index++) {
        const element = datas[index];
        countryNames.push(element.country);
        values.push(element.value);
      }
      setCountries(countryNames);
      setRecovered(values);
    }
  }, [datas]);
  return (
    <div>
      <Bar type="bar" data={data} options={options} />
    </div>
  );
};
