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
    onMutate: async ({ human }: { human: User }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const OldDataInCache = queryClient.getQueryData<User[]>(["users"]);
      queryClient.setQueryData<User[]>(["users"], (oldData) =>
        oldData ? oldData.filter((user) => user.id !== human.id) : [],
      );
      return { OldDataInCache };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error, variables, context) => {
      console.error("Error deleting user:", error);
      queryClient.setQueryData(["users"], context?.OldDataInCache);
      console.log(variables, context?.OldDataInCache);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      myNavigator(-1);
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
