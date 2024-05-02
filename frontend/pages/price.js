"use client";

import Head from "next/head";
import Topbar from "@/components/Topbar";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();

  const [marketplace, setMarketplace] = useState(
    searchParams.get("marketplace")
  );
  const [product, setProduct] = useState(searchParams.get("product"));

  const [highestPrice, setHighestPrice] = useState(0);
  const [lowestPrice, setLowestPrice] = useState(999999999);

  useEffect(() => {
    fetch(`http://localhost:3001/${marketplace}/${product}`, {
      method: "GET",
    })
      .catch(() => {})
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          if (element.price > highestPrice) {
            setHighestPrice(element.price);
          }
          if (element.price < lowestPrice) {
            setLowestPrice(element.price);
          }
        });
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
        <p>Lowest Price: {lowestPrice}</p>
        <p>Highest Price: {highestPrice}</p>
      </div>
    </>
  );
}
