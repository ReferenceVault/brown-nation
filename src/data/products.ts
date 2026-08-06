export type Product = {
  id: string;
  name: string;
  price: number;
  thumbFrom: string;
  thumbTo: string;
};

export const products: Product[] = [
  { id: "kunafa", name: "Kunafa Chocolate Bar", price: 299, thumbFrom: "#8a5a2f", thumbTo: "#3f2413" },
  { id: "paan-orange", name: "Paan Orange Bar", price: 249, thumbFrom: "#c8dfb0", thumbTo: "#5a7a3a" },
  { id: "butterscotch", name: "Butterscotch Bar", price: 249, thumbFrom: "#e8c88a", thumbTo: "#a97a3a" },
  { id: "oreo-crunch", name: "Oreo Crunch Bar", price: 249, thumbFrom: "#5a4a42", thumbTo: "#241c18" },
  { id: "printed", name: "Printed Chocolate", price: 299, thumbFrom: "#3f2413", thumbTo: "#1a0f08" },
];
