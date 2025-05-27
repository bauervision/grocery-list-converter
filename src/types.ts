// src/types.ts
export type StoreSection = {
  id: string;
  name: string;
  items: string[]; // Lowercase, for matching
};

export type Store = {
  id: string;
  name: string;
  sections: StoreSection[];
};



export interface ShoppingItem {
  id: string;
  name: string;
  section: string;
  price: number;
  quantity: number;
}