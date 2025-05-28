import EditIcon from '@mui/icons-material/Edit';
import RestoreIcon from '@mui/icons-material/Restore';
import {
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { EditQuantityDialog } from '../components/EditQuantityDialog';
import { mockShoppingList } from '../mockData';
import { SECTION_COLORS } from '../sectionColors';
import { ShoppingItem } from '../types';

function genId() {
  return Math.random().toString(36).substring(2, 10);
}

const ShoppingMode: React.FC = () => {
  const [activeItems, setActiveItems] = useState<ShoppingItem[]>(mockShoppingList);
  const [acquiredItems, setAcquiredItems] = useState<ShoppingItem[]>([]);
  const [showAcquired, setShowAcquired] = useState(false);

  // Impulse dialog state
  const [impulseOpen, setImpulseOpen] = useState(false);
  const [impulseQuery, setImpulseQuery] = useState('');
  const [impulseResults, setImpulseResults] = useState<ShoppingItem[]>([]);
  const [impulseStep, setImpulseStep] = useState<'search' | 'add'>('search');
  const [impulseNew, setImpulseNew] = useState<{ name: string; section: string; price: number }>({
    name: '',
    section: '',
    price: 0,
  });

  // Edit quantity dialog state
  const [editQty, setEditQty] = useState<{ id: string; name: string; value: number } | null>(null);

  // Estimated total
  const estimatedTotal = useMemo(
    () => acquiredItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [acquiredItems],
  );

  // -- Handlers --
  const handleAcquire = (item: ShoppingItem) => {
    setActiveItems((list) => list.filter((i) => i.id !== item.id));
    setAcquiredItems((list) => [{ ...item }, ...list]);
  };

  const restoreItem = (item: ShoppingItem) => {
    setAcquiredItems((list) => list.filter((i) => i.id !== item.id));
    setActiveItems((list) => [...list, { ...item }]);
  };

  // Quantity editing handlers
  const handleEditQty = (item: ShoppingItem) => {
    setEditQty({ id: item.id, name: item.name, value: item.quantity });
  };
  const handleQtyChange = (qty: number) => {
    setEditQty((prev) => (prev ? { ...prev, value: qty } : prev));
  };
  const handleQtyDone = () => {
    if (editQty) {
      setActiveItems((list) =>
        list.map((i) => (i.id === editQty.id ? { ...i, quantity: editQty.value } : i)),
      );
    }
    setEditQty(null);
  };

  // Impulse dialog handlers (same as before)
  const openImpulse = () => {
    setImpulseOpen(true);
    setImpulseQuery('');
    setImpulseResults([]);
    setImpulseStep('search');
    setImpulseNew({ name: '', section: '', price: 0 });
  };
  const searchImpulse = (query: string) => {
    setImpulseQuery(query);
    const results = [...activeItems, ...acquiredItems].filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
    setImpulseResults(results);
  };
  const handleImpulseSelect = (item: ShoppingItem) => {
    if (activeItems.find((i) => i.id === item.id)) {
      setActiveItems((list) =>
        list.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
      );
    } else {
      setActiveItems((list) => [...list, { ...item, quantity: 1 }]);
    }
    setImpulseOpen(false);
  };
  const handleImpulseAdd = () => {
    const newItem: ShoppingItem = {
      id: genId(),
      name: impulseNew.name,
      section: impulseNew.section,
      price: impulseNew.price,
      quantity: 1,
    };
    setActiveItems((list) => [...list, newItem]);
    setImpulseOpen(false);
  };

  // Swipeable list actions
  const leadingActions = (item: ShoppingItem) => (
    <LeadingActions>
      <SwipeAction onClick={() => handleAcquire(item)}>
        <Box sx={{ bgcolor: 'success.main', color: '#fff', p: 2 }}>Got it</Box>
      </SwipeAction>
    </LeadingActions>
  );
  const trailingActions = (item: ShoppingItem) => (
    <TrailingActions>
      <SwipeAction onClick={() => handleAcquire(item)}>
        <Box sx={{ bgcolor: 'success.main', color: '#fff', p: 2 }}>Got it</Box>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <Box
      sx={{
        flexDirection: 'column',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {/* Estimated total */}
      <Paper elevation={2} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">Estimated Total</Typography>
        <Typography variant="h6">${estimatedTotal.toFixed(2)}</Typography>
      </Paper>

      {/* Swipeable shopping list */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Shopping List
      </Typography>
      {activeItems.length === 0 ? (
        <Typography color="text.secondary">All items acquired!</Typography>
      ) : (
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
          }}
        >
          <SwipeableList>
            {activeItems.map((item) => (
              <SwipeableListItem
                key={item.id}
                leadingActions={leadingActions(item)}
                trailingActions={trailingActions(item)}
              >
                <ListItem
                  sx={{
                    borderRadius: 2,
                    mb: 1.5,
                    boxShadow: '0 1px 4px rgba(80,80,120,0.06)',
                    bgcolor: '#fff',
                    pl: 0,
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: 56,
                  }}
                  secondaryAction={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Chip
                        label={
                          item.quantity > 1
                            ? `$${item.price.toFixed(2)} × ${item.quantity} = $${(
                                item.price * item.quantity
                              ).toFixed(2)}`
                            : `$${item.price.toFixed(2)}`
                        }
                        color="primary"
                        size="small"
                      />

                      <IconButton size="small" onClick={() => handleEditQty(item)} sx={{ ml: 1 }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  }
                >
                  {/* Colored section bar */}
                  <Box
                    sx={{
                      width: 7,
                      bgcolor: SECTION_COLORS[item.section] || SECTION_COLORS.Default,
                      height: '80%',
                      borderRadius: '8px',
                      position: 'absolute',
                      left: 0,
                      top: '10%',
                      bottom: '10%',
                    }}
                  />
                  <ListItemText
                    sx={{ pl: 2, minWidth: 0 }}
                    primary={
                      <Typography variant="body1" fontWeight={500}>
                        {item.name}
                        {item.quantity > 1 && (
                          <Typography
                            component="span"
                            sx={{ ml: 0.5 }}
                            color="text.secondary"
                            variant="body2"
                          >
                            ×{item.quantity}
                          </Typography>
                        )}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {item.section}
                      </Typography>
                    }
                  />
                </ListItem>
              </SwipeableListItem>
            ))}
          </SwipeableList>
        </Box>
      )}

      {/* Restore acquired items */}
      <Button
        startIcon={<RestoreIcon />}
        fullWidth
        onClick={() => setShowAcquired((prev) => !prev)}
        sx={{ mt: 2, mb: 1 }}
        variant="outlined"
      >
        {showAcquired ? 'Hide Acquired Items' : 'Show Acquired Items'}
      </Button>
      {showAcquired && (
        <List dense>
          {acquiredItems.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                opacity: 0.5,
                textDecoration: 'line-through',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                ':hover': { opacity: 0.9 },
              }}
              onClick={() => restoreItem(item)}
              disablePadding
            >
              <ListItemText
                primary={
                  <>
                    {item.name}
                    {item.quantity > 1 && (
                      <Typography component="span" sx={{ ml: 0.5 }} color="text.secondary">
                        ×{item.quantity}
                      </Typography>
                    )}
                  </>
                }
                secondary={
                  item.quantity > 1
                    ? `${item.section} – $${item.price.toFixed(2)} × ${item.quantity} = $${(
                        item.price * item.quantity
                      ).toFixed(2)}`
                    : `${item.section} – $${item.price.toFixed(2)}`
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Edit Quantity Dialog */}
      {editQty && (
        <EditQuantityDialog
          open={!!editQty}
          itemName={editQty.name}
          quantity={editQty.value}
          onChange={handleQtyChange}
          onClose={handleQtyDone}
        />
      )}
    </Box>
  );
};

export default ShoppingMode;
