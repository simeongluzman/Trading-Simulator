// PriceTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from '@mui/material';

const PriceTable = ({ coinPrices }) => {
  return (
    <TableContainer component={Paper} sx={{ width: '70%', margin: '0 auto', mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell align="right">Ask Price</TableCell>
            <TableCell align="right">Bid Price</TableCell> {/* Assuming you'll have bid prices too */}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(coinPrices).map(([coin, price]) => (
            <TableRow key={coin}>
              <TableCell>{coin.toUpperCase()}</TableCell>
              <TableCell align="right">${price}</TableCell> {/* This is for ask price */}
              <TableCell align="right">$TBD</TableCell> {/* This is for bid price, you'll need to replace with the real value */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PriceTable;
