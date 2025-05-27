import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Quantity</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>{itemName}</Typography>
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
          <IconButton onClick={() => onChange(Math.max(1, quantity - 1))}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="h5">{quantity}</Typography>
          <IconButton onClick={() => onChange(quantity + 1)}>
            <AddIcon />
          </IconButton>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose}>Done</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
