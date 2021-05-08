import { IHistoricData, IHistory } from "../Interfaces/IHistoricData";

export const BuildLineChart = (data: IHistory[]) => {
  console.log("From BuildLineChart : " + data.length);
  // for (const c of data) {
  //   console.log(c);
  // }
  // console.log("Total cases: " + data.length);
  // let curratedData: IHistory[] = [];
  // let lastAffectedNumber: number = 0;

  // for (let data in datas) {
  //   console.log("Affected: " + datas[data].affected);
  //   // if (datas[data].date) {
  //   //   curratedData.push({
  //   //     date: datas[data].date,
  //   //     affected: datas[data].affected - lastAffectedNumber,
  //   //   });
  //   //   lastAffectedNumber = datas[data].affected;
  //   // }
  // }
  // console.log(curratedData);
};
