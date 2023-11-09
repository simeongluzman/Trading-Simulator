import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const Input = ({ tradeAmount, onAmountChange, expectedAmount }) => {
  const formattedAmount = isNaN(expectedAmount) ? "0.00" : expectedAmount.toFixed(2);

  return (
    <TextField
      value={tradeAmount}
      onChange={onAmountChange}
      sx={{ mt: 2, backgroundColor: 'white', borderRadius: '4px' }}
      variant="outlined"
      placeholder="Enter Amount"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            ${formattedAmount}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Input;
