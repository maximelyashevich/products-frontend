import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Post from './pages/Post/Post'
import AddPost from './pages/AddPost/AddPost'
import Header from './layout/Header/Header'
import './scss/style.scss'
import Footer from './layout/Footer/Footer'
import { useEffect, useContext } from "react"
import Profile from "./pages/Profile/Profile"
import Account from "./pages/Account/Account"
import { Cart } from "./pages/Cart/Cart"
import { CustomContext } from "./context"


function App() {

  const {setCart, setUser} = useContext(CustomContext)

  const setUserFromLS = () => {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    if (JSON.parse(localStorage.getItem('cart')) !== null) {
      setCart(JSON.parse(localStorage.getItem('cart')))
    }
  }

  useEffect(() => {
    setUserFromLS()
  }, [])

  return (
    <>
      <div className="app">
        <div className="video-bg">
          <video width="320" height="240" autoPlay loop muted>
            <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4"/>
          </video>
        </div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Post />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/account/:id" element={<Account />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
