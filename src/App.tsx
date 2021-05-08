import { Card, CardContent } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import { DashboardCaseList } from "./Components/DashboardCaseListComponent/DashboardCaseList";
import { DashboardTile } from "./Components/DashboardTile";
import { HistoricalChart } from "./Components/HistoricalDataComponent/WorldWideChart";
import { AllCountriesApiUrl, AllInfoUrl } from "./Helper/UrlHelper";
import { ICountryInterface } from "./Interfaces/ICountryInterface";
import { ICountryName } from "./Interfaces/ICountryName";
import { IWorldWideInfo } from "./Interfaces/IWorldWideInfo";
import { Navbar } from "./Pages/Navbar/Navbar";

function App() {
  const [tileInfo, setTileInfo] = useState<IWorldWideInfo>();
  const [countryNames, setCountryNames] = useState<ICountryName[]>([]);
  const [summaryInfo, setSummaryInfo] = useState<IWorldWideInfo>();

  const [allInformationByCountries, setAllInformations] = useState<
    ICountryInterface[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("worldwide");

  const onSelectedCountryChange = async (event: any) => {
    const countryCode = event.target.value;
    console.log("County Code: " + countryCode);

    if (countryCode === "worldwide") {
      if (summaryInfo) {
        setTileInfo(summaryInfo);
      } else {
        await getSummaryAsync();
      }
    } else {
      setSelectedCountry(countryCode);
      const selectedCodeInfo = allInformationByCountries.find(
        (y) => y.countryInfo.iso3 === countryCode
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
    await fetch(AllInfoUrl)
      .then((response) => response.json())
      .then((data) => {
        setTileInfo(data);
        setSummaryInfo(data);
      });
  };

  const getAllInformationsByCountryAsync = async () => {
    await fetch(AllCountriesApiUrl)
      .then((response) => response.json())
      .then((data) => {
        var sortedResponse = data.sort();
        setAllInformations(sortedResponse);
        const countriesArray = sortedResponse.map((x: ICountryInterface) => ({
          Name: x.country,
          Code: x.countryInfo.iso3,
        }));
        setCountryNames(countriesArray);
      });
  };

  useEffect(() => {
    getAllInformationsByCountryAsync();
    getSummaryAsync();
  }, []);

  return (
    <div className="app">
      <div className="left_container">
        <Navbar
          allCountriesName={countryNames}
          selectedCountry={selectedCountry}
          onSelectedCountryChange={onSelectedCountryChange}
        />
        <div className="app_stats">
          <DashboardTile
            title="Todays Cases"
            today={tileInfo?.todayCases}
            total={tileInfo?.cases}
          />
          <DashboardTile
            title="Deaths"
            today={tileInfo?.todayDeaths}
            total={tileInfo?.deaths}
          />
          <DashboardTile
            title="Recovered"
            today={tileInfo?.recovered}
            total={tileInfo?.recovered}
          />
        </div>
      </div>
      <div className="right_container">
        <Card>
          <CardContent>
            <h4>Cases List by Country</h4>
            <DashboardCaseList CaseList={allInformationByCountries} />
            <h4>World Wide New Cases</h4>
            <HistoricalChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
