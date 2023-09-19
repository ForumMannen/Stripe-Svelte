const { initStripe } = require("../stripe");
const stripe = initStripe();

async function fetchAllProducts(req, res) {
  try {
    const products = await stripe.products.list({});
    const prices = await stripe.prices.list({});

    const productObjectWithPrice = products.data.map((product) => {
      const price = prices.data.find((price) => price.product === product.id);

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price ? price.unit_amount / 100 : 0,
        images: product.images,
        priceId: product.default_price,
      };
    });
    res.status(200).send(productObjectWithPrice);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { fetchAllProducts };
