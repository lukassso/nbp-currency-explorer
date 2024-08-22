import React from "react";
import { Link } from "react-router-dom";
import { Table, TableRow, TableHeader, TableCell } from "./index";
import { Button } from "@/components/ui/button";
import styles from "./table.module.scss";
import type { CurrencyTable } from "@/types";

const CurrencyTable: React.FC<CurrencyTable> = ({ rates }) => {
  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader>Currency</TableHeader>
          <TableHeader>Code</TableHeader>
          <TableHeader>Rate</TableHeader>
          <TableHeader>Action</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {rates.map((rate) => (
          <TableRow key={rate.code}>
            <TableCell>{rate.currency}</TableCell>
            <TableCell>{rate.code}</TableCell>
            <TableCell className={styles.boldText}>
              {rate.mid.toFixed(4)}
            </TableCell>
            <TableCell>
              <Link to={`/currency/${rate.code}`}>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default CurrencyTable;
