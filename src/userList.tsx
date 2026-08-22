// import { useState, useEffect } from 'react'
import { useQuery } from "@tanstack/react-query";
import { getData } from "./apihandlers";
import ProfileViewBtn from "./ProfileViewerBtn";
export interface User {
  id: string;
  name: string;
  salary: number;
}

function Card({ human }: { human: User }) {
  return (
    <div>
      <h2>{human.name}</h2>
      <p>Salary: ${human.salary.toFixed(2)}</p>
    </div>
  );
}
export function UserList() {
  const { data, isPending, isError, error, refetch } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getData,
  });
  if (isPending) {
    console.log("it is pernding");
  }
  if (isError) {
    console.log("error happerneddd", Error, error, error.message);
  }
  function handleRefresh() {
    refetch();
  }

  return (
    <>
      <h1>hello noni</h1>
      <h1>Here are the users</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <div>
        {data?.map((user) => (
          <div key={user.id}>
            <Card human={user} />
            <ProfileViewBtn id={user.id}/>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserList;
