import "./CaseTable.css";
import { FC } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { ICaseTable } from "../../Interfaces/IDashboardCaseTable";

export const CaseTable: FC<ICaseTable> = ({ CaseList }) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table size="small" aria-label="">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="right">Cases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {CaseList.map(({ country, cases }) => (
            <TableRow key={country}>
              <TableCell component="th" scope="row">
                {country}
              </TableCell>
              <TableCell align="right">{cases}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
