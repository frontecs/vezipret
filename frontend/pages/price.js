"use client";

import Head from "next/head";
import Topbar from "@/components/Topbar";

import { useEffect } from "react";
import { useState } from "react";
import Chart from "@/components/Chart";

export default function Price() {
  const [marketplace, setMarketplace] = useState();
  const [product, setProduct] = useState();

  const [prices, setPrices] = useState([]);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);

    let marketplace = params.get("marketplace");
    let product = params.get("product");

    setMarketplace(marketplace);
    setProduct(product);

    fetch(`http://localhost:3001/${marketplace}/${product}`, {
      method: "GET",
    })
      .catch(() => {})
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          return;
        }
        setPrices(data);
      });
  }, []);

  return (
    <>
      <Head>
        <title>vezipret</title>
        <meta
          name="description"
          content="Vezi istoricul preturilor produselor tale favorite!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>
          {marketplace}-{product}
        </h2>
        <Chart prices={prices} />
      </div>
    </>
  );
}
