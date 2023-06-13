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
            setProduct(res.data)}).catch(err => alert(err))
        instance.get(`/post/comment/${id}`).then((res) => {
            setComments(res.data)
        }).catch(err => alert(err))
    }

    const fetchUserComment = (id) => {
        instance.get(`/user/${id}`).then((res) => {
            setUserComment(res.data)
        }).catch(err => alert(err))
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
        fetchUserComment
    }
    return <CustomContext.Provider value={value}>
        {
            props.children
        }
    </CustomContext.Provider>
}

