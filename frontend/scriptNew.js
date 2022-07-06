var selectedRow = null;

function onFormSubmit(){
    var formData = readFormData();
    if(selectedRow == null)
        insertNewRecord(formData);
    else
        updateRecord(formData);
    resetForm();
}

function readFormData(){
    
    var formData = {};
    formData["name"] = document.getElementById("nameId").value;
    formData["purchase"] = document.getElementById("purchaseId").value;
    formData["selling"] = document.getElementById("sellingId").value;
    formData["quantity"] = document.getElementById("quantityId").value;
    return formData;
}


function insertNewRecord(data){

    const formData = data;
    fetch('http://localhost/htdocs-work/backend-api-frontend/backend/api/add', {
        method: 'post',
        body: formData
    }).then (function (response) {
        return response.text();
    }).then(function(text){
        console.log(text);
    }).catch(function (error){
        console.error(error);
    })



    // var table = document.getElementById('products').getElementsByTagName('tbody')[0];
    // var newRow = table.insertRow(table.length);
    // cell1 = newRow.insertCell(0);
    // cell1.innerHTML = data.name;
    // cell2 = newRow.insertCell(1);
    // cell2.innerHTML = data.purchase;
    // cell3 = newRow.insertCell(2);
    // cell3.innerHTML = data.selling;
    // cell4 = newRow.insertCell(3);
    // cell4.innerHTML = data.quantity;
    // cell5 = newRow.insertCell(4);
    // cell5.innerHTML =  `<a onClick="onEdit(this)">Edit</a> 
    //                     <a onClick="onDelete(this)">Delete</a>`;
    
}

function resetForm() {
    document.getElementById("nameId").value = "";
    document.getElementById("purchaseId").value = "";
    document.getElementById("sellingId").value = "";
    document.getElementById("quantityId").value = "";
    var selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nameId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("purchaseId").value = selectedRow.cells[1].innerHTML;
    document.getElementById("sellingId").value = selectedRow.cells[2].innerHTML;
    document.getElementById("quantityId").value = selectedRow.cells[3].innerHTML;
}

function onDelete(td){
    if(confirm('Are you sure to delete this product?')){
        row = td.parentElement.parentElement;
        document.getElementById("products").deleteRow(row.rowIndex);
        resetForm();
    }
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.purchase;
    selectedRow.cells[2].innerHTML = formData.selling;
    selectedRow.cells[3].innerHTML = formData.quantity;
}