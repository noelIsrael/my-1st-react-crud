import { useParams } from "react-router-dom";
import {useState} from "react"

function UsersForm() {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const [name, setName] = useState("");
    const [salary, setSalary] = useState(0);
    console.log("isEditinggg", isEditing, "idddd", id);
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Handle form submission
    }}>
      <h1>User Form</h1>
      <input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="number" 
        placeholder="Salary" 
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
      />
      <button>Submit</button>
    </form>
  );
}

export default UsersForm;