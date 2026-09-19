import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { editUser } from "./apihandlers";
import { employeeSchema, type employeeSchemaType } from "./schemas";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditBtn() {
  const { variableIPutInURL } = useParams();
  const whatWeExtracted = variableIPutInURL || "";
  const myNavigator = useNavigate();
  const queryClient = useQueryClient();
  const myMutator = useMutation({
    mutationFn: ({ newIdentity, whatWeExtracted }: { newIdentity: Partial<employeeSchemaType>; whatWeExtracted: string }) =>
      editUser(whatWeExtracted, newIdentity),
    onSettled: () => {
      queryClient.invalidateQueries();
    },
    onSuccess: () => {
      console.log("User updated successfully");
      myNavigator(`/userList`);
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<employeeSchemaType>({
    resolver: zodResolver(employeeSchema),
  });
  function onsubmit(data: employeeSchemaType) {
    console.log(data);
    myMutator.mutate({ newIdentity: data, whatWeExtracted });
    console.log("whatWeExtracted", whatWeExtracted);
  }
  return(
    <form onSubmit={handleSubmit(onsubmit)}>
      <label htmlFor="name">New Name:</label>
      <input type="text" id="name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}
      <br />
      <label htmlFor="salary">Update Salary:</label>
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

export default EditBtn;
