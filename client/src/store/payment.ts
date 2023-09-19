import { writable } from "svelte/store";

export const isPaymentVerified = writable(false);

export function setIsPaymentVerified(success: boolean) {
  isPaymentVerified.set(success);
}
