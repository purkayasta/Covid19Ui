import { FormControl, MenuItem, Select } from "@material-ui/core";
import { FC } from "react";
import { ICountryName } from "../../Interfaces/ICountryName";
import "./Navbar.css";

interface INavbar {
  allCountriesName: ICountryName[];
  selectedCountry: string;
  onSelectedCountryChange: any;
}

export const Navbar: FC<INavbar> = ({
  allCountriesName,
  selectedCountry,
  onSelectedCountryChange,
}) => {
  return (
    <div className="app_header">
      <h1 className="headerFont">Covid 19 Dashboard</h1>
      <FormControl>
        <Select
          variant="outlined"
          value={selectedCountry}
          onChange={onSelectedCountryChange}
        >
          <MenuItem value="worldwide">WorldWide</MenuItem>
          {allCountriesName.map((country) => (
            <MenuItem key={country.Name} value={country.Code}>
              {country.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
