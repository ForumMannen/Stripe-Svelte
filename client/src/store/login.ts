import { writable } from "svelte/store";

export const loggedIn = writable(false);

export function setLoggedIn(value: boolean) {
  loggedIn.set(value);
}
