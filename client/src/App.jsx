// Necessary imports:
import './App.css'
import { Routes, Route } from "react-router-dom";
// Components:
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
// Pages:
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import Feed from './pages/Feed.jsx';
import Error from './pages/Error.jsx';



function App () {
  

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route  path='/' element={<Login/>} />
        <Route  path='/signup' element={<Signup/>}/>
        <Route  path='/profile/:userId' element={<Profile/>}/>
        <Route  path='/feed' element={<Feed/>}/>

        <Route path="*" element={<Error />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  )
}

export default App
