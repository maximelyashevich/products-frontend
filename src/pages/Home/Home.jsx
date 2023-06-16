import React, { useEffect, useContext } from 'react'
import { CustomContext } from '../../context'

import { Card } from '../../components/Card/Card'

const Home = () => {

  const { products, fetchProducts, user } = useContext(CustomContext)

  useEffect(() => {
    fetchProducts(user.id)
  }, [])


  return (
    <div className='home'>
      <div className="container">
        <div className='home__content'>
          {
            products.map((item) => (
              <Card key={item.id} item={item} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home