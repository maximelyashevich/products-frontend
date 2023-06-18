import { useEffect, useState } from "react";
import { createContext } from "react";
import instance from "./axios";


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
  const [status, setStatus] = useState('')
  const [myPosts, setMyPosts] = useState([])
  const [filter, setFilter] = useState({
    item: '', not_me: '0', q: ' '
  })
  const [cart, setCart] = useState([])

  useEffect(() => {
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
        if (res.data.length === 0) {
          setStatus('None')
        } else {
          setStatus('')
        }
      }).catch(err => console.log(err.status))
    setLoading(false)
  }

  const addToCart = (el) => {
    let inCart = false
    cart.forEach(element => {
      if (element.id === el.id){
        inCart = true
      }
    });
    if (!inCart) {
      setCart(prev => [...prev, el])  
    } else {
      alert('Вы уже добавили этот товар!')
    }
    
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
    }).catch(err => alert(err))
  }

  const signInHandler = async (data) => {
    await instance.post("/login", data).then((res) => {
      setUser(res.data.user)
      localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
      localStorage.setItem('token', JSON.stringify(res.data.access_token))
      setFilter({ ...filter, not_me: res.data.user.id })
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch(err => alert(err))
  }

  /*
    fetch user 
  */

  const fetchPutUser = async (d) => {
    await instance.put(`/user/update`, d, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((res) => {
      console.log(res.data)
      localStorage.removeItem("user")
      setUser(res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
    }).catch(err => alert(err))
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

  /*
    fetch comment
  */

  const fetchProductComment = async (id) => {
    await instance.get(`/post/${id}`).then((res) => {
      setProduct(res.data)
    }).catch(err => alert(err))
    await instance.get(`/post/comment/${id}`).then((res) => {
      setComments(res.data)
    }).catch(err => alert(err))
    setLoading(false)
    setCommentLoading(false)
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
    signInHandler, fetchRefresh,
    fetchAnotherUser, anotherUser,
    loading, commentLoading, setFilter, filter,
    fetchMyPosts, status, myPosts, cart, addToCart, setCart
  }
  return <CustomContext.Provider value={value}>
    {
      props.children
    }
  </CustomContext.Provider>
}
