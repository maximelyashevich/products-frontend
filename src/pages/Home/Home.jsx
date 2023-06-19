import React, { useEffect, useContext } from 'react'
import { CustomContext } from '../../context'
import { Card } from '../../components/Card/Card'
import CardLoading from '../../components/Loading/CardLoading'
import { BsPlusCircle } from 'react-icons/bs'

const Home = () => {

  const { products, fetchProducts, user, loading, status } = useContext(CustomContext)

  useEffect(() => {
    fetchProducts(user.id)
  }, [])

  return (
    <div className='home'>
      <div className="container">
        <div className='home__content'>
          {status === 'None' ? <p>Нет таких товаров!</p> : loading ? <>
              <CardLoading />
            </> :
              products.map((item) => (
                <Card key={item.id} item={item} heart={<BsPlusCircle className='home__add-to-cart' />} />
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home