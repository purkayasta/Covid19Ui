import { Card, CardContent, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CaseTable } from "../../Components/CaseTableComponent/CaseTable";
import { MapChartComponent } from "../../Components/MapComponent/MapChartComponent";
import { DashboardTile } from "../../Components/TileComponent/DashboardTile";
import { HistoricalChart } from "../../Components/WorldChartComponent/HistoricalChart";
import { AllCountriesApiUrl } from "../../Helper/UrlHelper";
import { ICountryInterface } from "../../Interfaces/ICountryInterface";
import { ICountryName } from "../../Interfaces/ICountryName";
import { IWorldWideInfo } from "../../Interfaces/IWorldWideInfo";
import { Navbar } from "../Navbar/Navbar";

export const Dashboard = () => {
  const [tileInfo, setTileInfo] = useState<IWorldWideInfo>();
  const [countryNames, setCountryNames] = useState<ICountryName[]>([]);
  const [allInformationByCountries, setAllInformations] = useState<
    ICountryInterface[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("BD");

  const [selectedCountryName, setSelectedCountryName] =
    useState<string>("Bangladesh");

  const onSelectedCountryChange = async (event: any) => {
    let countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setTile(countryCode);
    var name = countryNames.filter((x) => x.Code === countryCode);
    if (name) {
      setSelectedCountryName(name[0]?.Name);
    } else {
      setSelectedCountryName("Bangladesh");
    }
  };

  const setTile = (countryCode: string) => {
    console.log("Set tile called");
    if (allInformationByCountries.length > 0) {
      const selectedCodeInfo = allInformationByCountries.find(
        (y) => y.countryInfo.iso2 === countryCode
      );

      const selectedCountryTileInfo: IWorldWideInfo = {
        cases: selectedCodeInfo?.cases,
        todayCases: selectedCodeInfo?.todayCases,
        deaths: selectedCodeInfo?.deaths,
        todayDeaths: selectedCodeInfo?.todayDeaths,
        recovered: selectedCodeInfo?.recovered,
        active: selectedCodeInfo?.active,
        critical: selectedCodeInfo?.critical,
        todayRecovered: selectedCodeInfo?.todayRecovered,
      };

      setTileInfo(selectedCountryTileInfo);
    }
  };

  const getAllInformationsByCountryAsync = async () => {
    let data = await (await fetch(AllCountriesApiUrl)).json();
    var sortedResponse = data.sort();
    setAllInformations(sortedResponse);
    console.log("Get All Info Checked");
    const countriesArray = sortedResponse.map((x: ICountryInterface) => ({
      Name: x.country,
      Code: x.countryInfo.iso2,
      Updated: x.updated,
      CountryInfo: x.countryInfo,
    }));
    setCountryNames(countriesArray);
  };

  useEffect(() => {
    getAllInformationsByCountryAsync();
  }, []);

  useEffect(() => {
    setTile(selectedCountry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allInformationByCountries, selectedCountry]);

  return (
    <div>
      <Grid container spacing={3} direction="row">
        <Grid item xs={12}>
          <Navbar
            allCountriesName={countryNames}
            selectedCountry={selectedCountry}
            onSelectedCountryChange={onSelectedCountryChange}
          />

          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs>
                  <DashboardTile
                    title="Affected Cases"
                    todaysCount={tileInfo?.todayCases}
                    total={tileInfo?.cases}
                  />
                </Grid>
                <Grid item xs>
                  <DashboardTile
                    title="Deaths"
                    todaysCount={tileInfo?.todayDeaths}
                    total={tileInfo?.deaths}
                  />
                </Grid>
                <Grid item xs>
                  <DashboardTile
                    title="Recovered"
                    todaysCount={tileInfo?.recovered}
                    total={tileInfo?.recovered}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs>
                  <HistoricalChart countryName={selectedCountryName} />
                </Grid>
                <Grid item xs>
                  <Card>
                    <CardContent>
                      <h4>Cases List by Country</h4>
                      <CaseTable CaseList={allInformationByCountries} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <MapChartComponent CaseList={allInformationByCountries} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
