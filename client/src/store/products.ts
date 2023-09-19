import { writable } from "svelte/store";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  priceId: string;
}

export const productsArray = writable<IProduct[]>([]);

export function updateProductsArray(newData: IProduct[]) {
  productsArray.set(newData);
}
