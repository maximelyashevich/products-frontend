import { useEffect, useState, createContext, useMemo } from "react";
import instance from "./axios";
import { useLocation } from "react-router-dom";

export const CustomContext = createContext()

export const Context = (props) => {
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [commentLoading, setCommentLoading] = useState(true)
  const location = useLocation()
  const [filter, setFilter] = useState({
    item: '', not_me: '0', q: ' '
  })
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (!location.pathname.includes('profile') || !location.pathname.includes('product'))
      fetchProducts()
  }, [filter])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  /*
    fetch products
  */

  const fetchProducts = async () => {
    await instance.get(`/posts?&not_me=${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).id : 0}&filter=${filter.item}&from_=${filter.from === 'up' ? 'up' : 'down'}&q=${filter.q}&limit=3&page=0`)
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

  /*
    fetch user 
  */

  const fetchUser = async () => {
    if (JSON.parse(localStorage.getItem('user')).id) {
       await instance.get(`/user/${JSON.parse(localStorage.getItem('user')).id}`).then(res => {
      setUser(res.data)
    }).catch(err => console.log(err))
    }
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

  const value = useMemo(() => ({
    user, setUser, products, fetchProducts, fetchProductComment,
    product, comments, loading, commentLoading, setFilter, filter,
    cart, addToCart, setCart, fetchUser, fetchPutUser, setProduct
  }), [ user, setUser, products, fetchProducts, fetchProductComment,
    product, comments, loading, commentLoading, setFilter, filter,
    cart, addToCart, setCart, fetchUser, fetchPutUser, setProduct])

  return <CustomContext.Provider value={value}>
    {
      props.children
    }
  </CustomContext.Provider>
}
