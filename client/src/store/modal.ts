import { writable } from "svelte/store";

export const isModalOpen = writable(false);

export const content = writable("");

export function openModal(contentType: string) {
  content.set(contentType);
  isModalOpen.set(true);
}

export function closeModal() {
  content.set("");
  isModalOpen.set(false);
}
