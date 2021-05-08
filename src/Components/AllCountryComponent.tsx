import {
  createStyles,
  GridList,
  GridListTile,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { FC } from "react";
import { ICountryInterface } from "../Interfaces/CountryInterface";
import { CountryDetailComponent } from "./CountryDetailComponent";

interface IAllContries {
  allCountryStats: ICountryInterface[];
}

export const AllCountryComponent: FC<IAllContries> = ({ allCountryStats }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: 1366,
        height: 500,
      },
    })
  );
  const classes = useStyles();

  return (
    <GridList cellHeight={350} className={classes.gridList} cols={4}>
      {allCountryStats.map((response: ICountryInterface) => (
        <GridListTile key={response.country}>
          <CountryDetailComponent countryStat={response} />
        </GridListTile>
      ))}
    </GridList>
  );
};
