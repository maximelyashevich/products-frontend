import React, { useEffect, useContext } from 'react'
import { CustomContext } from '../../context'
import { Card } from '../../components/Card/Card'
import CardLoading from '../../components/Loading/CardLoading'

const Home = () => {

  const { products, fetchProducts, user, loading } = useContext(CustomContext)

  useEffect(() => {
    fetchProducts(user.id)
  }, [])

  return (
    <div className='home'>
      <div className="container">
        <div className='home__content'>
          {products.length === 0 ? <p>Нет таких товаров...</p> : loading ? <>
              <CardLoading />
            </> :
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