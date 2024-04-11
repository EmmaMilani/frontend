function editProduct(product_id){
    fetch(`http://localhost:8000/products/${product_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore richiesta: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Risposta ricevuta:', data); 
            const modal = document.createElement('div');
            modal.classList.add('modal');

            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');

            modalContent.innerHTML = `
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" onclick="closeModal()">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label>Nome</label><br>
                    <input type="text" id="Nome" value="${data.data.attributes.nome}" required>
                    <br><br>
                    <label>Marca</label><br>
                    <input type="text" id="Marca" value="${data.data.attributes.marca}" required>
                    <br><br>
                    <label>Prezzo</label><br>
                    <input type="number" id="Prezzo" value="${data.data.attributes.prezzo}" required>
                    <br><br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" style="background-color: gray; color: black;" onclick="closeModal()">Close</button>
                    <button type="button" class="btn btn-primary" style="background-color: green; color: white;" onclick="Edit(${data.data.id})">Edit</button>
                </div>
            `;

            modal.appendChild(modalContent); // Aggiungi il contenuto al modale
            document.body.appendChild(modal);
            modal.style.display = 'block'; // Mostra il modal
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}

function closeModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
    modal.remove();
}

function Edit(product_id){
    const nomeValue = document.getElementById("Nome").value;
    const marcaValue = document.getElementById("Marca").value;
    const prezzoValue = document.getElementById("Prezzo").value;

    const dataToUpdate = {  
    data: {
        type: 'products',
        id: product_id,
        attributes: {
            nome: nomeValue,
            marca: marcaValue,
            prezzo: prezzoValue
        }
    }
    };

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToUpdate)
    };

    fetch(`http://localhost:8000/products/${product_id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore richiesta: ' + response.status);
        }
            return response.json();
        })
        .then(data => {
            console.log('Risposta ricevuta:', data);
            const row = document.getElementById("row_" + data.data.id);
            row.cells[1].innerText = data.data.attributes.nome;
            row.cells[2].innerText = data.data.attributes.marca;
            row.cells[3].innerText = data.data.attributes.prezzo;
            closeModal();
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}