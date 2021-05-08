import { useEffect, useState } from "react";
import "./App.css";
import { DashboardTile } from "./Components/DashboardTile";
import { CountriesApiUrl } from "./Helper/UrlHelper";
import { ICountryInterface } from "./Interfaces/CountryInterface";
import { ICountryName } from "./Interfaces/ICountryName";
import { Navbar } from "./Pages/Navbar/Navbar";

function App() {
  const [countries, setCountries] = useState<ICountryName[]>([]);
  const [country, setCountry] = useState<string>("worldwide");

  const onSelectedCountryChange = async (event: any) => {
    const countryCode = event.target.value;
    console.log("County Code: " + countryCode);
    setCountry(countryCode);
  };

  useEffect(() => {
    const getCountriesAsync = async () => {
      await fetch(CountriesApiUrl)
        .then((response) => response.json())
        .then((data) => {
          const countriesArray = data.map((x: ICountryInterface) => ({
            Name: x.country,
            Code: x.countryInfo.iso3,
          }));
          setCountries(countriesArray);
        });
    };
    getCountriesAsync();
  }, []);

  return (
    <div className="app">
      <div className="left_container">
        <Navbar
          allCountriesName={countries}
          selectedCountry={country}
          onSelectedCountryChange={onSelectedCountryChange}
        />
        <div className="app_stats">
          <DashboardTile title="Coronavirus Cases" cases={12} total={200} />
          <DashboardTile title="Recovered" cases={12} total={300} />
          <DashboardTile title="Deaths" cases={12} total={500} />
        </div>
      </div>
    </div>
  );
}

export default App;
