let api = "http://localhost:8080/api/v1/product";

fetch(api)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la respuesta");
    }
    return response.json();
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      let producto = data[i];
      console.log(producto);

      let tbody = document.querySelector("tbody");

      let tr = document.createElement("tr");
      let tdID = document.createElement("td");
      let tdName = document.createElement("td");
      let tdPrice = document.createElement("td");

      tdID.textContent = producto.productId;
      tdName.textContent = producto.productName;
      tdPrice.textContent = producto.productPrice;

      tr.appendChild(tdID);
      tr.appendChild(tdName);
      tr.appendChild(tdPrice);
      tbody.appendChild(tr);
    }
  })
  .catch((error) => {
    console.log(error);
  });
