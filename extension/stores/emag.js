let price = document.getElementsByClassName("product-new-price")[0];
if (price) {
  let element = document.createElement("span");
  element.innerHTML = `<img src="http://localhost:3000/logo_black.png" alt="vezipret" style="width: auto; height: 70px; margin-top: -30px; margin-bottom: -25px;"/>`;

  price = price.innerText;
  price = parseFloat(
    price.replace(/\./g, "").replace(".", "").replace(",", ".")
  );

  let produs = document.getElementsByClassName("product-code-display")[0]
    .innerText;
  produs = produs.replace("Cod produs: ", "");

  element.onclick = function () {
    window.open(
      "http://localhost:3000/price?marketplace=emag&product=" + produs
    );
  };

  document
    .getElementsByClassName("product-page-pricing")[0]
    .appendChild(element);

  fetch(`http://localhost:3001/emag/${produs}`, {
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
