import { writable } from "svelte/store";
import { updateUser } from "./user";

export const loggedIn = writable(false);

export function setLoggedIn(value: boolean) {
  loggedIn.set(value);
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    const response = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      let user = responseData;
      setLoggedIn(true);
      updateUser(user);
      return true;
    } else if (response.status === 400 || response.status === 401) {
      console.log("Wrong email or password!");
      return false;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logout() {
  try {
    const response = await fetch("api/logout", {
      method: "POST",
    });

    if (response.status === 200) {
      setLoggedIn(false);
      window.location.href = "/";
    } else {
      console.error("Couldn't logout!");
    }
  } catch (error) {
    console.error(error);
  }
}
