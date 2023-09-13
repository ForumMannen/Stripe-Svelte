<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import { SvelteUIProvider } from "@svelteuidev/core";
  import Confirmation from "./components/Confirmation.svelte";
</script>

<SvelteUIProvider>
  <Router>
    <Route path="/" component={Home} />
  </Router>
</SvelteUIProvider>

<style>
</style>
