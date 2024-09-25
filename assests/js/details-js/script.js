let updateStudentID = 0;

function getUpdateStudentID(studentId) {
    console.log(studentId);
    updateStudentID = studentId;
}

document.getElementById("btnUpdateStudent").addEventListener("click", async function (event) {
    event.preventDefault();
    let stdName = document.getElementById('stdName');
    let stdAge = document.getElementById('stdAge');
    let stdContacts = document.getElementById('stdContacts');
    let stdEmail = document.getElementById('stdEmail');
    let guardianName = document.getElementById("guardianName");
    let guardianAddress = document.getElementById("guardianAddress");

    let student = {
        stdName: stdName.value,
        stdAge: stdAge.value,
        stdPhone: stdContacts.value,
        stdEmail: stdEmail.value,
        guardianName: guardianName.value,
        guardianAddress: guardianAddress.value,
        
    };

    try {
        let response = await fetch(`http://localhost:8080/student/${updateStudentID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Student updated successfully.");
        window.location.reload();

    } catch (error) {
        console.error("Error updating student:", error);
    }
    finally {
        let modal = new bootstrap.Modal(document.getElementById("updateModal"));
        modal.hide();
    }


});

let deleteStudentId = 0;
function getStudentId(studentId) {
    console.log(studentId);
    deleteStudentId = studentId;
}

document.getElementById("btnConfirmDelete").addEventListener("click", async function () {
    try {
        let response = await fetch(`http://localhost:8080/student/${deleteStudentId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Student deleted successfully.");
        window.location.reload();

    } catch (error) {
        console.error("Error deleting student:", error);
    } finally {
        let modal = new bootstrap.Modal(document.getElementById("deleteModal"));
        modal.hide();
    }
});

function createDetailsContainer(data) {
    let detailContainer = document.getElementById("detailContainer");
    detailContainer.innerHTML = `
        <div class="row w-100">
            <div class="col-lg-6 col-md-6 d-flex justify-content-center">
                <div class="imgDiv">
                    <img src="${data.stdImg}" alt="Student Image" class="studentImg img-fluid">
                </div>
            </div>

            <div class="col-lg-6 col-md-6 mt-lg-0 mt-md-0 mt-4 d-flex justify-content-center">
                <div class="detailsDiv">
                    <h3 class="guardianInfo">Student Information</h3>
                    <hr>
                    <div class="detailsRow">
                        <label for="studentName" class="label form-label"><strong>Name : </strong></label>
                        <label class="label form-label"><strong>${data.stdName}</strong></label>
                    </div>
                    <div class="detailsRow">
                        <label for="studentAge" class="label form-label"><strong>Age : </strong></label>
                        <label class="label form-label"><strong>${data.stdAge}</strong></label>
                    </div>
                    <div class="detailsRow">
                        <label for="studentContact" class="label form-label"><strong>Contact : </strong></label>
                        <label class="label form-label"><strong>${data.stdPhone}</strong></label>
                    </div>
                    <div class="detailsRow">
                        <label for="studentEmail" class="label form-label"><strong>Email : </strong></label>
                        <label class="label form-label"><strong>${data.stdEmail}</strong></label>
                    </div>

                    <h3 class="guardianInfo">Guardian Information</h3>
                    <hr>
                    <div class="detailsRow">
                        <label for="guardianName" class="label form-label"><strong>Name : </strong></label>
                        <label class="label form-label"><strong>${data.guardianName}</strong></label>
                    </div>
                    <div class="detailsRow">
                        <label for="guardianAddress" class="label form-label"><strong>Address : </strong></label>
                        <label class="label form-label"><strong>${data.guardianAddress}</strong></label>
                    </div>
                    <div class="detailsRow">
                        <label for="guardianContact" class="label form-label"><strong>Contact : </strong></label>
                        <label class="label form-label"><strong>${data.guardianPhone}</strong></label>
                    </div>

                    <div class="buttonRow">
                        <button class="btnClear" id="btnUpdate">Update</button>
                        <button class="btnRegister" id="btnDelete" onclick="deleteStudent(${data.id})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    let btnUpdate = document.getElementById('btnUpdate');

    // Add event listener to the update button to show the modal
    btnUpdate.addEventListener('click', function () {
        // Use Bootstrap's modal function to show the modal
        getUpdateStudentID(data.stdId);
        let stdName = document.getElementById('stdName');
        stdName.value = data.stdName;
        let stdAge = document.getElementById('stdAge');
        stdAge.value = data.stdAge;
        let stdContacts = document.getElementById('stdContacts');
        stdContacts.value = data.stdPhone;
        let stdEmail = document.getElementById('stdEmail');
        stdEmail.value = data.stdEmail;
        let guardianName = document.getElementById("guardianName");
        guardianName.value = data.guardianName;
        let guardianAddress = document.getElementById("guardianAddress");
        guardianAddress.value = data.guardianAddress;

        let modal = new bootstrap.Modal(document.getElementById("stdModal"));
        modal.show();
    });

    let btnDelete = document.getElementById("btnDelete");

    btnDelete.addEventListener('click', function () {
        getStudentId(data.stdId);
        let modal = new bootstrap.Modal(document.getElementById("deleteModal"));
        modal.show();

    });
}

async function viewStudentDetails(studentId) {
    let detailContainer = document.getElementById("detailContainer");
    detailContainer.style.display = "flex";
    try {
        let response = await fetch(`http://localhost:8080/student/${studentId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        console.log(data.stdContacts);
        createDetailsContainer(data);

    } catch (error) {

    } finally {

    }

}
function createTableRows(id, name, age, address) {
    let tbody = document.getElementById("tbody");
    let row = document.createElement("tr");
    row.setAttribute("data-id", id);
    row.addEventListener('click', function () {
        let studentId = this.getAttribute("data-id");
        console.log(studentId);
        viewStudentDetails(studentId);
    });
    let nameCell = document.createElement("td");
    let ageCell = document.createElement("td");
    let addressCell = document.createElement("td");
    nameCell.textContent = name;
    ageCell.textContent = age;
    addressCell.textContent = address;
    row.appendChild(nameCell);
    row.appendChild(ageCell);
    row.appendChild(addressCell);
    tbody.appendChild(row);
}
async function getAllStudents() {

    let response = await fetch("https://demo-1-ad4x.onrender.com/student/all");
    let data = await response.json();
    console.log(data);
    data.forEach(element => {
        createTableRows(element.stdId, element.stdName, element.stdAge, element.guardianAddress);
    });
}

getAllStudents();