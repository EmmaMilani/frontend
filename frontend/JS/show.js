function showProduct(product_id){
    fetch(`http://localhost:8000/products/${product_id}`)
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
}

function displayProducts(product) { //funzione che mi permette di visualizzare i prodotti
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    modalContent.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>Show Product</h2>
        <label>Nome</label><br>
        <input type="text" id="Nome" value="${product.attributes.nome}">
        <br><br>
        <label>Marca</label><br>
        <input type="text" id="Marca" value="${product.attributes.marca}">
        <br><br>
        <label>Prezzo</label><br>
        <input type="number" id="Prezzo" value="${product.attributes.prezzo}">
        <br><br>
        <button onclick="closeModal()">Close</button>
    `;

    modal.appendChild(modalContent); // Aggiungi il contenuto al modale
    document.body.appendChild(modal);
    modal.modal('show');
    modal.style.display = 'block'; // Mostra il modal
}

function closeModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
    modal.remove();
}