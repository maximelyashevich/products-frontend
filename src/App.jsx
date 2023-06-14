import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Post from './pages/Post/Post'
import AddPost from './pages/AddPost/AddPost'
import Header from './layout/Header/Header'
import './scss/style.scss'
import Footer from './layout/Footer/Footer'
import { CustomContext } from "./context"
import { useEffect, useContext } from "react"
import Profile from "./pages/Profile/Profile"


function App() {

  const { setUserFromLS, fetchRefresh } = useContext(CustomContext)
  useEffect(() => {
    fetchRefresh()
    setUserFromLS()
  }, [])

  return (
    <>
        <div className="app">
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/*" element={<Profile />} />
              <Route path="/product/:id" element={<Post />} />
              <Route path="/add-post" element={<AddPost />} />
            </Routes>  
          <Footer />
        </div>
    </>
  )
}

export default App
