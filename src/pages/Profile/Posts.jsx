import React, { useEffect, useState } from 'react'
import { Card } from '../../components/Card/Card'
import { BsPencilSquare } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import instance from '../../axios'

export const Posts = () => {

  const [myPosts, setMyPosts] = useState([])

  const fetchMyPosts = async () => {
    await instance.get(`/user/posts`, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then(({ data }) => {
      setMyPosts(data)
    }).catch(err => alert(err))
  }

  useEffect(() => {
    fetchMyPosts()
  }, [])

  return (
    <div className='profile__posts'>
      {myPosts.length === 0 ? <div>
        <p style={{marginBottom: '20px'}}>Пусто...</p>
        <Link to='/add-post'>
        <p>
          Опубликовать первый товар!
        </p>
        </Link>
      </div> :
        myPosts.map(item => {
          return (
            <Card key={item.id} item={item} heart={ <BsPencilSquare style={{fontSize: '20px'}}/> } />
          )
        }
        )
      }
    </div>
  )
}
