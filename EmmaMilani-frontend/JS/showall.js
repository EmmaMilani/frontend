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

    products.forEach(product => {
        const row = table.insertRow();
        row.innerHTML = `<td>${product.id}</td><td>${product.nome}</td><td>${product.marca}</td><td>${product.prezzo}</td><td>
            <button onclick="showProduct(${product.id})">Show</button>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        </td>`;
    });

    document.body.appendChild(table); //la tabella verrà visualizzata quando la pagina verrà caricata nel browser
}