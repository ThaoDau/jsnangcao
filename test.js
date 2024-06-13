import getData from './users.js';
const tbody = document.querySelector('tbody');
getData()
        .then((response) => response.json())
        .then((data) =>{
            showData(data)
            
            const btnRemoves = document.querySelectorAll('.delete');
            for (let item of btnRemoves) {
                const id = item.dataset.id;
                item.addEventListener('click', function() {
                    console.log(`bấm vào ${id}`);
                    return RemoveItemUser(id);
                })
            }


            const update = document.querySelectorAll('.edit');
            for (let btn of update) {
                const id = btn.dataset.id;
                btn.addEventListener('click', function() {
                    return updateData(id)
                });
            }
        })


const showData = (data) => {
    tbody.innerHTML = data.map((value,index) =>{
        return `<tr>
        <td>${index + 1}</td>
        <td>${value.name}</td>
        <td> <button data-id="${value.id}" class="edit" >Sửa</button> </td>
        <td> <button data-id="${value.id}" class="delete">Xóa</button> </td>
        </tr>`
    }).join("");
}

const RemoveItemUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`,{ 
        method:"DELETE"
    })
}

const AddUser = () => {
    document.querySelector('body').innerHTML =`
        <form action="" >
            <input type="text" id="username" />
            <button id="btn-submit">Them</button>
        </form>
    `;

    document.querySelector('#btn-submit').addEventListener('click', function () {
        const newUser = {
            name : document.querySelector('#username').value
        }
        
        fetch(`http://localhost:3000/users`,{
            method : "POST",
            headers :{
                "content-type": "application/json"
            },
            body : JSON.stringify(newUser)
        })
    })
}

document.querySelector('#btn-add').addEventListener('click', AddUser);

const updateData = (id) => {
    fetch(`http://localhost:3000/users/${id}`)
    .then((response) => response.json())
    .then((data)=> {
        document.querySelector('body').innerHTML =`
        <form action="" >
            <input type="text" id="username" value="${data.name}"/>
            <button id="btn-update">cập nhât</button>
        </form>
    `;

        document.querySelector('#btn-update').addEventListener('click', function(){
            const dataNew = {
                'id' : id,
                'name' : document.querySelector('#username').value
            }

            fetch(`http://localhost:3000/users/${id}`,{
                method : 'PUT',
                headers : {
                    "content-type": "application/json"
                },
                body : JSON.stringify(dataNew)
            })
        })
    })
}
