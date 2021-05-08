import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { FC } from "react";

interface ITile {
  title?: string;
  todaysCount?: number;
  total?: number;
}

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    // maxWidth: 350,
  },
  bullet: {
    display: "inline-block",
    margin: "0 5px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 30,
  },
  pos: {
    marginBottom: 12,
  },
});

export const DashboardTile: FC<ITile> = ({ title, todaysCount, total }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="primary">
          {title}
        </Typography>
        <h1>{todaysCount}</h1>
        <Typography color="textSecondary">{total} total</Typography>
      </CardContent>
    </Card>
  );
};
