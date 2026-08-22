import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "./userList";
import { deleteUser } from "./apihandlers";

//this is the component that returns a button
function DeleteBtn({human}: {human: User}) {
  //initiation the manager
  const queryClient = useQueryClient();

  //the hook need
  const mutation = useMutation({
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
    },
  });

  //when clicked i want to handle that event by doing

  function handleClick() {
    mutation.mutate({ human });
  }
  return <button onClick={handleClick}>Delete</button>;
}
export default DeleteBtn;
