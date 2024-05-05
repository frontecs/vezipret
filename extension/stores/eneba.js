// eneba does advertisments on the biggest buy button, even if it's not the cheapest
// so we need to check which one is the cheapest and give that price to the database
// thank you eneba, very cool >_<

// also, it features a loading screen, so i have create an interval that checks if the price is loaded
// there MIGHT be a better way to do this, but i'm not sure how to do it and i'm too lazy to look it up

let found = false;
let url = "";

let interval = setInterval(() => {
  if (url != window.location.href) {
    found = false;

    let price = document.getElementsByClassName("L5ErLT")[0];
    let other_price = document.getElementsByClassName("L5ErLT")[1];

    if (price && !found) {
      found = true;
      let element = document.createElement("span");
      element.innerHTML = `<img src="http://localhost:3000/logo.png" alt="vezipret" style="width: auto; height: 80px; margin-top: -30px; margin-bottom: -31px; margin-left: -1px";/>`;

      price = price.innerText;
      other_price = other_price.innerText;

      price = parseFloat(price.replace(",", ".").replace(/[^0-9.]/g, ""));
      other_price = parseFloat(
        other_price.replace(",", ".").replace(/[^0-9.]/g, "")
      );

      if (price > other_price) price = other_price;

      let produs = document
        .getElementsByClassName("C68dpx")[0]
        .innerText.replace(/&/g, "and")
        .replace(/\//g, "or"); // doesn't like some characters in the url

      element.onclick = function () {
        window.open(
          "http://localhost:3000/price?marketplace=eneba&product=" + produs
        );
      };

      document.getElementsByClassName("L5ErLT")[0].appendChild(element);

      fetch(`http://localhost:3001/eneba/${produs}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          price: price,
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
      url = window.location.href;
    } /* else {
      console.log("no price found");
    } */
  }
}, 1000);
