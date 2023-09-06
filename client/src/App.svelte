<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./components/Home.svelte";
  import Confirmation from "./components/Confirmation.svelte";
  import Login from "./components/Login.svelte";
</script>

<Login />
<Router>
  <div>
    <Route path="/" component={Home}/>
    <Route path="/confirmation" component={Confirmation}/>
  </div>
</Router>

<style>

</style>