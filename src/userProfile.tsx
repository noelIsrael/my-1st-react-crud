import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "./apihandlers";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";

function UserProfile() {
  const { variableIPutInURL } = useParams();
  const whatWeExtracted = variableIPutInURL || "";
  const { data } = useQuery({
    queryKey: ["user", whatWeExtracted],
    queryFn: () => getUserById(whatWeExtracted),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 20000,
  });
  console.log("whatWeExtracted", whatWeExtracted);

  return (
    <>
      <ul>
        <li> name {data?.name}</li>
        <li>salary {data?.salary}</li>
      </ul>
      <DeleteBtn human={data}/>
      <EditBtn human={data}/>
    </>
  );
}
export default UserProfile;
