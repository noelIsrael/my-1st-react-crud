import { useState } from "react"
import type { User } from "./userList"
import { useMutation,useQueryClient } from "@tanstack/react-query"

const addUser = async ({newUser}: { newUser: Partial<User> }) => {
  await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newUser.name,
      salary: newUser.salary
    })
  })
}

function AddNew() {
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);
  const noni = useQueryClient()

  const mutationn = useMutation ({
    mutationFn : addUser,
    onSuccess: ()=>{
      noni.invalidateQueries({queryKey:['users']})
    }})
  
  const handleAddNew = () => {
    setIsAdding(!isAdding);
  }
async function handleSubmit() {
  await mutationn.mutate({newUser:{name,salary}})
}

  return (
    <>
      <button onClick={handleAddNew}>Add New</button>
        {isAdding && (
          <div>
            <h3>Here is the form</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              setIsAdding(false)
              handleSubmit()
            }}>
              <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
              <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(parseFloat(e.target.value) || 0)} />
              <button type="submit">Save</button>
            </form>
          </div>
        )}
    </>
  )
}

export default AddNew