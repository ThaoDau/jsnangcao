const getData = () => {
   return fetch(`http://localhost:3000/users`);
}
const tbody = document.querySelector('tbody');
getData()
.then((response)=> response.json())
.then((data)=> {
    showData(data);
    const btnRemove = document.querySelectorAll('.delete');
    for (let btn of btnRemove) {
        const id = btn.dataset.id;
        btn.addEventListener('click',() => deleteValue(id))
    }

    const btnupdate = document.querySelectorAll('.edit');

    for (const btn of btnupdate) {
        const id = btn.dataset.id;
        btn.addEventListener('click', () => editData(id));
    }

});


const showData = (data) => {
    tbody.innerHTML = data.map((value,index)=> {
        return `<tr>
            <td>${index+1}</td>
            <td>${value.name}</td>
            <td>
                <button data-id="${value.id}" class="edit">sửa</button>
                <button data-id="${value.id}" class="delete">Xóa</button>
            </td>
        </tr>`;
    }).join('');
}

const deleteValue = (id) => {
    fetch(`http://localhost:3000/users/${id}`,{
        method: 'DELETE',
    })
}

const addUser = () => {
    document.querySelector('body').innerHTML = `
        <form>
            <input type="text" id="username" />
            <button type="submit" id="btn-add">Tạo</button>
        </form>
    `

    document.querySelector('#btn-add').addEventListener('click',() => {
        const newUser = {
            name : document.querySelector('#username').value
        }

        fetch(`http://localhost:3000/users`,{
            method : 'POST',
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify(newUser)
        })
        alert('thêm mới thành công!')
    })
}

document.querySelector('#btn-add').addEventListener('click', addUser);


const editData = (id) => {
    fetch(`http://localhost:3000/users/${id}`)
    .then((response) => response.json())
    .then((data) => {
        document.querySelector('body').innerHTML = `
            <form>
            <input type="text" id="username" value="${data.name}" />
            <button type="submit" id="btn-update">Tạo</button>
        </form>
        `

        document.querySelector('#btn-update').addEventListener('click', ()=> {
            const updatData = {
                id : id,
                name : document.querySelector('#username').value
            }

            fetch(`http://localhost:3000/users/${id}`,{
                method : 'PUT',
                headers : {
                    "content-type": "application/json"
                },
                body : JSON.stringify(updatData)
            })
        })
    })
}

