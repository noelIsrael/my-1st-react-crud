import type { User } from "./UserList";
import { editUser } from "./apihandlers";
import { useQueryClient, useMutation } from "@tanstack/react-query";

function EditBtn({ human }: { human: User }) {
  const queryClient = useQueryClient();
  const myMutator = useMutation({
    mutationFn: ({
      newIdentity,
      id,
    }: {
      newIdentity: Partial<User>;
      id: string;
    }) => editUser(id, newIdentity),
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });
  async function handleSubmit() {
    myMutator.mutate({ newIdentity: { name, salary }, id: human.id });
  }
  return (
    <>
      <div>
        <h3>Here is the form</h3>
      </div>
    </>
  );
}

export default EditBtn;
