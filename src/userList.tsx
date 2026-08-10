import { useState, useEffect } from 'react'
import DeleteBtn from './DeleteBtn'
import EditBtn from './EditBtn'
export interface User {
  id: string
  name: string
  salary: number
}

function Profile({human}: {human: User}) {
    return (
        <div>
            <h2>{human.name}</h2>
            <p>Salary: ${human.salary.toFixed(2)}</p>
        </div>
    )
}
function UserList() {
  const [usersArray, setUsersArray] = useState<User[]>([])
  const [refresh, setrefresh] = useState(0)

  useEffect(() => {
    const fetchUsers = async () => {
      // Replace this with your actual API call
      const response = await fetch('http://localhost:3000/users')
      const data = await response.json()
      setUsersArray(data)
    }
    fetchUsers()
  }, [refresh])

  return (
    <>
    <h1>Here are the users</h1>
    <div>
      {usersArray.map((user) => (
        <div key={user.id}>
          <Profile human={user} />
          <DeleteBtn id={user.id} abilityToRefresh={setrefresh} />
          <EditBtn id={user.id} abilityToRefresh={setrefresh} />
        </div>
        
      ))}
    </div>
    </>
  )
}

export default UserList