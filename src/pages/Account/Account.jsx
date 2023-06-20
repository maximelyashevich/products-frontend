import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../../components/Card/Card'
import instance from '../../axios'

const Account = () => {
  const [anotherUserProducts, setAnotherUserProducts] = useState([])
  const [anotherUser, setAnotherUser] = useState({})

  const fetchAnotherUser = async (id) => {
    await instance.get(`/user/${id}`).then((res) =>
      setAnotherUser(res.data)).catch(err => console.log(err))
  }

  const fetchAnotherUserPosts = async (id) => {
    await instance.get(`/posts/user/${id}`).then((res) => setAnotherUserProducts(res.data)).catch(err => alert(err))
  }

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
              <hr />
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