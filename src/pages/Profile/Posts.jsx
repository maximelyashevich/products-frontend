import React, { useContext, useEffect } from 'react'
import { CustomContext } from '../../context'
import { Card } from '../../components/Card/Card'
import { BsPencilSquare } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const Posts = () => {

  const { myPosts, fetchMyPosts } = useContext(CustomContext)

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
