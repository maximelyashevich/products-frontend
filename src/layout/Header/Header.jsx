import React, { useState, useContext } from 'react'
import { CustomContext } from '../../context'
import Popup from '../../components/Popup/Popup'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Header = () => {

  const [popup, setPopup] = useState(false)
  const {user, setUser} = useContext(CustomContext)

  const logOutUser = () => {
    localStorage.removeItem("token")
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
                  <div className='header__user'>
                    <div className="header__user__cash">
                      <p>Баланс: {user.balance}</p>
                    </div>
                    <p>{user.name}</p>
                    <button onClick={() => logOutUser()} type="button">Выйти</button>
                    <Link to="/add-post"><button type='button' className='header__btn'>Создать пост</button></Link>
                  </div>
                </div> :
                <p className='header__login' onClick={() => setPopup(true)}>Войти - Регистрация</p>
            }
          </div>
        </nav>
      </div>
      {popup && <Popup popup={popup} setPopup={setPopup} />}
      <div>
        <div className="container">
          <div className="header__bottom-search">
            <input type="text" className='header__bottom-input' /><button className='header__bottom-icon'><BsSearch /></button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header