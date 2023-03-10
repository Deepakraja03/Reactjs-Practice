import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [rollNo, setRollNo] = useState('');
    const [name, setName] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
  
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
      const newStudent = { rollNo, name };
      setStudents([...students, newStudent]);
      setRollNo('');
      setName('');
    }
  
    function handleDelete() {
      const updatedStudents = students.filter((student) => student !== selectedStudent);
      setStudents(updatedStudents);
      setSelectedStudent(null);
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
  
          <button type="submit">Add Teacher</button>
        </form>
  
        <h2>Teachers:</h2>
        <ul>
          {students.sort((a, b) => a.name.localeCompare(b.name)).map((student) => (
            <li key={student.rollNo}>
              {student.rollNo} - {student.name}
              <button onClick={() => setSelectedStudent(student)}>Select</button>
            </li>
          ))}
        </ul>
  
        {selectedStudent && (
          <div>
            <h2>Selected Teacher:</h2>
            <p>{selectedStudent.rollNo} - {selectedStudent.name}</p>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  }
  
  export default App;
  

