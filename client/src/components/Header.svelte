<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import Modal from "../components/Modal.svelte";
  import Cart from "../pages/Cart.svelte";
  import Icon from "../assets/icons/Icon.svelte";
  import CartIcon from "../assets/icons/CartIcon.svelte";
  import MyOrders from "../pages/MyOrders.svelte";
  import UserIcon from "../assets/icons/UserIcon.svelte";
  import { loggedIn, logout } from "../store/login";
  import { isModalOpen, openModal, content } from "../store/modal";

  function handleLogout() {
    logout();
  }
</script>

<Router>
  <Route path="/cart" component={Cart} />
  <Route path="/myorders" component={MyOrders} />
</Router>

<header>
  <div>
    <Link to="/"><Icon /></Link>
  </div>

  <div>
    <p>Nu 10% Rabatt! Kampanjkod: TEST</p>
  </div>

  <div class="right-content">
    {#if $loggedIn}
      <button on:click={handleLogout} class="userButtons">Logout</button>
    {:else}
      <button on:click={() => openModal("login")} class="userButtons"
        >Login</button
      >
      <button on:click={() => openModal("register")} class="userButtons"
        >Register</button
      >
    {/if}

    <Link to="/cart"><CartIcon /></Link>
    <Link to="/myorders"><UserIcon /></Link>
  </div>

  {#if $isModalOpen && $content}
    <Modal />
  {/if}
</header>
