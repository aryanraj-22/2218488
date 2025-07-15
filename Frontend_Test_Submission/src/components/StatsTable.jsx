import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";

const StatsTable = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return <Typography>No statistics to show.</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Timestamp</TableCell>
          <TableCell>Referrer</TableCell>
          <TableCell>Location</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stats.map((click, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
            <TableCell>{click.referrer || "N/A"}</TableCell>
            <TableCell>{click.location || "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StatsTable;