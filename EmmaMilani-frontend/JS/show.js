function openModalShow(product_id) {
    document.getElementById("myModal").openModal;
    document.getElementById("myModal").style.display = "block";
    show(product_id);
}

// Funzione per chiudere il modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

async function show(product_id) {
    const response = await fetch(`http://127.0.0.1:8000/products/${product_id}`);
    const product = await response.json();
    showProductDetails(product);
}

// Funzione per riempire i campi del modal con i dati del prodotto selezionato
function showProductDetails(product) {
    //document.getElementById("modalContent").innerHTML = `
            //<label id = "productId">ID:</label>
            //<label for="productName">Nome: ${product.attributes.nome}</label>
            //<input type="text" id="productName" name="productName" readonly><br><br>
            //<label for="productBrand">Marca: ${product.attributes.marca}</label>
            //<input type="text" id="productBrand" name="productBrand" readonly><br><br>
            //<label for="productPrice">Prezzo: ${product.attributes.prezzo}</label>
            //<input type="text" id="productPrice" name="productPrice" readonly><br><br>
    //`;

    //non va
    document.getElementById("productId").value = product.id;
    document.getElementById("productName").value = product.attributes.nome;
    document.getElementById("productBrand").value = product.attributes.marca;
    document.getElementById("productPrice").value = product.attributes.prezzo;
}