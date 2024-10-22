let api = "http://localhost:8080/api/v1/product";
let addProduct = "http://localhost:8080/api/v1/product/insert";

function getAllProduct() {
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

        let buttonRemove = document.createElement("button");
        buttonRemove.textContent = "Delete";
        buttonRemove.className = "btn btn-danger boton-borrar";
        buttonRemove.id = producto.productId;

        tr.appendChild(tdID);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(buttonRemove);
        tbody.appendChild(tr);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

let buttonAdd = document.querySelector("#addBoton");

buttonAdd.addEventListener("click", () => {
  let nameProduct = document.querySelector("#productName").value;
  let price = document.querySelector("#productPrice").value;
  let product = null;

  if (nameProduct !== "" && price !== "") {
    product = {
      productName: nameProduct,
      productPrice: price,
    };
  }

  fetch(addProduct, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).catch((error) => {
    console.log(error);
  });
});

let botonDelete = document.querySelector(".btn.btn-danger.boton-borrar");

if (botonDelete) {
  botonDelete.addEventListener("click", () => {
    let idProduct = botonDelete.id;
    let deleteProduct = `http://localhost:8080/api/v1/product/delete/${idProduct}`;

    fetch(deleteProduct);
  });
}

getAllProduct();
