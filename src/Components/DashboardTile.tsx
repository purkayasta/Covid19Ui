import { Card, CardContent, Typography } from "@material-ui/core";
import { FC } from "react";

interface ITile {
  title?: string;
  cases?: number;
  total?: number;
}

export const DashboardTile: FC<ITile> = ({ title, cases, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2>{cases}</h2>
        <Typography color="textSecondary">{total} total</Typography>
      </CardContent>
    </Card>
  );
};
