let output = 
    `<thead><tr>
    <th>Product Name</th>
    <th>Purchase Price</th>
    <th>Selling Price</th>
    <th>Stock</th>
    <th>Details</th>
    </tr></thead>`;


const url = 'http://localhost/htdocs-work/backend-api-frontend/backend/api/';

const addProductForm = document.querySelector('.addProduct');
const products = document.querySelector('.productTable');
const nameValue = document.getElementById('nameId');
const purchaseValue = document.getElementById('purchaseId');
const sellingValue = document.getElementById('sellingId');
const quantityValue = document.getElementById('quantityId');
const btnSubmit = document.querySelector('.btn');

//==============SHOW ALL PRODUCTS==============================
const renderProducts  = (posts) => {    
    posts.forEach(product => {
        output += 
        `<tr>
            <td class="name" width="100px">${product.name}</td>
            <td class="purchase" width="40px">${product.purchase}</td>
            <td class="selling" width="80px">${product.selling}</td>
            <td class="quantity" width="60px">${product.quantity}</td>
            <td data-id="${product.id}" width="110px">
                <a class="" id="editId">&ensp;Edit&ensp;</a>&emsp;
                <a class="" id="deleteId" class="btn btn-primary">&ensp;Delete&ensp;</a>
            </td>
        </tr>`;
        products.innerHTML = output;
    })
}

//==============GET ALL PRODUCTS==============================
fetch(url+'getAll')
.then(res => res.json())
.then(data => renderProducts(data))

products.addEventListener('click', (e) => {

    e.preventDefault();
    let deletePressed = e.target.id == 'deleteId';
    let editPressed = e.target.id == 'editId';

    //==============DELETE PRODUCT==============================
    let id = e.target.parentElement.dataset.id;
    if(deletePressed) {
        let confirmDelete = confirm("Do you really want to delete?");
        if(confirmDelete){
            fetch(url+'delete/'+id, {
            method: 'DELETE'
            })
            .then(res => res.json())
            .then(() => location.reload())
        }
        
    }
    
    //==============UPDATE PRODUCTS==============================
    if(editPressed) {
        const parent = e.target.parentElement.parentElement;
        let nameContent = parent.querySelector('.name').textContent;
        let purchaseContent = parent.querySelector('.purchase').textContent;
        let sellingContent = parent.querySelector('.selling').textContent;
        let quantityContent = parent.querySelector('.quantity').textContent;

        nameValue.value = nameContent;
        purchaseValue.value = purchaseContent;
        sellingValue.value = sellingContent;
        quantityValue.value = quantityContent;
        
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(url+'edit/'+id, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameValue.value,
                    purchase: purchaseValue.value,
                    selling: sellingValue.value,
                    quantity: quantityValue.value
                })
            })
            .then(res => res.json())
            .then(() => location.reload())
        })
    }

})

//==============ADD PRODUCTS==============================
addProduct.addEventListener('submit', (e) =>{
    e.preventDefault();
    fetch(url+'add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue.value,
            purchase: purchaseValue.value,
            selling: sellingValue.value,
            quantity: quantityValue.value
        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderProducts(dataArr);
    })
    .then(resetForm())
})

//==============REMOVE INPUT FIELDS AFTER SUBMIT==============================
function resetForm() {
    document.getElementById("nameId").value = "";
    document.getElementById("purchaseId").value = "";
    document.getElementById("sellingId").value = "";
    document.getElementById("quantityId").value = "";
}

