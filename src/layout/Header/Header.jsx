import React, { useState } from 'react'
import Popup from '../../components/Popup/Popup'
import {BsSearch} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Header = ({user, setUser}) => {

  const [popup, setPopup] = useState(false)
  
  const logOutUser = ()=> {
    localStorage.removeItem("user")
    setUser({})
  }

  return (
    <header className='header'>
      <div className="container">
        <nav className='header__nav'>
          <div className='header__left'>
            <Link to="/">
            <h1 className='header__title'>PRODUCTS</h1>
            </Link>
          </div>
          <div className='header__right'>
            {
              user.email ?
                <div>
                    <p>{user.name}</p>
                    <button onClick={() => logOutUser()} type="button">Выйти</button>
                </div> :
              <p className='header__login' onClick={() => setPopup(true)}>Войти - Регистрация</p>
            }
            <button type='button' className='header__btn'>Создать пост</button>
          </div>
        </nav>
      </div>
      { popup &&  <Popup popup={popup} setPopup={setPopup} user={user} setUser={setUser} /> }
      <div>
        <div className="container">
          <div className="header__bottom-search">
          <input type="text" className='header__bottom-input'/><button className='header__bottom-icon'><BsSearch /></button>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Header