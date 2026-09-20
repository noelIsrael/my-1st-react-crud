import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { editUser, getUserById } from "./apihandlers";
import { employeeSchema, type employeeSchemaType } from "./schemas";
import { useParams, useNavigate } from "react-router-dom";
function EditBtn() {
  const queryClient = useQueryClient();
  const myNavigator = useNavigate();
  const { variableIPutInURL } = useParams();
  const whatWeExtracted = variableIPutInURL || "";

  const { data: userDefaultValues, isLoading } = useQuery({
    queryKey: ["user", whatWeExtracted],
    queryFn: () => getUserById(whatWeExtracted),
    enabled: Boolean(whatWeExtracted),
  });

  const myMutator = useMutation({
    mutationFn: ({
      newIdentity,
      whatWeExtracted,
    }: {
      newIdentity: Partial<employeeSchemaType>;
      whatWeExtracted: string;
    }) => editUser(whatWeExtracted, newIdentity),
    onSettled: () => {
      queryClient.invalidateQueries();
    },
    onSuccess: () => {
      console.log("User updated successfully");
      myNavigator(`/userList`);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<employeeSchemaType>({
    resolver: zodResolver(employeeSchema),
    values: userDefaultValues,
  });
  function onsubmit(data: employeeSchemaType) {
    console.log(data);
    myMutator.mutate({ newIdentity: data, whatWeExtracted });
  }
  if(isLoading){
    return <p>Loading</p>
  }

  return (
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
      <button type="submit" disabled={myMutator.isPending}>
        {(myMutator.isPending && "submitting") || "submit"}
      </button>
    </form>
  );
}

export default EditBtn;
