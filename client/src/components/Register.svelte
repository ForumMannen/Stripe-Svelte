<script>
  import { closeModal } from "../store/modal";
  let user = null;
  let name = "";
  let email = "";
  let password = "";

  async function registerUser() {
    try {
      const response = await fetch("api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 201) {
        closeModal();
        const responseData = await response.json();
        user = responseData;
      } else if (response.status === 400 || response.status === 401) {
        console.log("User already exists!");
      }
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div>
  <input type="text" id="name" bind:value={name} placeholder="Name" />
  <input type="email" id="email" bind:value={email} placeholder="Email" />
  <input
    type="password"
    id="password"
    bind:value={password}
    placeholder="Password"
  />
  <button on:click={registerUser}>Register</button>
</div>
