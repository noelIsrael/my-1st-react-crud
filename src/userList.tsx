// import { useState, useEffect } from 'react'
import { useQuery } from "@tanstack/react-query";
import { getData } from "./apihandlers";
import ProfileViewBtn from "./ProfileViewerBtn";
import { Outlet, useNavigate } from "react-router-dom";
import UserSelector from "./UserSelector";
import { useSelectedPeopleStore } from "./store";
export interface User {
  id: string;
  name: string;
  salary: number;
}

function Card({ human }: { human: Partial<User> }) {
  return (
    <div>
      <h2>{human.name}</h2>
      <p>Salary: ${human.salary?.toFixed(2)}</p>
    </div>
  );
}
export function UserList() {
  const selectedPeople = useSelectedPeopleStore((state) => state.selectedPeople);
  const clearSelectedPeople = useSelectedPeopleStore((state) => state.clearSelectedPeople);
  const { data, isPending, isError, error, refetch } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getData,
  });
  if (isPending) {
    console.log("it is pendingggg");
  }
  if (isError) {
    console.log("error happeneddd", error);
  }
  function handleRefresh() {
    refetch();
  }

  const myNavigator = useNavigate();

  return (
    <>
      <h1>hello noni</h1>
      <h1>Here are the users</h1>
      <h1>the number of selected people: {selectedPeople.length}</h1>
      <button onClick={clearSelectedPeople}>Clear selected people</button>
      <br />
      <button onClick={() => myNavigator("/userList/addNew")}>Add new user</button>
      <br />
      <Outlet />
      <button onClick={handleRefresh}>Refresh</button>
      <div>
        {data?.map(user => (
          <div key={user.id}>
            <Card human={user} />
            <ProfileViewBtn identifyingVariable={user.id} />
            <UserSelector userName={user.name} />
          </div>
        ))}
      </div>
      <button onClick={() => myNavigator(-1)}>Back page</button>
    </>
  );
}

export default UserList;
