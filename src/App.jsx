import './App.css';
import Login from './Login';
import LandingPage from './LandingPage.jsx'
import UserList from './UserList.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/users" element={<UserList />}></Route>
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
