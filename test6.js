const getData = () => fetch('http://localhost:3000/products');

const tbody = document.querySelector('tbody');
getData()
        .then((response) => response.json())
        .then((data)=> {
            showData(data)

            const btnDelete = document.querySelectorAll('.delete');
            for (const btn of btnDelete) {
                const id = btn.dataset.id;
                btn.addEventListener('click',()=> {
                    const question = confirm('Bạn có chắc chắn muốn xóa ?');
                    question == true ? deleteItem(id) : alert('Xóa không thành công!')
                })
            }

            const btnupdates = document.querySelectorAll('.update');
            for (const btn of btnupdates) {
                const id = btn.dataset.id;
                btn.addEventListener('click',()=> updateProduct(id))
            }
        });



const showData = (data) => {
    tbody.innerHTML = data.map((value,index) => {
            return  `
            <tr>
            <th scope="row">${index+1}</th>
            <td>${value.productName}</td>
            <td><img src="${value.image}" width="50"></td>
            <td>
            <button type="button" data-id="${value.id}" class="btn btn-success update">Sửa</button>
            <button type="button"  data-id="${value.id}"  class="btn btn-danger delete">Xóa</button>
            </td>
        </tr>
    `
    })
}


const deleteItem = (id) => {
    fetch(`http://localhost:3000/products/${id}`,{
        method : "DELETE"
    })
}

const updateProduct = (id) => {
    fetch(`http://localhost:3000/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('.container').innerHTML = `
            <form action="" method="post">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Tên sản phẩm</label>
                    <input type="text" class="form-control" id="nameProduct" value="${data.productName}" >
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Ảnh</label>
                    <input type="text" class="form-control" id="imgLink" value="${data.image}">
                </div>
        
                <button type="submit" id="btnUpdate" class="btn btn-primary">Submit</button>
        </form>
            `

            document.querySelector('#btnUpdate').addEventListener('click',(e) => {
                e.preventDefault();

                const output = validateForm()
                if(output != false){
                    const value = {
                        productName : document.querySelector('#nameProduct').value,
                        image : document.querySelector('#imgLink').value
                    }
            
                    fetch(`http://localhost:3000/products/${id}`,{
                        method : "PUT",
                        headers : {
                            "content-type": "application/json"
                        },
                        body : JSON.stringify(value)
                    })
                    alert('Cập nhật thành công!');
                    return true
                }
             
            })
        })
}


const addProduct = () => {
    document.querySelector('.container').innerHTML = `
    <form action="" method="post">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Tên sản phẩm</label>
            <input type="text" class="form-control" id="nameProduct" >
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Ảnh</label>
            <input type="text" class="form-control" id="imgLink">
        </div>

        <button type="submit" id="btnAdd" class="btn btn-primary">Submit</button>
</form>
    `

    document.querySelector('#btnAdd').addEventListener('click',(e)=> {
        e.preventDefault();

        const output = validateForm()
        
        e.stopPropagation();
        if(output != false){
        const value = {
            productName : document.querySelector('#nameProduct').value,
            image : document.querySelector('#imgLink').value
        }

        fetch('http://localhost:3000/products',{
            method : "POST",
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify(value)
        })
        alert('Thêm thành công!');
        return true}
    })
}

document.querySelector('#btnAdd').addEventListener('click',addProduct)

const login = () => {
    document.querySelector('.container').innerHTML = `
    <form action="" >
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">username</label>
            <input type="text" class="form-control" id="username" >
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">password</label>
            <input type="password" class="form-control" id="password">
        </div>

        <button type="submit" id="btnLogin" class="btn btn-primary">Đăng nhập</button>
</form>
    `

    document.querySelector('#btnLogin').addEventListener('click',(e) => {
        e.preventDefault();

        const output = validateForm()
        if(output != false) {
            e.stopPropagation();
            const username = "admin";
            const password = "hau123";
            const info = {
                "fullname" : "Đặng Văn hậu",
                "age" : 20,
                "address" : "Nam định"
            }
    
            if(inputForm[0].value == username && inputForm[1].value == password ){
                sessionStorage.setItem("info",JSON.stringify(info));
                alert('Đăng nhập thành công');
                window.location.reload();
            }else {
                alert('Tài khoản hoặc mật khẩu không đúng')
            }
        }
    })
}

document.querySelector('#btnlogin').addEventListener('click',login)

const info = JSON.parse(sessionStorage.getItem('info'));

if(info) {
    document.querySelector('#btnlogin').textContent = `${info.fullname}`
    document.querySelector('#btnlogin').disabled  = "true"
    document.querySelector('#btnLogout').style.display = "inline-block";
    document.querySelector('#btnLogout').addEventListener('click',() => {
        sessionStorage.removeItem("info")
        window.location.reload();
    })
}

function validateForm(){
    const Allinput = document.querySelectorAll('input');
    console.log(Allinput);
    for (const input of Allinput) {
        if(input.value == "" ){
            alert(`Không để trống` )
            return false;
            
        }
    }
}