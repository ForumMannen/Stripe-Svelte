import { writable } from "svelte/store";
import type { IProduct } from "./products";

interface ICartItem {
  product: IProduct;
  quantity: number;
  pricePerCartItem: number;
  totalCartPrice: number;
}
export const cartArray = writable<ICartItem[]>([]);

export function addProductToCart(product: IProduct) {
  cartArray.update((items) => {
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.pricePerCartItem =
        existingItem.product.price * existingItem.quantity;
      return [...items];
    } else {
      const newItem: ICartItem = {
        product,
        quantity: 1,
        pricePerCartItem: product.price,
        totalCartPrice: product.price,
      };
      items.push(newItem);
    }

    const totalCartPrice = items.reduce((total, item) => {
      return total + item.pricePerCartItem;
    }, 0);

    items.forEach((item) => (item.totalCartPrice = totalCartPrice));

    return [...items];
  });
}

export function clearCart() {
  cartArray.set([]);
}
