import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CustomContext } from '../../context'

const Account = () => {

  const { fetchAnotherUser, anotherUser } = useContext(CustomContext)
  const param = useParams()

  useEffect(() => {
    fetchAnotherUser(param.id)
  }, [])

  return (
    <div className='account'>
      <div className="container">
        <img style={{maxWidth: '300px'}} src={`${anotherUser.img}`} alt="" />
      </div>
    </div>
  )
}

export default Account