let sessionList = [];

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

    let sessionItem = document.createElement('div');
    sessionItem.className = 'session-item';
    sessionItem.innerHTML = `
        <h3>Session with ${session.studentName}</h3>
        <p>Date: ${session.date}</p>
        <p>Time: ${session.time}</p>
    `;
    sessionListDiv.appendChild(sessionItem);
}
