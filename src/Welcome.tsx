import { useNavigate } from "react-router-dom";
function Welcome() {
  const navigator = useNavigate()
  return (
    <button onClick={()=> navigator("/userList")} >Welcome</button>
  );
}
export default Welcome;
