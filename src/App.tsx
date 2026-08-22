import Welcome from "./Welcome"
import UserList from "./userList"
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}/>
      <Route path="/userList" element={<UserList/>}/>
      <Route path="/userList/:id" element={<userProfile/>}
    </Routes>
  )
}

export default App