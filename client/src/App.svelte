<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Confirmation from "./components/Confirmation.svelte";
</script>

<Router>
  <div>
    <Route path="/" component={Home} />
  </div>
</Router>

<style>
</style>
