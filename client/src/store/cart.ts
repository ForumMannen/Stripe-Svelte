import { writable } from "svelte/store";
import type { IProduct } from "./products";

interface ICartItem {
  product: IProduct;
  quantity: number;
  pricePerCartItem: number;
  totalCartPrice: number;
}

export const cartArray = writable<ICartItem[]>([]);

// function calculateTotalCartPrice(cartItems: ICartItem[]): number {
//   return cartItems.reduce((total, item) => {
//     return total + item.product.price * item.quantity;
//   }, 0);
// }

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
        totalCartPrice: 0,
      };
      // console.log("Product added to cart", newItem);
      items.push(newItem);
    }
    // const totalCartPrice = calculateTotalCartPrice(items);
    const totalCartPrice = items.reduce((total, item) => {
      return total + item.pricePerCartItem;
    }, 0);

    items.forEach((item) => (item.totalCartPrice = totalCartPrice));
    console.log(items);

    return [...items];
  });
}
