export interface IHistory {
  date: Date;
  affected: number;
}

export interface IHistoricData {
  country: string;
  province: string;
  timeline: ITimelineData;
}

export interface ITimelineData {
  cases: IHistory[];
  deaths: IHistory[];
  recovered: IHistory[];
}

export interface IBuildChartData {
  chartDates: string;
  chartCounts: number;
}
