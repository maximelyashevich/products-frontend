import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import { Link } from 'react-router-dom'

const Home = () => {

  const [products, setProducts] = useState([])

  useEffect(()=>{
    instance.get('posts')
    .then((res) => {
      setProducts(res.data)
    })
  }, [])

  //console.log(products)

  return (
    <div className='home'>
      <div className="container">
        <div className='home__content'>
        {
          products.map((item) => (
            <div className='home__card' key={item.id}>
              <Link to={`product/${item.id}`}> 
              <img className='home__img' src={item.img} alt="" />
               <h2 className='home__title'>{item.title}</h2>
               <p className='home__description'>{item.description}</p>
               <span className='home__price'>{item.price} $</span>
              </Link>
            </div>             
          ))
        }
      </div>
      </div>     
    </div>
  )
}

export default Home