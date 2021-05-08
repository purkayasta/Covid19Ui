import { IHistory, ILineGraph } from "../Interfaces/IHistoricData";

export const BuildLineChart = (data: IHistory[]) => {
  let curratedData: ILineGraph[] = [];
  let lastAffectedNumber: number = 0;

  for (let i in data) {
    if (lastAffectedNumber) {
      curratedData.push({
        x: i,
        y: Number(data[i]) - lastAffectedNumber,
      });
    }

    lastAffectedNumber = Number(data[i]);
  }
  return curratedData;
};
