<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import { SvelteUIProvider } from "@svelteuidev/core";
  import Success from "./components/Success.svelte";
  import Cart from "./pages/Cart.svelte";
  import MyOrders from "./pages/MyOrders.svelte";
</script>

<SvelteUIProvider>
  <Router>
    <Route path="/" component={Home} />
    <Route path="/cart" component={Cart} />
    <Route path="/success" component={Success} />
    <Route path="/myorders" component={MyOrders} />
  </Router>
</SvelteUIProvider>

<div class="bg" />
