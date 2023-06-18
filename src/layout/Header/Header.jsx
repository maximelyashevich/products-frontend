import React, { useState, useContext } from 'react'
import { CustomContext } from '../../context'
import Popup from '../../components/Popup/Popup'
import { BsSearch, BsBasket } from 'react-icons/bs'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import debounce from 'lodash.debounce';


const Header = () => {

  const [popup, setPopup] = useState(false)
  const { user, setUser, setFilter, filter, setCart, cart } = useContext(CustomContext)
  const location = useLocation()
  const navigate = useNavigate()
  const searchFunc = (e) => {
    setFilter({ ...filter, q: e.target.value })
  }

  const debounceSearch = debounce(searchFunc, 300)


  const logOutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("refresh")
    localStorage.removeItem("cart")
    setCart([])
    navigate("/")
    setUser({})
    setFilter({ ...filter, not_me: '0' })
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
                    <div className="header__user__cash" style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                      <div className="header__user__cart">
                        {
                          location.pathname !== '/cart' && <Link to="/cart">
                            <div style={{display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                              <div>{cart.length}</div>
                              <BsBasket style={{ fontSize: '20px', cursor: 'pointer' }} />
                            </div>
                          </Link>
                        }
                      </div>
                      <p>Баланс: {user.balance}</p>
                    </div>
                    <Link to="/profile/my-posts" style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                      {
                        user.img ? <LazyLoadImage alt='user' src={`${user.img}`} className='header__user_avatar'
                          placeholderSrc='src\assets\user.png'
                        /> : <p>Перейти в профиль</p>
                      }
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
      {
        popup && <Popup popup={popup} setPopup={setPopup} />
      }
      <div>
        {
          location.pathname === '/' && <div className="container">
            <div className="header__bottom-search">
              <input onChange={debounceSearch} placeholder='Я ищу...' type="text" className='header__bottom-input' />
            </div>
            <div className="header__bottom-list">
              <div className='header__bottom-list__elements'>
                <label><p>Всё</p> <input defaultChecked onChange={(e) => setFilter({ ...filter, item: e.target.value, q: '' })} value={''} type='radio' name="filter" /></label>
              </div>
              <div className='header__bottom-list__elements'>
                <label><p>Телефоны</p> <input onChange={(e) => setFilter({ ...filter, item: e.target.value, q: '' })} value={'phone'} type='radio' name="filter" /></label>
              </div>
              <div className='header__bottom-list__elements'>
                <label><p>Ноутбуки</p> <input onChange={(e) => setFilter({ ...filter, item: e.target.value, q: '' })} type='radio' value={'notebook'} name="filter" /></label>
              </div>
              <div className='header__bottom-list__elements'>
                <label><p>Часы</p> <input onChange={(e) => setFilter({ ...filter, item: e.target.value, q: '' })} value={'watch'} type='radio' name="filter" /></label>
              </div>
            </div>
            <div className="header__bottom_filters">
              <p>Сортировать по цене</p>
              <select value={filter.from} onChange={(e) => setFilter({ ...filter, from: e.target.value })}>
                <option value=''>По умолчанию</option>
                <option value='up'>Сначала дорогие</option>
                <option value='down'>Сначала дешевые</option>
              </select>
            </div>
          </div>
        }
      </div>
    </header>
  )
}

export default Header