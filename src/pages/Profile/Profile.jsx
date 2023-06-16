import React, { useContext } from 'react'
import { NavLink, Link, Route, Routes, useLocation } from 'react-router-dom'
import { Posts } from './Posts'
import { Settings } from './Settings'
import { Balance } from './Balance'
import { CustomContext } from '../../context'


const Profile = () => {

    const location = useLocation()

    return (
        <div className='profile'>
            <div className="container">
                <div className="profile__link">
                    <NavLink to="/profile/my-posts"><p className='profile__link_item'>Мои объявления</p></NavLink>
                    <NavLink to="/profile/settings"><p className='profile__link_item'>Настройки профиля</p></NavLink>
                    <NavLink to="/profile/balance"><p className='profile__link_item'>Баланс</p></NavLink>
                </div>

                <div className="profile__crumbs">
                    <Link to="/">Главная</Link> - <p>Профиль</p> - <p>
                        {
                            location.pathname.includes('settings') ? 'Настройки профиля' : location.pathname.includes('balance') ? 'Баланс' :
                                location.pathname.includes('my-posts') ? 'Мои объявления' : ''

                        }
                    </p>
                </div>

                <>
                    <Routes>
                        <Route path="/my-posts" element={<Posts />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/balance" element={<Balance />} />
                    </Routes>
                </>

            </div>

        </div>
    )
}

export default Profile