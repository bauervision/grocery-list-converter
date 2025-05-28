import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import DeviceDialogBox from './DeviceDialogBox'; // Import your reusable dialog

interface EditQuantityDialogProps {
  open: boolean;
  itemName: string;
  quantity: number;
  onChange: (qty: number) => void;
  onClose: () => void;
}

export const EditQuantityDialog: React.FC<EditQuantityDialogProps> = ({
  open,
  itemName,
  quantity,
  onChange,
  onClose,
}) => {
  return (
    <DeviceDialogBox open={open} onClose={onClose}>
      {/* Dialog header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          px: 3,
          py: 2,
          mb: 1,
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">Edit Quantity</Typography>
      </Box>

      {/* Item name */}
      <Typography sx={{ mb: 2, textAlign: 'center', mt: 2 }}>{itemName}</Typography>

      {/* Quantity controls */}
      <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
        <IconButton onClick={() => onChange(Math.max(1, quantity - 1))}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="h5">{quantity}</Typography>
        <IconButton onClick={() => onChange(quantity + 1)}>
          <AddIcon />
        </IconButton>
      </Stack>

      {/* Action button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Done
        </Button>
      </Box>
    </DeviceDialogBox>
  );
};
