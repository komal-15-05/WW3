let sessionList = [];

let data ={};

const getData = async () => {
  data = await fetch("../dummydata.json").then( async(response) => {
    const data = await response.json()
    return  data
  });
  console.log(data);
};

window.addEventListener("load", getData);

const user = JSON.parse(localStorage.getItem("user"));

const setSessions = async () =>{
    const sessions = await data.Sessions
    console.log(sessions)
    sessions.map((ses)=>{
        if(user.faculty_id == ses.faculty_id){
            console.log("oho")
            sessionList.push(ses)
        }
    })
}




function scheduleSession() {
    let selectedTimes = [];
    let checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
    
    checkboxes.forEach((checkbox) => {
        selectedTimes.push(checkbox.value);
    });

    if (selectedTimes.length === 0) {
        alert("Please select at least one time slot.");
        return;
    }

    // Simulating a booking by a student
    let studentName = "John Doe"; // Example student name
    let sessionDate = new Date().toLocaleDateString();

    selectedTimes.forEach(time => {
        let session = {
            studentName: studentName,
            date: sessionDate,
            time: time
        };
        sessionList.push(session);
        displaySessionDetails(session);
    });

    // Clear the selected checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function displaySessionDetails(session) {
    let sessionListDiv = document.getElementById('sessionList');
    
    // Clear the "No sessions booked yet." message
    if (sessionList.length === 1) {
        sessionListDiv.innerHTML = '';
    }
    const students = data.Students
    const student = students.map((st)=>{
        if(st.student_id == session.student_id){
            return st
        }
    })
    let sessionItem = document.createElement('div');
    sessionItem.className = 'session-item';
    sessionItem.innerHTML = `
        <h3>Session with ${student[0].name}</h3>
        <p>Date: ${session.session_date}</p>
        <p>Time: ${session.session_time}</p>
        <p>Duration: ${session.session_duration}</p>
        <p>Location: ${session.session_location}</p>

    `;
    sessionListDiv.appendChild(sessionItem);
}


window.addEventListener("load", () => {
    setTimeout(() => {
        console.log(sessionList);
        
        if (!user.faculty_id) {
            window.location.href = "/";
        } else {
            setSessions();
            console.log(sessionList);
            setTimeout(()=>{
                sessionList.map((ses) => {
                    displaySessionDetails(ses)});
            },2000)
        }
    }, 2000); // The setTimeout requires the function to be properly wrapped
});

function saveSelectedSlotsToLocalStorage() {
    let selectedSlots = [];
    let checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
    
    checkboxes.forEach((checkbox, index) => {
        let slot = {
            slot_id: index + 1,
            faculty_id: user.faculty_id,
            slot_time: checkbox.value,
            slot_duration: 60, // Assuming a fixed duration of 60 minutes
            available: true
        };
        selectedSlots.push(slot);
    });

    if (selectedSlots.length === 0) {
        alert("Please select at least one time slot.");
        return;
    }

    localStorage.setItem("selectedSlots", JSON.stringify(selectedSlots));
    alert("Selected slots have been saved.");
}

document.querySelector('.schedule-btn').addEventListener('click', saveSelectedSlotsToLocalStorage);