import { IHistory, ILineGraph } from "../Interfaces/IHistoricData";

export const BuildLineChart = (data: IHistory[]) => {
  let curratedData: ILineGraph[] = [];
  let lastAffectedNumber: number = 0;

  for (let i in data) {
    // console.log("Date: " + typeof i);
    // console.log("Affected: " + typeof data[i]);
    // console.log(new Date(i));
    if (lastAffectedNumber) {
      curratedData.push({
        x: i,
        y: Number(data[i]) - lastAffectedNumber,
      });
    }

    lastAffectedNumber = Number(data[i]);
  }
  console.log(curratedData);
  return curratedData;
};
