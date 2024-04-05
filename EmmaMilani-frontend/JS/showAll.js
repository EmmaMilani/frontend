async function ShowAll() {
    const response = await fetch("http://127.0.0.1:8000/products");
    products = await response.json();
    displayProducts(products);
};

function displayProducts(products) { //funzione che mi permette di visualizzare i prodotti nella tabella
    
    if (!Array.isArray(products["data"])) {//ho un problema perché products non è un array
        console.error("Errore: products non è un array");
        return;
    }
    
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    headerRow.innerHTML = "<td>ID</td><td>Nome</td><td>Marca</td><td>Prezzo</td><td>Actions</td>";

    products["data"].forEach(product => {
        const row = table.insertRow();
        row.innerHTML = `<td>${product["id"]}</td><td>${product["attributes"]["nome"]}</td><td>${product["attributes"]["marca"]}</td><td>${product["attributes"]["prezzo"]}</td><td>
            <button onclick="openModalShow(${product["id"]})">Show</button>
            <button onclick="editProduct(${product["id"]})">Edit</button>
            <button onclick="openModalDelete(${product["id"]})">Delete</button>
        </td>`;
    });

    //document.body.appendChild(table); //la tabella verrà visualizzata quando la pagina verrà caricata nel browser
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.appendChild(table);
}