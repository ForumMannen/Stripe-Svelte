<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import { SvelteUIProvider } from "@svelteuidev/core";
  import Success from "./components/Success.svelte";
  import Cart from "./pages/Cart.svelte";
</script>

<SvelteUIProvider>
  <Router>
    <Route path="/" component={Home} />
    <Route path="/cart" component={Cart} />
    <Route path="/success" component={Success} />
  </Router>
</SvelteUIProvider>

<style>
</style>
