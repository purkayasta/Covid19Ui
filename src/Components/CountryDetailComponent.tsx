import React, { FC } from "react";
import { ICountryInterface } from "../Interfaces/CountryInterface";

interface ICountryDetail {
  countryStat: ICountryInterface;
}
export const CountryDetailComponent: FC<ICountryDetail> = ({ countryStat }) => {
  return (
    <div>
      <h2>Country : {countryStat.country}</h2>
      <h4>Active: {countryStat.active}</h4>
      <p>Total Deaths: {countryStat.todayDeaths}</p>
    </div>
  );
};
