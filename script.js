const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");
const getStartedButton = document.querySelector(".signIn-btn");

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

    const st = data.Students;
    console.log(st);

    const us = st.find((student) => {
      if (student.email == emailValue && student.password == passwordValue) {
            localStorage.setItem("user", JSON.stringify(student));
            window.location.href = "/student/student.html";
            return student;
      }
    });
    const fc = data.Faculty;
    us = fc.find((faculty) => {
      if (faculty.email == emailValue && faculty.password == passwordValue) {
        console.log(faculty);
        localStorage.setItem("user", JSON.stringify(faculty));
        return faculty;
      }
    });
    if (!us) {
      alert("Invalid email or password");
    } else {
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

const firstSection = document.querySelector(".first-section");

// Add the initial animation classes
firstSection.classList.add("animate__animated", "animate__fadeIn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    firstSection.style.backgroundColor = "black";
    
    // Remove the fade-in class and add the fade-out class
    firstSection.classList.remove("animate__fadeIn");
    // firstSection.classList.add("animate__fadeOut");
  } else {
    firstSection.style.backgroundColor = "white";

    firstSection.classList.remove("animate__fadeOut");
    firstSection.classList.add("animate__fadeIn");
  }
});

function logoBlink() {
    const heading = document.getElementById("welcomeMessage");
    heading.classList.add("neon");

    setTimeout(() => {
        heading.classList.remove("neon");
    }, 1200); // Remove the class after 2 seconds
}

setInterval(logoBlink, 7000); // Blink every 7 seconds

getStartedButton.addEventListener("click", function () {
    window.scrollTo({
        top: document.querySelector("#login").offsetTop,
        behavior: "smooth"
    })})