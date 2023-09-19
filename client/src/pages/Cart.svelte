<script>
  import { cartArray } from "../store/cart";
  import { loggedIn } from "../store/login";
  import { user } from "../store/user";

  async function handlePayment() {
    const cartItems = $cartArray;
    const userData = $user;

    if (!$loggedIn) {
      console.log("Logga in för att kunna handla");
    }
    console.log(cartItems);
    const response = await fetch("api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems, userData }),
    });

    if (!response.ok) {
      console.error("Request failed:", response.status);
      return;
    }
    try {
      const responseData = await response.json();
      const { url, sessionId } = responseData;
      sessionStorage.setItem("session-id", sessionId);
      window.location = url;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
</script>

<div>
  {#if $loggedIn}
    <button on:click={handlePayment}>Betala</button>
  {:else}
    <p>Logga in för att betala</p>
  {/if}
</div>
