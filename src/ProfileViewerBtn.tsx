import { useNavigate } from "react-router-dom";
function ProfileViewBtn({identifyingVariable}:{identifyingVariable:string}){
    const navigate = useNavigate();
    return(
        <button onClick={()=> navigate(`/userList/${identifyingVariable}`)} >View Profile</button>
    )
}
export default ProfileViewBtn;