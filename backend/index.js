require("dotenv").config();

const cors = require("cors");

const express = require("express");
const app = express();

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

app.get("/:marketplace/:product", cors(), async (req, res) => {
  console.log(`GET: ${req.params.marketplace}/${req.params.product}`);
  const { data, error } = await supabase
    .from("prices")
    .select("*")
    .eq("marketplace", req.params.marketplace)
    .eq("product", req.params.product)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(data);
});

app.post("/:marketplace/:product", cors(), async (req, res) => {
  console.log(`POST: ${req.params.marketplace}/${req.params.product}`);

  if (!req.body.price) {
    return res.status(400).json({ error: "Price is required" });
  }

  const { data: latestData, error: latestError } = await supabase
    .from("prices")
    .select("*")
    .eq("marketplace", req.params.marketplace)
    .eq("product", req.params.product)
    .order("created_at", { ascending: false });

  if (latestError) {
    return res.status(500).json({ error: latestError.message });
  }

  if (latestData.length > 0 && latestData[0].price === req.body.price) {
    return res.status(200).json({ message: "Price is the same" });
  }

  const { error } = await supabase.from("prices").insert([
    {
      marketplace: req.params.marketplace,
      product: req.params.product,
      price: req.body.price,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
