<script lang="ts">
  import { closeModal, content } from "../store/modal";
  import Login from "./Login.svelte";
  import Register from "./Register.svelte";
</script>

<div class="modal">
  <div class="modal-content">
    <div class="close-btn">
      <button on:click={closeModal}>Close</button>
    </div>
    {#if $content === "login" || $content === "register"}
      {#if $content === "login"}
        <div class="login-register-container">
          <h2>Login</h2>
          <Login />
        </div>
      {:else if $content === "register"}
        <div class="login-register-container">
          <h2>Register</h2>
          <Register />
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex end;
    width: 50%;
    height: 50%;
    background-color: white;
    border-radius: 3rem;
    padding: 1rem;
  }

  .close-btn {
    align-self: flex-end;
    top: 1rem;
  }

  .login-register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }
</style>
