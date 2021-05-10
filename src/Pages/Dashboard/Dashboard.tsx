import { Card, CardContent, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CaseTable } from "../../Components/CaseTableComponent/CaseTable";
import { DashboardTile } from "../../Components/TileComponent/DashboardTile";
import { HistoricalChart } from "../../Components/WorldChartComponent/WorldWideChart";
import { AllCountriesApiUrl, AllInfoUrl } from "../../Helper/UrlHelper";
import { ICountryInterface } from "../../Interfaces/ICountryInterface";
import { ICountryName } from "../../Interfaces/ICountryName";
import { IWorldWideInfo } from "../../Interfaces/IWorldWideInfo";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";

export const Dashboard = () => {
  const [tileInfo, setTileInfo] = useState<IWorldWideInfo>();
  const [summaryInfo, setSummaryInfo] = useState<IWorldWideInfo>();
  const [countryNames, setCountryNames] = useState<ICountryName[]>([]);
  const [allInformationByCountries, setAllInformations] = useState<
    ICountryInterface[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("worldwide");

  const onSelectedCountryChange = async (event: any) => {
    const countryCode = event.target.value;
    if (countryCode === "worldwide") {
      if (summaryInfo) {
        setTileInfo(summaryInfo);
      } else {
        await getSummaryAsync();
      }
    } else {
      setSelectedCountry(countryCode);
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

  const getSummaryAsync = async () => {
    let data = await (await fetch(AllInfoUrl)).json();
    setTileInfo(data);
    setSummaryInfo(data);
  };

  const getAllInformationsByCountryAsync = async () => {
    let data = await (await fetch(AllCountriesApiUrl)).json();
    var sortedResponse = data.sort();
    setAllInformations(sortedResponse);
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
    getSummaryAsync();
  }, []);

  return (
    <div>
      <Grid container spacing={2} direction="row">
        <Grid item xs={8}>
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
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <h4>Cases List by Country</h4>
              <CaseTable CaseList={allInformationByCountries} />
              <h4>World Wide New Cases</h4>
              <HistoricalChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};
