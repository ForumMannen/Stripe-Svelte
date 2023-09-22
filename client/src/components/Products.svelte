<script lang="ts">
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

<div class="grid">
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <div class="main-container">
      {#each $productsArray as product (product.id)}
        <div class="product-container">
          <div class="product-card">
            <img src={product.images[0]} alt="Vans backpack" />
            <div id="description-container">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Price: {product.price} kr</p>
              <button on:click={() => handleAddProductToCart(product)}
                >Add to cart</button
              >
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
