function createProduct(product_id){
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
            <input type="text" id="Nome" required>
            <br><br>
            <label>Marca</label><br>
            <input type="text" id="Marca" required>
            <br><br>
            <label>Prezzo</label><br>
            <input type="number" id="Prezzo" required>
            <br><br>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" style="background-color: gray; color: black;" onclick="closeModal()">Close</button>
            <button type="button" class="btn btn-primary" style="background-color: green; color: black;" onclick="Create()">Create</button>
        </div>
    `;

    modal.appendChild(modalContent); // Aggiungi il contenuto al modale
    document.body.appendChild(modal);
    modal.style.display = 'block'; // Mostra il modal
}

function closeModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
    modal.remove();
}

function Create(){
    const nomeValue = document.getElementById("Nome").value;
    const marcaValue = document.getElementById("Marca").value;
    const prezzoValue = document.getElementById("Prezzo").value;

    const dataToUpdate = {  
    data: {
        type: 'products',
        attributes: {
            nome: nomeValue,
            marca: marcaValue,
            prezzo: prezzoValue
        }
    }
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToUpdate)
    };

    fetch(`http://localhost:8000/products`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore richiesta: ' + response.status);
        }
            return response.json();
        })
        .then(data => {
            console.log('Risposta ricevuta:', data);
            const table = document.getElementById("Table");
            const row = table.insertRow();
            row.id = "row_" + data.data.id;
            row.innerHTML = `
                <td>${data.data.id}</td><td>${data.data.attributes.marca}</td><td>${data.data.attributes.nome}</td><td>${data.data.attributes.prezzo}</td>
                <td>
                <button type="button" class="btn btn-primary" data-toggle="modal" style="background-color: blue; color: white;" onclick="showProduct(${data.data.id})">Show</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" style="background-color: green; color: white;" onclick="editProduct(${data.data.id})">Edit</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" style="background-color: red; color: white;" onclick="deleteProduct(${data.data.id})">Delete</button>
                </td>
            `;
            //document.getElementById("Table").appendChild(newRow);
            closeModal();
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}