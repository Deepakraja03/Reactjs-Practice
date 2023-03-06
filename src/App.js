import React, { useState, useEffect } from "react";

const App = () => {
    const [rollNo, setRollNo] = useState('');
    const [name, setName] = useState('');
    const [students, setStudents] = useState([]);
    const handleDelete =(idToDelete) => {
      setStudents(students.filter(student => student.id !== idToDelete));
    };
  
    useEffect(() => {
      const storedStudents = localStorage.getItem('students');
      if (storedStudents) {
        setStudents(JSON.parse(storedStudents));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('students', JSON.stringify(students));
    }, [students]);
  
    function handleSubmit(event) {
      event.preventDefault();
      setStudents([...students, { rollNo, name }]);
      setRollNo('');
      setName('');
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="rollNo">Roll No:</label>
          <input
            type="text"
            id="rollNo"
            value={rollNo}
            onChange={(event) => setRollNo(event.target.value)}
          />
  
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
  
          <button type="submit">Add student</button>
        </form>
  
        <h2>Teachers:</h2>
        <ul>
          {students.map((student) => (
            <li key={student.rollNo}>
              {student.rollNo} - {student.name}
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  

export default App;

