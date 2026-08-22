import { useNavigate } from "react-router-dom";
function ProfileViewBtn({id}:{id:string}){
    const navigate = useNavigate();
    return(
        <button onClick={()=> navigate(`/userList/${id}`)} >View Profile</button>
    )
}
export default ProfileViewBtn;