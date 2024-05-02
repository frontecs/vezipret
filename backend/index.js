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

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
