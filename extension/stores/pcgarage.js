let price = document.getElementsByClassName("price_num")[0];
if (price) {
  let element = document.createElement("span");
  element.innerHTML = `<img src="http://localhost:3000/logo.png" alt="vezipret" style="width: auto; height: 50px; margin-top: -15px; margin-bottom: -15px;"/>`;

  price = price.innerText;
  price = parseFloat(
    price.replace(/\./g, "").replace(".", "").replace(",", ".")
  );

  let produs = document.getElementsByClassName("owncode")[0].innerText;
  produs = produs.match(/\d+/g).map(Number)[0]; // parseInt returns NaN

  element.onclick = function () {
    window.open(
      "http://localhost:3000/price?marketplace=pcgarage&product=" + produs
    );
  };

  document.getElementById("ps_sell_rates").appendChild(element);

  fetch(`http://localhost:3001/pcgarage/${produs}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      price: price,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
