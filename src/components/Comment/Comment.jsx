import React, { useEffect } from 'react'
import { useContext } from 'react'
import { CustomContext } from '../../context'

export const Comment = (props) => {

  const {fetchUserComment, userComment} = useContext(CustomContext)

  useEffect(()=>{
    fetchUserComment(props.author)
  },[])

  return (
    <div className='comment'>
      <div className='comment_title'>
        <p>
           {props.title}
        </p>
      </div>
      <div className='comment_text'>
        <p>{props.text}</p>
      </div>
      <div className='comment_author'>
        <p>
          {userComment.name}
        </p>
      </div>
    </div>
  )
}
