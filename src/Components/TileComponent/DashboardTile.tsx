import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { FC } from "react";
import "./DashboardTile.css";

interface ITile {
  title?: string;
  todaysCount?: number;
  total?: number;
}

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "5px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 25,
    color: "green",
    fontFamily: "Roboto Slab",
  },
  pos: {
    marginBottom: 10,
  },
});

export const DashboardTile: FC<ITile> = ({ title, todaysCount, total }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>{title}</Typography>
        <h2>{todaysCount}</h2>
        <Typography color="textSecondary">Total: {total}</Typography>
      </CardContent>
    </Card>
  );
};
