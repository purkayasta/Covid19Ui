import { Grid } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { WorldMap } from "react-svg-worldmap";
import { SortByRecoverdNumber } from "../../Helper/GraphHelper";
import { ICaseTable } from "../../Interfaces/IDashboardCaseTable";
import { IMapData } from "../../Interfaces/IMapInterface";
import { BarChartComponent } from "../ChartComponent/BarChartComponent";

export const MapChartComponent: FC<ICaseTable> = ({ CaseList }) => {
  const [data, setData] = useState<any[]>([]);
  const [topRecovedData, setTopRecoverdData] = useState<any[]>([]);

  const prepareData = async () => {
    if (CaseList.length > 0) {
      let data2: IMapData[] = [];
      for (let x of CaseList) {
        if (x.countryInfo.iso2) {
          data2.push({
            country: x.countryInfo.iso2.toLowerCase(),
            value: x.deaths,
          });
        }
      }
      if (data2.length > 0) {
        setData(data2);
      }
    }
  };

  const prepareTopRecoverdData = () => {
    let recoveredDict: IMapData[] = [];
    if (CaseList.length > 0) {
      for (let i of CaseList) {
        recoveredDict.push({
          country: i.country,
          value: i.recovered,
        });
      }
      recoveredDict.sort(SortByRecoverdNumber);
      const items = recoveredDict.slice(
        recoveredDict.length - 3,
        recoveredDict.length
      );
      setTopRecoverdData(items);
    }
  };

  useEffect(() => {
    if (CaseList.length > 1) {
      prepareData().then(() => {});
      prepareTopRecoverdData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CaseList]);

  return (
    <Grid container justify="center">
      <Grid item xs>
        <h3>Total Death Map</h3>
        <WorldMap
          color="darkred"
          valueSuffix="people"
          size="responsive"
          data={data}
        />
      </Grid>
      {/* <Grid item xs>
        <GlobeComponent CaseList={CaseList} />
      </Grid> */}
      <Grid item xs>
        <h3>Top 3 Recoverd Countries</h3>
        <BarChartComponent datas={topRecovedData} />
      </Grid>
    </Grid>
  );
};
