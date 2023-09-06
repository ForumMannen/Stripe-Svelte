<script>
    let user = null;
    let email = "";
    let password = "";

    async function loginUser(){
        console.log("Login button clicked");

        if(email){
            try{
                const response = await fetch(`/api/users/login/${email}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password })
                });

                if(response.status === 200){
                    user = await response.json();
                    console.log(response.json());
                }
            } catch (error){
                console.log(error);
            }
        }
    }
</script>

<div>
   <input type="email" id="email" bind:value={email}>
   <input type="password" id="password" bind:value={password}>
<button on:click={loginUser}>Logga in</button> 
</div>
