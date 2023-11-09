import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CoinSelector = ({ selectedCoin, onSelectCoin }) => {
  return (
    <Select
      value={selectedCoin}
      onChange={(e) => onSelectCoin(e.target.value)}
      sx={{ mt: 2, width: 150, backgroundColor: 'white' }}
    >
      <MenuItem value="btc">BTC</MenuItem>
      <MenuItem value="eth">ETH</MenuItem>
      <MenuItem value="ltc">LTC</MenuItem>
      <MenuItem value="xrp">XPR</MenuItem>
      <MenuItem value="bch">BCH</MenuItem>
    </Select>
  );
};

export default CoinSelector;
