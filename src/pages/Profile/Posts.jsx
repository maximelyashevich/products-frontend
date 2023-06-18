import React, { useContext, useEffect } from 'react'
import { CustomContext } from '../../context'
import { Card } from '../../components/Card/Card'

export const Posts = () => {

  const { myPosts, fetchMyPosts } = useContext(CustomContext)

  useEffect(()=> {
    fetchMyPosts()
  }, [])

  return (
    <div className='profile__posts'>
      {
        myPosts.map(item => {
            return (
              <Card key={item.id} item={item} />
            )}
        )
      }
    </div>
  )
}
