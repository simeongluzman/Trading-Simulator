import React from 'react';
import Button from '@mui/material/Button';

const Actions = ({ onBuy, onSell }) => {
  return (
    <div>
      <Button variant="contained" color="success" onClick={onBuy} sx={{ mt: 2 }}>
        Buy
      </Button>
      <Button variant="contained" color="error" onClick={onSell} sx={{ mt: 2, ml: 1 }}>
        Sell
      </Button>
    </div>
  );
};

export default Actions;
