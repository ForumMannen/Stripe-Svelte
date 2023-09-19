<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import Cart from "../pages/Cart.svelte";
  import { onDestroy, onMount } from "svelte";
  import { productsArray, updateProductsArray } from "../store/products";
  import { addProductToCart, cartArray } from "../store/cart";
  import type { IProduct } from "../store/products";

  let isLoading = true;

  async function fetchingProducts() {
    try {
      const response = await fetch("api/products", {
        method: "GET",
      });

      if (response.status === 200) {
        const responseData = await response.json();
        updateProductsArray(responseData);
        isLoading = false;
      } else if (response.status === 400 || response.status === 401) {
        console.log("Couldn't get products!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  let cartItems = [];
  const unsubscribe = cartArray.subscribe((items) => {
    cartItems = items;
  });

  function handleAddProductToCart(product: IProduct) {
    addProductToCart(product);
  }

  onMount(async () => {
    await fetchingProducts();
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<Router>
  <Route path="/cart" component={Cart} />
</Router>

<Link to="/cart">Din kundvagn</Link>

{#if isLoading}
  <p>Loading...</p>
{:else}
  {#each $productsArray as product (product.id)}
    <div id="description-container">
      <h4>Name: {product.name}</h4>
      <p>Description: {product.description}</p>
      <p>Price: {product.price} kr</p>
    </div>
    {#each product.images as imageURL (imageURL)}
      <div>
        <img src={imageURL} alt="" />
      </div>
    {/each}
    <button on:click={() => handleAddProductToCart(product)}
      >Lägg i varukorg</button
    >
  {/each}
{/if}
