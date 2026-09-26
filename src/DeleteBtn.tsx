import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "./UserList";
import { deleteUser } from "./apihandlers";
import { useNavigate } from "react-router-dom";
import { useSelectedPeopleStore } from "./store";

//this is the component that returns a button
function DeleteBtn({human}: {human: User}) {
  const removeSelectedPerson = useSelectedPeopleStore((state) => state.removeSelectedPerson);
  const myNavigator = useNavigate();
  //initiation the manager
  const queryClient = useQueryClient();

  //the hook need
  const myMutation = useMutation({
    mutationFn: ({ human }: { human: User }) => deleteUser(human.id),

    onSuccess: () => {
      queryClient.removeQueries({queryKey:["user", human.id]})
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      myNavigator("/userList");
    },
  });

  //when clicked i want to handle that event by doing

  function handleClick() {
    myMutation.mutate({ human });
    removeSelectedPerson(human.name);
  }
  return <button onClick={handleClick}>Delete</button>;
}
export default DeleteBtn;
