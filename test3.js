const getData = () => {
   return fetch('http://localhost:3000/users')
}
const tbody = document.querySelector('tbody');
getData()
.then((response)=> response.json())
.then((data)=> {
    showdata(data)

    const btnview = document.querySelectorAll('.view');
    for (const btn of btnview) {
        const id = btn.dataset.id;
        btn.addEventListener('click', () => viewEmail(id))
    }
})

const showdata = (data) => {
    tbody.innerHTML = data.map((values,index) => {
        return `<tr>
            <td>${index+1}</td>
            <td>${values.name}</td>
            <td>${values.masv}</td>
            <td>
                <button data-id="${values.id}" class="view">hiển thị</button>
            </td>
        </tr>`
    }).join('')
}

const viewEmail = (id) => {
    fetch(`http://localhost:3000/users/${id}`)
    .then((response) => response.json())
    .then((response) => {
        document.querySelector('body').innerHTML = `
            <p>${response.email}</p>
        `
    })
}

