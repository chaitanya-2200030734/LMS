import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState([]);
  const authToken = localStorage.getItem('token');

  // Simulated data for courses
  const mockCourses = [
    { course_id: 1, courseName: "React Basics", instructor: "John Doe", price: 100, p_link: "path/to/image1" },
    { course_id: 2, courseName: "Node.js Advanced", instructor: "Jane Smith", price: 150, p_link: "path/to/image2" },
    { course_id: 3, courseName: "CSS Flexbox", instructor: "Mike Brown", price: 50, p_link: "path/to/image3" }
  ];

  // Fetching courses and enrolled courses from local storage
  useEffect(() => {
    setCourses(mockCourses); // Simulating a course fetch
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
    setEnrolled(enrolledCourses);
  }, []);

  // Simulating course enrollment
  function enrollCourse(courseId) {
    if (authToken) {
      const newEnrolled = [...enrolled, courseId];
      setEnrolled(newEnrolled);
      localStorage.setItem("enrolledCourses", JSON.stringify(newEnrolled));

      toast.success('Course Enrolled successfully', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });

      setTimeout(() => {
        navigate(`/course/${courseId}`);
      }, 2000);
    } else {
      toast.error('You need to login to continue', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }

  return (
    <div>
      <Navbar page={"courses"} />
      <div className="courses-container" style={{ marginTop: "20px" }}>
        {courses.map((course) => (
          <div key={course.course_id} className="course-card">
            <img src={course.p_link} alt={course.course_name} className="course-image" />
            <div className="course-details">
              <h3 className="course-heading">
                {course.courseName.length < 8
                  ? `${course.courseName} Tutorial`
                  : course.courseName}
              </h3>
              <p className="course-description" style={{ color: "grey" }}>Price: Rs.{course.price}</p>
              <p className="course-description">Tutorial by {course.instructor}</p>
            </div>
            {enrolled.includes(course.course_id) ? (
              <button className="enroll-button" style={{ color: '#F4D03F', backgroundColor: 'darkblue', fontWeight: 'bold' }} onClick={() => navigate("/learnings")}>
                Enrolled
              </button>
            ) : (
              <button className="enroll-button" onClick={() => enrollCourse(course.course_id)}>
                Enroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
