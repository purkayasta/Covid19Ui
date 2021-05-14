import { IBuildChartData, IHistoricData } from "../Interfaces/IHistoricData";

export const BuildLineChart = (data: IHistoricData) => {
  let value: IBuildChartData[] = [];

  let index = 0;
  const casesJson = data.timeline.cases;
  for (let i in casesJson) {
    if (index % 7 === 0) {
      value.push({
        chartDates: i,
        chartCounts: Number(casesJson[i]),
      });
    }
    index++;
  }
  return value;
};
