import { useState } from "react";
import { createContext } from "react";
import instance from "./axios";

export const CustomContext = createContext()

export const Context = (props) => {
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})
  const [userComment, setUserComment] = useState({})

  const [comments, setComments] = useState([])

  const fetchProducts = () => {
    instance.get('posts?limit=8&page=1')
      .then((res) => {
        setProducts(res.data)
      }).catch(err => alert(err))
  }

  const setUserFromLS = () => {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }

  const fetchProductComment = (id) => {
    instance.get(`/post/${id}`).then((res) => {
      setProduct(res.data)
    }).catch(err => alert(err))
    instance.get(`/post/comment/${id}`).then((res) => {
      setComments(res.data)
    }).catch(err => alert(err))
  }

  const fetchUserComment = (id) => {
    instance.get(`/user/${id}`).then((res) => {
      setUserComment(res.data)
    }).catch(err => alert(err))
  }

  const fetchPutUser = (d) => {
    console.log(d)
    instance.put(`/user/update`, d, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((res) => {
      console.log(res.data)
      localStorage.removeItem("user")
      localStorage.setItem('user', JSON.stringify(res.data))
    }).catch(err => alert(err))
  }

  const fetchComment = async (data, product) => {
    instance.post("/post/comment", { ...data, product: product.id }, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }).catch(err => alert(err))
  }

  const signUpHandler = async (data) => {
    await instance.post("/registration", {
      ...data,
      balance: 1000
    }).then((res) => {
      setUser(res.data.user)
      localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
      localStorage.setItem('token', JSON.stringify(res.data.access_token))
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch(err => alert(err))
  }


  const signInHandler = async (data) => {
    await instance.post("/login", data).then((res) => {
      setUser(res.data.user)
      localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
      localStorage.setItem('token', JSON.stringify(res.data.access_token))
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch(err => alert(err))
  }

  const fetchRefresh = async () => {
    await instance.post("/refresh", {access_token: JSON.parse(localStorage.getItem("token"))}, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("refresh"))}`
      }
    }).then((res) => {
      if (res.status !== 200) {
        localStorage.removeItem("token")
        localStorage.setItem("token", JSON.stringify(res.data.access_token))
      }
    })
  }

  const value = {
    user,
    setUser,
    products,
    fetchProducts,
    setUserFromLS,
    fetchProductComment,
    product,
    comments,
    userComment,
    fetchUserComment,
    fetchPutUser,
    fetchComment,
    signUpHandler,
    signInHandler, fetchRefresh
  }
  return <CustomContext.Provider value={value}>
    {
      props.children
    }
  </CustomContext.Provider>
}

