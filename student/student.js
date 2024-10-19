let data = [];

const getData = async () => {
  data = await fetch("../dummydata.json").then((response) => {
    return response.json();
  });
  console.log(data);
};

window.addEventListener("load", getData);

const user = JSON.parse(localStorage.getItem("user"));

let scrollcontainer = document.querySelector('.gallery');
// let backbtn = document.querySelector("backbtn");
// let nextbtn = document.querySelector("nextbtn");

scrollcontainer.addEventListener('wheel', (evt)=>{
    evt.preventDefault();
    scrollcontainer.scrollLeft += evt.deltaY;
});

// nextbtn.addEventListener('click', ()=>{
//     scrollcontainer.computedStyleMap.scrollbehavior = "smooth";
//     scrollcontainer.scrollLeft += 900;
// });

// backbtn.addEventListener('click', ()=>{
//     scrollcontainer.computedStyleMap.scrollbehavior = "smooth";
//     scrollcontainer.scrollLeft -= 900;
// });

const setSessions = async () => {
    console.log(localStorage.getItem("session"))
  const sessions = JSON.parse(localStorage.getItem("session")) ?? await data.Sessions;
  console.log(sessions);
  let userSessions = sessions;
  if(Array.isArray(sessions)){
      userSessions = sessions.filter((ses) => {
          if (ses.student_id == user.student_id) {
              return ses;
            }
        });
    }

  if (userSessions.length == 0) {
    document
      .querySelector("#sessionDetails")
      .insertAdjacentHTML(
        "beforeend",
        `<p id="pending">No upcoming sessions!</p>`
      );
    return;
  }

  Array.isArray(userSessions) ?  userSessions.map((ses) => {
    console.log(ses);
    const faculty = data.Faculty.find((fac) => {
      if (fac.faculty_id == ses.faculty_id) {
        console.log(fac);
        return fac;
      }
    });
    document.querySelector("#sessionDetails").insertAdjacentHTML(
      "beforeend",
      `<div class="session-info">
                <h2>${faculty.name}</h2>
                <p>${ses.session_date}</p>
                <p>${ses.session_time}</p>
                <p>${ses.session_duration}</p>
                <p>${ses.session_location}</p>
            </div>`
    );
  }) : faculty = data.Faculty.find((fac) => {
    if (fac.faculty_id == userSessions.faculty_id) {
      console.log(fac);
      return fac;
    }
  });  document.querySelector("#sessionDetails").insertAdjacentHTML(
    "beforeend",
    `<div class="session-info">
              <h2>${faculty.name}</h2>
              <p>${userSessions.session_date}</p>
              <p>${userSessions.session_time}</p>
              <p>${userSessions.session_duration}</p>
              <p>${userSessions.session_location}</p>
          </div>`
  );
};

const display = async () => {
  const Faculty = data.Faculty;
  const slots = data.Slots;
  console.log(slots, Faculty);
  Faculty.map(async (teacher, index) => {
    const slot = await slots.map((slot) => {
        if (slot.faculty_id == teacher.faculty_id) {
            return slot;
        }
    });
    const availableSlots = slot.filter(s => s !== undefined);
    const cardHTML = `
        <div class="card">
            <div class="title">
                    <div class="info">
                        <h2 class="name">${teacher.name}</h2>
                        <span class="designation">${teacher.Designation}</span>
                    </div>
                    <div class="image">
                        <img src=${teacher.image} alt="Image">
                    </div>
            </div>
            <div class="separator"></div>
            <div class="content">
                <ul>
                    <li>
                        <span class="bold">Qualification: </span> <span>${teacher.Qualification}</span>
                    </li>
                    <li>
                        <span class="bold">Phone : </span> <span>+91-1672-253208</span>
                    </li>
                    <li>
                        <span class="bold">Email: </span> <span><a href="mailto:${teacher.email}">${teacher.email}</a></span>
                    </li>
                </ul>
                <div class="lower">
                    <div class="select">
                        ${
                            availableSlots.length > 0 
                            ? `<select>${availableSlots.map(s => s.available ? `<option value="${s.slot_id}">${s.slot_time}</option>` : `<option value = "${s.sloot_id}" disabled>${s.slot_time}<span class="not-available">Booked</span></option>`).join('')}</select>`
                            : `<span class="busy">Busy now</span>`
                        }
                    </div>
                    ${availableSlots.length > 0 ? `<button class="book" id="book-session-${index}" type="button" data-fac=${teacher.faculty_id}>Book a Session</button>` : ''}
                </div>
            </div>
        </div>
    `;
    let cardContainer = document.createElement('div');
    cardContainer.insertAdjacentHTML('beforeend', cardHTML);
    document.querySelector(".gallery").appendChild(cardContainer);

    if (availableSlots.length > 0) {
        const bookbtn = document.getElementById(`book-session-${index}`);
        const fac_id = bookbtn.dataset.fac; // Corrected the way to access data attribute
        bookbtn.addEventListener("click", () => {
            const selectedSlot = document.querySelector(`#book-session-${index}`).previousElementSibling.querySelector('select').value;
            const sessionTemplate = {
                session_id: Math.floor(Math.random() * 1000), // Generate a random session ID
                session_name: `Session with ${teacher.name}`,
                session_date: new Date().toISOString().split('T')[0], // Current date
                session_time: selectedSlot,
                session_duration: 60,
                session_location: "Online", // Example location
                faculty_id: fac_id,
                student_id: user.student_id
            };

            localStorage.setItem('session', JSON.stringify(sessionTemplate));
            alert('Session booked successfully!');
        });
    }
});
};

setTimeout(() => {
    setSessions();
    display();
}, 2000);



function buttonShake() {
  const button = document.getElementById("btn");
  button.classList.add("shake");

  setTimeout(() => {
      button.classList.remove("shake");
  }, 1200); // Remove the class after 1.2 seconds
}

setInterval(buttonShake, 5000); // Shake every 7 seconds