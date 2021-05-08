import {
  AppBar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { FC } from "react";
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
    <div className="app__header">
      <Typography variant="h5">Covid 19 UI</Typography>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value={selectedCountry}
          onChange={onSelectedCountryChange}
        >
          <MenuItem value="worldwide">WorldWide</MenuItem>
          {allCountriesName.map((country) => (
            <MenuItem key={country.Code} value={country.Code}>{country.Name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
