const data = [
    "Students" = [
        {
            "student_id": 1,
            "name": "John Doe",
            "age": 25,
            "email": "johndoe@example.com",
            "password": "password123",
        },
        {
            "student_id": 2,
            "name": "Jane Doe",
            "age": 24,
            "email": "janedoe@example.com",
            "password": "password456",
        },
        {
            "student_id": 3,
            "name": "John Smith",
            "age": 26,
            "email": "johnsmith@example.com",
            "password": "password789",
        }
    ],
    "Faculty" = [
        {
            "faculty_id": 1,
            "name": "Dr. John Doe",
            "age": 45,
            "email": "drjohndoe@example.com",
            "password": "password123",
        },
        {
            "faculty_id": 2,
            "name": "Dr. Jane Doe",
            "age": 44,
        },
        {
            "faculty_id": 3,
            "name": "Dr. John Smith",
            "age": 46,
        }
    ],
    "Sessions" = [
        {
            "session_id": 1,
            "session_name": "Session 1",
            "session_date": "2021-01-01",
            "session_time": "10:00:00",
            "session_duration": 60,
            "session_location": "Location 1",
            "faculty_id": 1,
            "student_id":1,
        },
        {
            "session_id": 2,
            "session_name": "Session 2",
            "session_date": "2021-01-02",
            "session_time": "11:00:00",
            "session_duration": 60,
            "session_location": "Location 2",
            "faculty_id": 2,
            "student_id":2,
        },
        {
            "session_id": 3,
            "session_name": "Session 3",
            "session_date": "2021-01-03",
            "session_time": "12:00:00",
            "session_duration": 60,
            "session_location": "Location 3",
            "faculty_id": 3,
            "student_id":3,
        }],
]

export default data;