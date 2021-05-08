import { CircularProgress } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { AllCountryComponent } from "../../Components/AllCountryComponent";

export const DashboardPage: FC = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "https://corona.lmao.ninja/v2/countries?yesterday=&sort=";

    const LoadAllDetails = async (apiUrl: string) => {
      const apiResponse = await (await fetch(apiUrl)).json();
      return await apiResponse;
    };

    LoadAllDetails(apiUrl).then((response) => {
      setAllCountries(response);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Covid Pendamic State</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <AllCountryComponent allCountryStats={allCountries} />
      )}
    </div>
  );
};
