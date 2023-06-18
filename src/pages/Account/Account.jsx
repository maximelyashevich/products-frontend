import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CustomContext } from '../../context'
import { Card } from '../../components/Card/Card'

const Account = () => {

  const { fetchAnotherUser, anotherUser, fetchAnotherUserPosts, anotherUserProducts } = useContext(CustomContext)
  const param = useParams()

  useEffect(() => {
    fetchAnotherUser(param.id)
    fetchAnotherUserPosts(param.id)
  }, [])


  return (
    <div className='account'>
      <div className="container">
        <div className="account__wrapper">
        </div>
        <div className='account-content'>
          <img className='account__img' src={`${anotherUser.img}`} alt="" />
          <div className="account__right">
            <div className="account__name">
              <p>
                {anotherUser.name}
              </p>
              <hr/>
            </div>
            <div className="account__email">
              <p>
                {anotherUser.email}
              </p>
            </div>
          </div>

        </div>
        <div className="account__products">
          {
            anotherUserProducts.map(item => (
              <Card key={item.id} item={item} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Account