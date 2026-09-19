import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser } from "./apihandlers";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { employeeSchema, type employeeSchemaType } from "./schemas";
import { useNavigate } from "react-router-dom";

function AddNew() {
  const myNavigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<employeeSchemaType>({
    resolver: zodResolver(employeeSchema),
  });

  const queryClient = useQueryClient();
  const myMutator = useMutation({
    mutationFn: (newIdentity: Partial<employeeSchemaType>) =>
      addUser(newIdentity),
    onSettled: () => {
      queryClient.invalidateQueries();
    },
    onSuccess: () => {
      console.log("User added successfully");
      myNavigator(`/userList`);
    }
  });
  function onsubmit(data: employeeSchemaType) {
    console.log(data);
    myMutator.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}
      <br />
      <label htmlFor="salary">Salary:</label>
      <input
        type="number"
        id="salary"
        {...register("salary", { valueAsNumber: true })}
      />
      {errors.salary && <p>{errors.salary.message}</p>}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddNew;
