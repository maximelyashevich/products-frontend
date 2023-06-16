import React, { useContext, useEffect } from 'react'
import { CustomContext } from '../../context'
import { Card } from '../../components/Card/Card'

export const Posts = () => {

  const {fetchMyPosts, products} = useContext(CustomContext)

  useEffect(()=> {
    fetchMyPosts()
  }, [])

  console.log(products)
  return (
    <div className='profile__posts'>
      {
        products.map(item => {
          return(
             <Card item={item}/>
          )
        })
      }
    </div>
  )
}
