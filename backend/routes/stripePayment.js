import express from "express";
const router = express.Router();
import Stripe from "stripe";

const stripe = new Stripe(process.env.stripe_secret_key);

router.post("/", async (req, res) => {
  try {
    const { products, productsWithQuantity } = req.body;
    const lineItems = products.map((item, index) => ({
      price_data: {
        currency: "bdt",
        product_data: {
          name: item.productName, // Name of the product
          images: [item.productImage[0]],
        },
        unit_amount: item.price * 100,
      },
      quantity: productsWithQuantity[index].productQuantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/error",
    });
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
});
export default router;
