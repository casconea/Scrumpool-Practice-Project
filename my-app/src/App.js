import './App.css';
import {useState} from 'react';

function App() {

const [showSched, setShowSched] = useState(false);
const [selectedDate, setSelectedDate] = useState("");

const handleOptionSelected =(e) => {
  setSelectedDate(e.target.value);
  setShowSched(true);
}

if (showSched) {
//
}
else{
  return (
    <div className="App">
     <label>
      Choose a date: &nbsp;
      <select defaultValue="choose a day" onChange={(e) => handleOptionSelected(e)}>
        <option value="choose a day">Date</option>
        <option value="11/11/2024">11/11/2024</option>
        <option value="11/12/2024">11/12/2024</option>
        <option value="11/13/2024">11/13/2024</option>
      </select>
      </label>
    </div>
    );
  }
}
export default App;
