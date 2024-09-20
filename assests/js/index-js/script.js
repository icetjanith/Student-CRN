let stdName = document.getElementById('stdName');
let stdImage = document.getElementById('stdImage');
let stdAge = document.getElementById('stdAge');
let stdContacts = document.getElementById('stdContact');
let stdEmail = document.getElementById('stdEmail');

let guardianName = document.getElementById("guardianName");
let guardianAddress = document.getElementById("guardianAddress");
let guardianContact = document.getElementById("guardianContact");

let btnClear = document.getElementById("btnClear");
let btnRegister = document.getElementById("btnRegister");

function clearInputs() {
    stdName.value = '';
    stdImage.value = '';
    stdAge.value = '';
    stdContacts.value = '';
    stdEmail.value = '';
    guardianName.value = '';
    guardianAddress.value = '';
    guardianContact.value = '';
}

function showToast() {
    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
}

async function fetchApi(student) {

    btnClear.disabled = true;
    btnRegister.disabled = true;

    try {

        let response = await fetch("http://localhost:8080/student", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        showToast();

    } catch (error) {

    } finally {
        clearInputs();
        btnClear.disabled = false;
        btnRegister.disabled = false;
    }

}

function register() {
    if (stdName.value === '' || stdAge.value === '' || stdContacts.value === '' || guardianName.value === '' || guardianAddress.value === '' || guardianContact.value === '') {
        alert('All fields must be filled out');
        return;
    }

    let file = stdImage.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function (event) {
        const base64Image = event.target.result;
        console.log(base64Image);

        let student = {};

        student.stdName = stdName.value;
        student.stdImg = base64Image;
        student.stdAge = stdAge.value;
        student.stdPhone = stdContacts.value;
        student.stdEmail = stdEmail.value;
        student.guardianName = guardianName.value;
        student.guardianAddress = guardianAddress.value;
        student.guardianPhone = guardianContact.value;

        fetchApi(student);
    }
    fileReader.readAsDataURL(file);

}


btnClear.addEventListener('click', clearInputs);

btnRegister.addEventListener('click', register);