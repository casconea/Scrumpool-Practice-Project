import React, { useState } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
  const [regId, setRegId] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [fileError, setFileError] = useState(false);
  const [studentCourses, setStudentCourses] = useState([]); // Store all courses for the student
  const [showDescription, setShowDescription] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null); // Store selected course for description

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setFileError(true);
      return;
    }
    setFileError(false);

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
      error: (error) => {
        console.error("Error parsing the CSV file:", error);
      },
    });
  };

  const fetchData = () => {
    if (!regId) {
      alert("Please enter a registration number.");
      return;
    }

    // Collect all courses for the registration number
    const courses = csvData.filter((row) => row['Registration Number'] === regId);

    if (courses.length > 0) {
      setStudentCourses(courses);
    } else {
      alert("No data found for this registration number.");
      setStudentCourses([]);
    }
  };

  const toggleDescription = (course) => {
    setSelectedCourse(course);
    setShowDescription(!showDescription);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Course Schedule</h1>

      <div className="input-container">
        <label htmlFor="regid">Enter Registration Number:</label>
        <input
          type="text"
          id="regid"
          value={regId}
          onChange={(e) => setRegId(e.target.value)}
          placeholder="Enter your registration number"
          className="input-field"
        />
        <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
      </div>

      <div className="file-upload">
        <input type="file" accept=".csv" onChange={handleFileUpload} className="file-input" />
        {fileError && <p className="error-message">Please upload a valid CSV file.</p>}
        <p>Upload the CSV file containing the schedule data.</p>
      </div>

      {studentCourses.length > 0 && (
        <div className="student-data">
          <h2>Student Data:</h2>
          {studentCourses.map((course, index) => (
            <div className="data-block" key={index}>
              <div className="data-header">
                <h3>{course['Course']}</h3>
                <button className="info-button" onClick={() => toggleDescription(course)}>ℹ️</button>
              </div>
              <div className="data-content">
                <p><strong>Registration Number:</strong> {course['Registration Number']}</p>
                <p><strong>Room:</strong> {course['Room']}</p>
                <p><strong>Days of the Week:</strong> {course['Days of the Week']}</p>
                <p><strong>Time:</strong> {course['Time']}</p>
                <p><strong>Instructor:</strong> {course['Instructor']}</p>
                <p><strong>Credits:</strong> {course['Credits']}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDescription && selectedCourse && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-button" onClick={() => toggleDescription(null)}>&times;</span>
            <h2>Course Description</h2>
            <p>{selectedCourse['Description']}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
