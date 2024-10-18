let data = []

const getData = async () => {
    data = await fetch("../dummydata.json").then((response) => {
        return response.json();
    });
    console.log(data);
}

window.addEventListener("load", getData);

const user = JSON.parse(localStorage.getItem("user"));


// let scrollcontainer = document.querySelector('.gallery');
// let backbtn = document.querySelector("backbtn");
// let nextbtn = document.querySelector("nextbtn");

// scrollcontainer.addEventListener('wheel', (evt)=>{
//     evt.preventDefault();
//     scrollcontainer.scrollLeft += evt.deltaY;
// });

// nextbtn.addEventListener('click', ()=>{
//     scrollcontainer.computedStyleMap.scrollbehavior = "smooth";
//     scrollcontainer.scrollLeft += 900;
// });

// backbtn.addEventListener('click', ()=>{
//     scrollcontainer.computedStyleMap.scrollbehavior = "smooth";
//     scrollcontainer.scrollLeft -= 900;
// });

const setSessions = async () =>{
    const sessions = await data.Sessions
    console.log(sessions)
    const userSessions = await sessions.filter((ses)=>{
        if(ses.student_id == user.student_id){
            return ses
        }
    })

    if(userSessions.length == 0){
        document.querySelector("#sessionDetails").insertAdjacentHTML('beforeend',
            `<p id="pending">No upcoming sessions!</p>`
        )
        return;
    }

    userSessions.map((ses)=>{
        console.log(ses)
        const faculty = data.Faculty.find((fac)=>{
            if(fac.faculty_id == ses.faculty_id){
                console.log(fac)
                return fac
            }})
        document.querySelector("#sessionDetails").insertAdjacentHTML('beforeend',
            `<div class="session-info">
                <h2>${faculty.Name}</h2>
                <p>${ses.session_date}</p>
                <p>${ses.session_time}</p>
                <p>${ses.session_duration}</p>
                <p>${ses.session_location}</p>
            </div>`
        )
    })

}

const display = async () =>{
    const Faculty = data.Faculty
    const slots = data.Slots
    console.log(slots, Faculty)
    Faculty.map(async (teacher)=>{
        const slot = await slots.map( (slot)=>{
            if(slot.faculty_id == teacher.faculty_id){
                return slot
            }
        })
        if(slot.length == 0){
            console.log("No slots available")
        }
        else{

            document.querySelector(".gallery").insertAdjacentHTML("beforebegin",
                `<div class="card">
                <div class="title">
                <div class="head">
                <div class="info">
                <h2 class="name">${teacher.name}</h2>
                <span class="designation">${teacher.Designation}</span>
                </div>
                <div class="image">
                <img src=${teacher.img} alt="Image">
                </div>
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
                    
                    <select>
                    ${
                     slot.map(s => `<option value="${s.slot_id}">${s.slot_time}</option>`).join('')
                    }
                    </select>
                    </div>
                    <button class="book">Book a Session</button>
                    </div>
                    </div>
                    </div>`
                )
            }
    })}

setTimeout(() => {
    setSessions()
    display()
}, 2000);