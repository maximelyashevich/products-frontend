import React, { useState, useContext } from 'react'
import { CustomContext } from '../../context'
import Popup from '../../components/Popup/Popup'
import { BsSearch } from 'react-icons/bs'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom'

const Header = () => {

  const [popup, setPopup] = useState(false)
  const { user, setUser } = useContext(CustomContext)

  const logOutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("refresh")
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
                    <Link to="/profile" style={{display:'flex', alignItems: 'center', columnGap: '10px'}}>
                    {user.img ? <LazyLoadImage src={`${user.img}`} className='header__user_avatar'
                      width={50} height={50}
                      placeholderSrc='https://cdn.icon-icons.com/icons2/2550/PNG/512/user_circle_icon_152504.png'
                    
                    /> : <img className='header__user_avatar' src='https://cdn.icon-icons.com/icons2/2550/PNG/512/user_circle_icon_152504.png'/>}
                    
                    <p>{user.name}</p></Link>
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