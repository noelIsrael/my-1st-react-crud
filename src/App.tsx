import { useNavigate } from "react-router-dom";
function App() {
  const mynavigator = useNavigate();
  return <button onClick={() => mynavigator("/userList")}>Welcome</button>;
}

export default App;
