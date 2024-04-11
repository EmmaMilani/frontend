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
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    headerRow.innerHTML = "<td>ID</td><td>Nome</td><td>Marca</td><td>Prezzo</td><td>Actions</td>";

    Array.prototype.forEach.call(products, product => {
        const row = table.insertRow();
        row.innerHTML = `<td>${product.id}</td><td>${product.attributes.nome}</td><td>${product.attributes.marca}</td><td>${product.attributes.prezzo}</td><td>
            <button type="button" class="btn btn-primary" data-toggle="modal" onclick="showProduct(${product.id})">Show</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" onclick="editProduct(${product.id})">Edit</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" onclick="deleteProduct(${product.id})">Delete</button>
        </td>`;
    });

    document.body.appendChild(table); //la tabella verrà visualizzata quando la pagina verrà caricata nel browser
}