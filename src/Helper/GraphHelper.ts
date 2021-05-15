import { IBuildChartData, IHistoricData } from "../Interfaces/IHistoricData";

interface IDate {
  date: Date;
  case: number;
}

export const BuildLineChart = (data: IHistoricData) => {
  let value: IBuildChartData[] = [];
  const affectedCaseList: IDate[] = [];
  const casesJson = data.timeline.cases;
  for (let i in casesJson) {
    affectedCaseList.push({ date: new Date(i), case: Number(casesJson[i]) });
  }
  affectedCaseList.sort();

  let previousValue = 0;

  for (let index = 0; index < affectedCaseList.length; index += 30) {
    const element = affectedCaseList[index];

    const count = element.case - previousValue;
    const month = element.date.toLocaleDateString("default", {
      month: "short",
      year: "2-digit",
    });
    value.push({
      chartDates: `${month}`,
      chartCounts: count,
    });
    previousValue = element.case;
  }

  return value;
};
