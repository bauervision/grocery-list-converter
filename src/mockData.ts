// src/mockData.ts
import { ShoppingItem, Store } from "./types";

export const mockShoppingList: ShoppingItem[] = [
  { id: "1", name: "apples", section: "Produce", price: 1.2, quantity: 1 },
  { id: "2", name: "bread", section: "Bread", price: 2.5, quantity: 1 },
  { id: "3", name: "wine", section: "Wine", price: 12, quantity: 1 },
  { id: "4", name: "tp", section: "Paper", price: 7.5, quantity: 1 },
  { id: "5", name: "pt", section: "Paper", price: 3.5, quantity: 1 },
  { id: "6", name: "milk", section: "Dairy", price: 3, quantity: 1 },
  { id: "7", name: "cereal", section: "Cereal", price: 4, quantity: 1 },
  { id: "8", name: "soda", section: "Drinks", price: 1.8, quantity: 1 },
];

export const mockStore: Store = {
  id: "my-store",
  name: "Local Grocery",
  sections: [
    { id: "produce", name: "Produce", items: ["apples", "bananas", "lettuce", "avocados"] },
    { id: "bread", name: "Bread", items: ["bread", "bagels"] },
    { id: "wine", name: "Wine", items: ["wine", "beer"] },
    { id: "meats", name: "Meats", items: ["chicken", "beef"] },
    { id: "cereal", name: "Cereal", items: ["cereal", "oatmeal"] },
    { id: "frozen", name: "Frozen", items: ["pizza", "ice cream"] },
    { id: "dairy", name: "Dairy", items: ["milk", "cheese", "eggs"] },
    // ... add more
  ],
};