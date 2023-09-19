interface UserData {
  id: string;
  email: string;
  name: string;
}

import { writable } from "svelte/store";

export const user = writable<UserData | null>(null);

export function updateUser(userData: UserData | null) {
  user.set(userData);
}
