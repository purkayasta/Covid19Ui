import { CountryInfo } from "./ICountryInterface";

export interface ICountryName {
  Name: string;
  Code: string;
  Updated: number;
  CountryInfo: CountryInfo;
}
