import type { User } from "./UserList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "./apihandlers";
import z from "zod";
import{ useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z.string().min(3).max(100),
  salary: z.number().min(100),
});
type AddNew = z.infer<typeof userSchema>;

function AddNew() {
  const { register, handleSubmit, formState: { errors } } = useForm<AddNew>({
    resolver: zodResolver(userSchema),
  });

  const queryClient = useQueryClient();

  const myMutator = useMutation({
    mutationFn: ({ newUser }: { newUser: Partial<User> }) => addUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <>
      <div>
        <h3>Here is the form</h3>
        <form onSubmit={handleSubmit((data) => {
          myMutator.mutate({ newUser: data });
        })}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" {...register("name")} />
          {errors.name && <span>name must be between 3 and 100 characters</span>}
          <br />
          <label htmlFor="salary">Salary:</label>
          <input type="number" id="salary" {...register("salary", { valueAsNumber: true })} />
          {errors.salary && <span>salary must be a number greater than or equal to 100</span>}
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default AddNew;
