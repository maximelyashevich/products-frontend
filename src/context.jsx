import { useEffect, useState } from "react";
import { createContext } from "react";
import instance from "./axios";
import { json, useLocation } from "react-router-dom";


export const CustomContext = createContext()

export const Context = (props) => {
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})
  const [userComment, setUserComment] = useState({})
  const [anotherUser, setAnotherUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [commentLoading, setCommentLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [myPosts, setMyPosts] = useState([])
  const [pStatus, setPStatus] = useState(200)
  const location = useLocation()
  const [filter, setFilter] = useState({
    item: '', not_me: '0', q: ' '
  })
  const [anotherUserProducts, setAnotherUserProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (!location.pathname.includes('profile') | !location.pathname.includes('product'))
      fetchProducts(filter)
  }, [filter])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  /*
    fetch products
  */
  const fetchProducts = async () => {
    await instance.get(`/posts?&not_me=${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).id : 0}&filter=${filter.item}&from_=${filter.from === 'up' ? 'up' : filter.from === 'down' ? 'down' : ''}&q=${filter.q}&limit=3&page=0`)
      .then((res) => {
        setProducts(res.data)
      }).catch(err => console.log(err))
    setLoading(false)
  }

  const addToCart = (el) => {
    let inCart = false
    cart.forEach(element => {
      if (element.id === el.id) {
        inCart = true
      }
    });
    if (!inCart) {
      setCart(prev => [...prev, el])
    } else {
      alert('Вы уже добавили этот товар!')
    }
  }

  const deleteFromCart = (el) => {
    setCart(prev => prev.filter(element => element.id !== el.id))
  }

  const fetchPurchase = async (id, item) => {
    await instance.post(`/post/${id}`, { seller: item }, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((res) => setPStatus(res.status)).catch(err => console.log(err))
  }

  /*
    fetch signIn | signUp 
  */
  const signUpHandler = async (data) => {

    await instance.post("/registration", {
      ...data,
      balance: 1000
    }).then((res) => {
      setUser(res.data.user)
      localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
      localStorage.setItem('token', JSON.stringify(res.data.access_token))
      setFilter({ ...filter, not_me: res.data.user.id })
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch(err => {
      if (err.response.status === 400) {
        alert('пользователь с такой почтой существует!')
      }
    })
  }

  const signInHandler = async (data) => {
    await instance.post("/login", data).then((res) => {
      setUser(res.data.user)
      localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
      localStorage.setItem('token', JSON.stringify(res.data.access_token))
      setFilter({ ...filter, not_me: res.data.user.id })
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch(err => {
      if (err.response.status === 404) {
        alert('Пользователь с такой почтой не найден!')
      }
      if (err.response.status === 400) {
        alert('Неверный пароль!')
      }
    })
  }

  /*
    fetch user 
  */

  const fetchUser = async () => {
    await instance.get(`/user/${JSON.parse(localStorage.getItem('user')).id}`).then(res => {

      setUser(res.data)
    }).catch(err => console.log(err))
  }

  const fetchPutUser = async (d) => {
    await instance.put(`/user/update`, d, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((res) => {
      localStorage.removeItem("user")
      setUser(res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
    }).catch(err => {
      if (err.response.status === 400) {
        alert('Проверьте данные!')
      }
    })
  }

  const fetchDeleteUser = async (id) => {
    await instance.delete(`/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
  }

  const setUserFromLS = () => {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    if (JSON.parse(localStorage.getItem('cart')) !== null) {
      setCart(JSON.parse(localStorage.getItem('cart')))
    }
  }

  const fetchAnotherUser = async (id) => {
    await instance.get(`/user/${id}`).then((res) =>
      setAnotherUser(res.data)).catch(err => console.log(err))
  }

  const fetchMyPosts = async () => {
    await instance.get(`/user/posts`, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then(({ data }) => {
      setMyPosts(data)
    }).catch(err => alert(err))
  }

  const fetchAnotherUserPosts = async (id) => {
    await instance.get(`/posts/user/${id}`).then((res) => setAnotherUserProducts(res.data)).catch(err => alert(err))
  }

  /*
    fetch comment
  */

  const fetchProductComment = async (id) => {
    instance.get(`/post/${id}`).then((res) => {
      setProduct(res.data)
    }).catch(err => alert(err))
    await instance.get(`/post/comment/${id}`).then((res) => {
      setComments(res.data)
    }).catch(err => alert(err))
    setLoading(false)
    setCommentLoading(false)
  }

  const fetchPutProduct = async (item) => {
    await instance.put(`/post/${item.id}`, item, {
      headers: {
        'Authorization': `Bearer ` + JSON.parse(localStorage.getItem('token'))
      }
    }).then((res) => {
      setProduct(res.data)
    }).catch(err => alert(err))
  }

  const fetchDeleteProduct = async (id) => {
    await instance.delete(`/post/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).catch(err => alert(err))
  }

  const fetchUserComment = async (id) => {
    await instance.get(`/user/${id}`).then((res) => {
      setUserComment(res.data)
    }).catch(err => alert(err))
    setLoading(false)
  }


  const fetchComment = async (data, product) => {
    instance.post("/post/comment", { ...data, product: product.id }, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }).catch(err => alert(err))
    setLoading(false)
  }

  /*
    fetch refresh
  */
  const fetchRefresh = async () => {
    await instance.post("/refresh", { access_token: JSON.parse(localStorage.getItem("token")) }, {
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
    user, setUser,
    products, fetchProducts, fetchProductComment, product, fetchMyPosts,
    setUserFromLS, userComment, fetchUserComment, fetchPutUser, myPosts,
    comments, fetchComment,
    signUpHandler, signInHandler, fetchRefresh,
    fetchAnotherUser, anotherUser,
    loading, commentLoading,
    setFilter, filter,
    cart, addToCart, setCart, deleteFromCart,
    fetchAnotherUserPosts, anotherUserProducts, fetchPutProduct,
    fetchDeleteProduct, fetchDeleteUser, fetchPurchase, pStatus, fetchUser
  }
  return <CustomContext.Provider value={value}>
    {
      props.children
    }
  </CustomContext.Provider>
}
