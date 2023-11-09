import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Portfolio = ({ user, portfolio }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" sx={{ width: '100%', mb: 3 }}>
      <TableContainer component={Paper} sx={{ mt: 1, width: '50%', margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(portfolio.coins).map(([coin, amount]) => (
              <TableRow key={coin}>
                <TableCell component="th" scope="row">
                  {coin.toUpperCase()}
                </TableCell>
                <TableCell align="right">{parseFloat(amount).toFixed(3)}</TableCell>
              </TableRow>
            ))}
            {/* Adding USD balance to the table */}
            <TableRow>
              <TableCell component="th" scope="row">
                USD Balance
              </TableCell>
              <TableCell align="right">${portfolio.balance}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Portfolio;
