<script lang="ts">
  import Header from "../components/Header.svelte";
  import { onMount } from "svelte";

  interface IProduct {
    product: string;
    pricePerProduct: number;
    quantity: string;
  }

  interface IOrder {
    email: String;
    name: String;
    products: [IProduct];
    totalDiscount: number;
    totalPrice: number;
    paymentStatus: String;
  }
  let myOrders: IOrder[] = [];

  async function fetchOrders() {
    try {
      const response = await fetch("api/fetch-orders", {
        method: "GET",
      });

      if (response.status === 200) {
        const responseData = await response.json();
        myOrders = [...myOrders, ...responseData];
      } else if (response.status === 400 || response.status === 401) {
        console.log("Couldn't get products!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  onMount(async () => {
    fetchOrders();
  });
</script>

<header>
  <Header />
</header>

<main>
  {#if myOrders.length > 0}
    <div class="main-container">
      {#each myOrders as order, index (index)}
        <div class="product-container">
          <div class="product-card">
            <div id="description-container">
              <p>Email: {order.email}</p>
              <p>Name: {order.name}</p>
              <p>Discount: {order.totalDiscount}</p>
              <p>Payed: {order.paymentStatus}</p>
              {#each order.products as product, index (index)}
                <div class="one-product-on-order">
                  <p>Name: {product.product}</p>
                  <p>Price: {product.pricePerProduct} SEK</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              {/each}
              <p>TotalPrice: {order.totalPrice} SEK</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>
