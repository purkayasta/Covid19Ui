import "./DashboardCaseStyle.css";
import { FC } from "react";
import { ICountryInterface } from "../../Interfaces/ICountryInterface";

interface IDashboardCaseList {
  CaseList: ICountryInterface[];
}

export const DashboardCaseList: FC<IDashboardCaseList> = ({ CaseList }) => {
  return (
    <div className="caselist_table">
      <table>
        <thead>
          <tr>
            <td>Country</td>
            <td>Total Cases</td>
          </tr>
        </thead>
        <tbody>
          {CaseList.map(({ country, cases }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>
                <strong>{cases}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
