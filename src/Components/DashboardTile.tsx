import { Card, CardContent, Typography } from "@material-ui/core";
import { FC } from "react";

interface ITile {
  title?: string;
  today?: number;
  total?: number;
}

export const DashboardTile: FC<ITile> = ({ title, today, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2>{today}</h2>
        <Typography color="textSecondary">{total} total</Typography>
      </CardContent>
    </Card>
  );
};
