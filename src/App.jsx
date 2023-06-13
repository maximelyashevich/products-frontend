import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import MyAccount from './pages/MyAccount/MyAccount'
import Post from './pages/Post/Post'
import AddPost from './pages/AddPost/AddPost'
import AnotherAccount from './pages/AnotherAccount/AnotherAccount'
import Header from './layout/Header/Header' 
import './scss/style.scss'
import { CustomContext } from "./context"
import { useEffect, useState, useContext } from "react"

function App() {

  const {setUserFromLS} = useContext(CustomContext)
  useEffect(()=>{
    setUserFromLS()
  }, [])

  return (
    <>
      <div className="app">
        <Header />
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
