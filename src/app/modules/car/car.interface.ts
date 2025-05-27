export type Car = {
  brand: string;
  model: string;
  year: number;
  price: number;
  image?: string;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description: string;
  quantity: number;
  inStock: boolean;
};
