import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import instance from '../../axios'

const Post = () => {

  const params = useParams()
  const [product, setProduct] = useState({})

  useEffect(()=>{
    instance.get(`/post/${params.id}`).then((res) => {
      setProduct(res.data)
    })
  },[])


  return (
    <div className='product'>
      <div className='container'>
          <div className='product__nav'>
            <Link to='/'>Главная</Link> - <p>Продукт</p>
          </div>
        <div className='product__content'>
          <div className='product__content__left'>
            <img className='product__content-img' src={product.img} alt={product.title} />
          </div>
          <div className='product__content__right'>
            <h2 className='product__content-title'>{product.title}</h2>
            <p className='product__content-description'>{product.description}</p>
            <p className='product__content-price'>{product.price} $</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post