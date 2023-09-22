<script>
  import { cartArray, totalCartPrice } from "../store/cart";
  import { loggedIn } from "../store/login";
  import { user } from "../store/user";
  import Header from "../components/Header.svelte";

  async function handlePayment() {
    const cartItems = $cartArray;
    const userData = $user;

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

<header>
  <Header />
</header>

<main>
  <div class="main-container">
    {#if $cartArray.length === 0}
      <p>Your cart is empty :'&#40</p>
    {:else if $cartArray.length > 0}
      {#each $cartArray as cartItem (cartItem.product.id)}
        <div class="product-container">
          <div class="product-card">
            <img src={cartItem.product.images[0]} alt="" />
            <div id="description-container">
              <h4>Name: {cartItem.product.name}</h4>
              <p>Description: {cartItem.product.description}</p>
              <p>Price: {cartItem.product.price} kr</p>
              <p>Quantity: {cartItem.quantity}</p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  <div class="total-price-in-cart">
    <h2>Total price: {$totalCartPrice} SEK</h2>
  </div>
  {#if !$loggedIn}
    <div class="p-tag-cart">
      <p>You have to login to proceed to checkout.</p>
    </div>
  {:else}
    <button on:click={handlePayment}>Pay</button>
  {/if}
</main>
