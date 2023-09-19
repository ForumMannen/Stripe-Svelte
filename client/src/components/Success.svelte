<script>
  import { onMount } from "svelte";
  import { isPaymentVerified, setIsPaymentVerified } from "../store/payment";

  async function verifyPayment() {
    const sessionId = sessionStorage.getItem("session-id");

    try {
      const response = await fetch("api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
      console.log(response);
      const { verified } = await response.json();
      if (verified) {
        setIsPaymentVerified(true);
        sessionStorage.removeItem("session-id");
      } else {
        setIsPaymentVerified(false);
      }
    } catch (error) {}
  }

  onMount(() => {
    verifyPayment();
  });
</script>

<main>
  {#if $isPaymentVerified}
    <p>Tack för ditt köp!</p>
  {:else}
    <p>Något gick fel</p>
  {/if}
</main>
