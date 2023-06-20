import React, { useEffect, useState } from 'react'
import instance from '../../axios'


export const Comment = (props) => {

  const [userComment, setUserComment] = useState({})

  const fetchUserComment = async (id) => {
    await instance.get(`/user/${id}`).then((res) => {
      setUserComment(res.data)
    }).catch(err => alert(err))
    setLoading(false)
  }


  useEffect(() => {
    fetchUserComment(props.author)
  }, [])

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
