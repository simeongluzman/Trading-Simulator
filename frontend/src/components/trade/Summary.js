// PortfolioValue.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const Summary = ({ portfolio, coinPrices }) => {
  // Calculate the real-time portfolio value by multiplying coin balances with their current prices
  const coinValue = Object.entries(portfolio.coins).reduce((total, [coin, amount]) => {
    const price = coinPrices[coin] !== 'Loading...' ? parseFloat(coinPrices[coin]) : 0;
    return total + (parseFloat(amount) * price);
  }, 0);

  const portfolioValue = coinValue + parseFloat(portfolio.balance);

  return (
    <TableContainer component={Paper} sx={{ width: '50%', margin: '0 auto', mt: 2 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>USD Balance</TableCell>
            <TableCell align="right">${portfolio.balance}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Real-time Portfolio Value</TableCell>
            <TableCell align="right">${portfolioValue.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Summary;
