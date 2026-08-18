//import { useState, useEffect } from 'react'
import {useQuery} from '@tanstack/react-query'
import DeleteBtn from './DeleteBtn'
import EditBtn from './EditBtn'
// import DeleteBtn from './DeleteBtn'
// import EditBtn from './EditBtn'
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
export function UserList() {
  async function fetchUsers() {
    const response = await fetch('http://localhost:3000/users')
    const data = await response.json()
    return data
  }
 const { data: usersArray , isPending, isError, error, refetch } = useQuery <User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers
  })
  function handleRefresh() {
    refetch();
  }
  if (isPending) {
    console.log('it is pernding')
  }
  if (isError) {
    console.log('error happerneddd', Error , error , error.message );
  }
  

  return (
    <>
    <h1>Here are the users</h1>
    <button onClick={handleRefresh}>Refresh</button>
    <div>
      {usersArray?.map((user) => (
        <div key={user.id}>
          <Profile human={user} />
          <DeleteBtn id={user.id} />
          <EditBtn id={user.id} />
          
        </div>
        
      ))}
    </div>
    </>
  )
}

export default UserList