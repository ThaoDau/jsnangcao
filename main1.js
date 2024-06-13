const getData = () => fetch('http://localhost:3000/products');
const tbody = document.querySelector('tbody');
getData()
        .then((data) => data.json())
        .then((data) => {
            showData(data)
            const btnDeletes = document.querySelectorAll('.deleteItem');
            for (const btnDelete of btnDeletes) {
                const id = btnDelete.dataset.id;
                btnDelete.addEventListener('click', () => { 
                    const question = confirm('Bạn có chắc chắn muốn xóa không?')
                    question == true ? deleteItem(id) : ''
                })
            }

            const btnUpdates = document.querySelectorAll('.updateItem');
            for (const btnupdate of btnUpdates) {
                const id = btnupdate.dataset.id;
                btnupdate.addEventListener('click', () =>  updateProduct(id))
            }
        });

const showData = (data) => {
    tbody.innerHTML = data.map((values,index) => {
        return `
        <tr>
        <th scope="row">${index+1}</th>
        <td>${values.productName}</td>
        <td>${values.price}</td>
        <td>
        <button type="button" data-id="${values.id}" class="btn btn-danger deleteItem">Xóa</button>
        <button type="button" data-id="${values.id}" class="btn btn-danger updateItem">Cập nhật</button>
        </td>
      </tr>
        `
    })
}

const deleteItem = (id) => {
    fetch(`http://localhost:3000/products/${id}`,{
        method: 'DELETE'
    })
}

const addItem = () => {
    document.querySelector('.container').innerHTML = `
    <form action="" methods="post">
  <div class="mb-3">
    <label for="productname" class="form-label">Product name</label>
    <input type="text" class="form-control" id="productname" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="price" class="form-label">price</label>
    <input type="text" class="form-control"  id="price" >
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary " id="btn_add">Submit</button>
</form>
    `

    document.querySelector('#btn_add').addEventListener('click', (e) => {
        e.preventDefault();
        const inputValue = document.querySelectorAll('input');
        if(inputValue[0].value == ''){
            alert('Không để trống tên !')
            return false;
        }

        if(inputValue[1].value == ''){
            alert('Không để trống giá !')
            return false;
        }
        
        const newValues = {
            productName : inputValue[0].value,
            price : inputValue[1].value
        }

        fetch('http://localhost:3000/products',{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(newValues)
        })
        alert('Thêm thành công')
        return true;
    })
}

document.querySelector('#add_product').addEventListener('click',addItem);

const updateProduct = (id) => {
    fetch(`http://localhost:3000/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('.container').innerHTML = `
            <form action="" methods="post">
          <div class="mb-3">
            <label for="productname" class="form-label">Product name</label>
            <input type="text" class="form-control" id="productname" value="${data.productName}" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">price</label>
            <input type="text" class="form-control"  id="price" value="${data.price}" >
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary " id="btn_update">Submit</button>
        </form>
            `

            document.querySelector('#btn_update').addEventListener('click', (e) => {
                e.preventDefault();
                const inputValue = document.querySelectorAll('input');
                if(inputValue[0].value == ''){
                    alert('Không để trống tên !')
                    return false;
                }
        
                if(inputValue[1].value == ''){
                    alert('Không để trống giá !')
                    return false;
                }
                
                const newValues = {
                    id : id,
                    productName : inputValue[0].value,
                    price : inputValue[1].value
                }
        
                fetch(`http://localhost:3000/products/${id}`,{
                    method : 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(newValues)
                })
                alert('Cập nhật thành công')
                return true;
            })
        })
}

const login = () => {
    document.querySelector('.container').innerHTML = `
    <form>
    <div class="mb-3">
      <label for="username" class="form-label">user name</label>
      <input type="email" class="form-control" id="username">
    </div>
    <div class="mb-3">
      <label for="pass" class="form-label">Password</label>
      <input type="password" class="form-control" id="pass">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary" id="login">Submit</button>
  </form>
    `

    document.querySelector('#login').addEventListener('click', (e) => {
        e.preventDefault();
        const inputValue = document.querySelectorAll('input');
        if(inputValue[0].value == ''){
            alert('Không để trống username !')
            return false;
        }

        if(inputValue[1].value == ''){
            alert('Không để trống password !')
            return false;
        }

        const username = 'hau';
        const password = '12345';

        if(username == inputValue[0].value && password == inputValue[1].value){
            const info = {
                'name' :'Đặng văn hậu',
                'age' :20,
                'address' :'Nam định'
            }

            sessionStorage.setItem("info",JSON.stringify(info));

            alert('Đăng nhập thành công');
            window.location.reload();
            return true;
        }else {
            alert('Đăng nhập thất bại');
            return true;
        }
     
    })
}
if(sessionStorage.getItem('info')){
    const info = JSON.parse(sessionStorage.getItem('info'));
    document.querySelector('#login').textContent = info.name;
    document.querySelector('#login').setAttribute('disabled', '');
}else{ 
    document.querySelector('#login').addEventListener('click',login)
}