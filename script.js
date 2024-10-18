const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");


let data = [];
async function getData() {
    data = await fetch("../dummydata.json").then((response) => {
        return response.json();
    });
    console.log(data);
}

window.addEventListener("load", getData);

passwordInput.addEventListener("input", function () {
    const passwordValue = passwordInput.value;
    const passwordLength = passwordValue.length;

    if (passwordLength < 8) {
        passwordInput.style.outline = "2px solid red";
    } else {
        passwordInput.style.outline = "2px solid green";
    }
});

emailInput.addEventListener("input", function () {
    const emailValue = emailInput.value;
    const emailLength = emailValue.length;

    if (emailLength < 8) {
        emailInput.style.outline = "2px solid red";
    } else {
        emailInput.style.outline = "2px solid green";
    }
});

submitButton.addEventListener("click", function (event) {
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    if (emailValue === " " || passwordValue === " ") {
        alert("Please fill in all fields");
    } else {
        event.preventDefault();

        const st = data.Students
        console.log(st)

        const us = st.find((student) => {
            if (student.email == emailValue && student.password == passwordValue) {
                console.log(student)
                return student
            }
        });
        const fc = data.Faculty
        us = fc.find((faculty) => {
            if (faculty.email == emailValue && faculty.password == passwordValue) {
                console.log(faculty)
                return faculty
            }
        });
        console.log(us)
        if (!us) {
            alert("Invalid email or password");
        }
        else {
            alert("Login successful");
        }
    }
});

function validateForm() {
    if (emailInput.validity.valid && passwordInput.validity.valid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);
