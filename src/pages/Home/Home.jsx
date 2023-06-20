import React, { useEffect, useContext } from 'react'
import { CustomContext } from '../../context'
import { Card } from '../../components/Card/Card'
import CardLoading from '../../components/Loading/CardLoading'
import { BsPlusCircle } from 'react-icons/bs'

const Home = () => {

  const { products, fetchProducts, user, loading, status, fetchUser } = useContext(CustomContext)

  useEffect(() => {
    fetchProducts(user.id)
    if (JSON.parse(localStorage.getItem('user'))) {
      fetchUser(user.id)
    }
  }, [])

  return (
    <div className='home'>
      {
        products.length === 0 && <p style={{ margin: '10px' }}>Пусто...</p>
      }
      <div className="container">
        <div className='home__content'>
          {status === 'None' ? <p>Нет таких товаров!</p> :
            products.map((item) => (
              <Card key={item.id} item={item} heart={<BsPlusCircle className='home__add-to-cart' />} />
            ))
          }
          {
            loading &&
            <>
              <CardLoading />
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Home