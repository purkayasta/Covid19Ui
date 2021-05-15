import { ICountryInterface } from "./ICountryInterface";

export interface IDashboardCaseTable {
  countryName: string;
  totalCases: number;
}

export interface ICaseTable {
  CaseList: ICountryInterface[];
}
