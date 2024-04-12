function deleteProduct(product_id){
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
                    <h5 class="modal-title" id="DeleteModal">Delete Product</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" onclick="closeModal()">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label>Nome</label><br>
                    <input type="text" id="Nome" value="${data.data.attributes.nome}" readonly>
                    <br><br>
                    <label>Marca</label><br>
                    <input type="text" id="Marca" value="${data.data.attributes.marca}" readonly>
                    <br><br>
                    <label>Prezzo</label><br>
                    <input type="number" id="Prezzo" value="${data.data.attributes.prezzo}" readonly>
                    <br><br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" style="background-color: gray; color: white;" onclick="closeModal()">Close</button>
                    <button type="button" class="btn btn-primary" style="background-color: red; color: white;" onclick="Delete(${data.data.id})">Delete</button>
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

function Delete(product_id){
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    };

    fetch(`http://localhost:8000/products/${product_id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore richiesta: ' + response.status);
            }
            /*if(response.json() != null){
                console.log("Errore: " + JSON.stringify(response.json()));
            } else {
                return response.json();
            }*/
        })
        .then(data => {
            //console.log('Risposta ricevuta:', data);
            const row = document.getElementById("row_" + product_id);
            row.remove();
            closeModal();
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}