<script>
  import { login } from "../store/login";
  import { closeModal } from "../store/modal";

  let email = "";
  let password = "";

  async function loginUser() {
    try {
      const success = await login(email, password);

      if (success) {
        closeModal();
      }
    } catch (error) {}
  }
</script>

<div>
  <input type="email" id="email" bind:value={email} placeholder="Email" />
  <input
    type="password"
    id="password"
    bind:value={password}
    placeholder="Password"
  />
  <button on:click={loginUser}>Log in</button>
</div>
