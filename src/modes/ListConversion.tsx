// src/modes/ListConversion.tsx
import React, { useState } from "react";
import { TextField, Button, Typography, List, ListItem, ListItemText, Divider, Chip, Box } from "@mui/material";
import { mockStore } from "../mockData"; // Your sample store

const parseInput = (input: string): string[] =>
  input
    .split(/[\n,]/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

function ListConversion() {
  const [input, setInput] = useState("");
  const [orderedList, setOrderedList] = useState<string[]>([]);
  const [unknownItems, setUnknownItems] = useState<string[]>([]);

  const handleConvert = () => {
    const rawItems = parseInput(input);
    const sectionOrder = mockStore.sections.map((s: { id: any; }) => s.id);
    const sectionMap: Record<string, string[]> = {};
    mockStore.sections.forEach((section: { id: string | number; }) => {
      sectionMap[section.id] = [];
    });

    const unknown: string[] = [];
    rawItems.forEach((item) => {
      const section = mockStore.sections.find((s: { items: string | string[]; }) =>
        s.items.includes(item)
      );
      if (section) {
        sectionMap[section.id].push(item);
      } else {
        unknown.push(item);
      }
    });

    // Order items by section order
    const ordered = sectionOrder.flatMap((id: string | number) => sectionMap[id]);
    setOrderedList(ordered);
    setUnknownItems(unknown);
  };

  return (
    <Box>
      <Typography variant="subtitle1" mb={2}>
        Paste or type your grocery list below (comma or newline separated):
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={3}
        label="Grocery List"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button
        onClick={handleConvert}
        variant="contained"
        size="large"
        sx={{ mb: 2 }}
      >
        Convert List
      </Button>
      {unknownItems.length > 0 && (
        <>
          <Typography color="error" mt={2} mb={1}>
            Unknown items (drag to list or dismiss in a later version):
          </Typography>
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {unknownItems.map((item) => (
              <Chip key={item} label={item} color="warning" />
            ))}
          </Box>
          <Divider />
        </>
      )}
      <Typography variant="h6" mt={2}>Store-Optimized Order:</Typography>
      <List>
        {orderedList.map((item, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ListConversion;
