const ListInput = document.querySelectorAll('input');
const genner = document.querySelector('select');
const btnsave = document.querySelector('#myform');
const error = document.querySelectorAll('.p');
btnsave.addEventListener('submit',(event)=> {
    event.preventDefault();
    if(ListInput[0].value == ""){
        alert('không để trống tên');
        return false;
    }

    if(ListInput[1].value == ""){
        alert('không để trống địa chỉ');
        return false;
    }
    if(ListInput[2].value == ""){
        alert('không để trống email');
        return false;
    }

    alert("Form submitted successfully!");
    btnsave.submit();
})

