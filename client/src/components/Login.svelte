<script>
  import { loggedIn, setLoggedIn } from "../store/login";
  import { updateUser } from "../store/user";

  let user = null;
  let email = "";
  let password = "";

  async function loginUser() {
    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData);
        user = responseData;
        setLoggedIn(true);
        updateUser(responseData);
      } else if (response.status === 400 || response.status === 401) {
        console.log("Wrong email or password!");
      }
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div>
  <input type="email" id="email" bind:value={email} />
  <input type="password" id="password" bind:value={password} />
  <button on:click={loginUser}>Logga in</button>
</div>
