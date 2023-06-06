import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import MyAccount from './pages/MyAccount/MyAccount'
import Post from './pages/Post/Post'
import AddPost from './pages/AddPost/AddPost'
import AnotherAccount from './pages/AnotherAccount/AnotherAccount'
import Header from './layout/Header/Header' 
import './scss/style.scss'
import { useEffect, useState } from "react"

function App() {

  const [user, setUser] = useState({})

  useEffect(()=>{
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  return (
    <>
      <div className="app">
        <Header user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/account" element={<MyAccount/>}/>
          <Route path="/product/:id" element={<Post/>}/>
          <Route path="/add-post" element={<AddPost/>}/>
          <Route path="/another-account" element={<AnotherAccount/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
