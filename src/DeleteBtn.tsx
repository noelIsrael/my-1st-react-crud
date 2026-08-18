import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "./userList";
//this function is just a function that operates deletion
async function deleter({ id }: { id: string }) {
  await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  });
}

//this is the component that returns a button
function DeleteBtn(id: { id: string }) {
  //initiation the manager
  const queryClient = useQueryClient();
  
  
  //the hook need
  const mutation = useMutation({
    mutationFn: deleter,
    onMutate: async (variables)=>{
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const OldDataInCache = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((user: User) => user.id !== variables.id);
      });
      return { OldDataInCache };
    },
    
    // onSuccess:()=>{
    //   queryClient.invalidateQueries({queryKey:['users']})
    // }
    onError: (error, variables, context) => {
      console.error("Error deleting user:", error);
      queryClient.setQueryData(["users"], context?.OldDataInCache);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  //when clicked i want to handle that event by doing

  function handleClick() {
    mutation.mutate({ id: id.id });
  }
  return <button onClick={handleClick}>Delete</button>;
}
export default DeleteBtn;
