document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8000/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore richiesta: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Risposta ricevuta:', data); 
            displayProducts(data.data); 
        })
        .catch(error => {
            console.error('Errore:', error);
        });
});

function displayProducts(products) { //funzione che mi permette di visualizzare i prodotti nella tabella
    //const table = document.createElement('table');
    const table = document.getElementById("Table");
    const headerRow = table.insertRow();
    headerRow.innerHTML = "<thead><td><b>ID</b></td><td>Nome</td><td>Marca</td><td>Prezzo</td><td>Actions</td></thead>";

    Array.prototype.forEach.call(products, product => {
        const row = table.insertRow();
        row.id = "row_" + product.id;
        row.innerHTML = `<td>${product.id}</td><td id="product_nome_${product.id}">${product.attributes.nome}</td><td id="product_marca_${product.id}">${product.attributes.marca}</td><td id="product_prezzo_${product.id}">${product.attributes.prezzo}</td><td>
            <button type="button" class="btn btn-primary" data-toggle="modal" style="background-color: blue; color: white;" onclick="showProduct(${product.id})">Show</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" style="background-color: green; color: white;" onclick="editProduct(${product.id})">Edit</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" style="background-color: red; color: white;" onclick="deleteProduct(${product.id})">Delete</button>
        </td>`;
    });

    document.body.appendChild(table); //la tabella verrà visualizzata quando la pagina verrà caricata nel browser
}