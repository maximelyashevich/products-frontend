import React from 'react'
import { NavLink, Link, Route, Routes, useLocation } from 'react-router-dom'
import { Posts } from './Posts'
import { Settings } from './Settings'
import { Balance } from './Balance'
import { ChangeProduct } from './ChangeProduct'


const Profile = () => {

    const location = useLocation()

    return (
        <div className='profile'>
            <div className="container">
                <div className="profile__link">
                    {
                        location.pathname.includes("balance") ? <NavLink to="/profile/balance"><p className='profile__link_item_active'>Баланс</p></NavLink> : <NavLink to="/profile/balance"><p className='profile__link_item'>Баланс</p></NavLink>}
                    {
                        location.pathname.includes("my-posts") ?
                            <NavLink to="/profile/my-posts"><p className='profile__link_item_active'>Мои объявления</p></NavLink> :
                            <NavLink to="/profile/my-posts"><p className='profile__link_item'>Мои объявления</p></NavLink>
                    }
                    {
                        location.pathname.includes("settings") ? <NavLink to="/profile/settings"><p className='profile__link_item_active'>Настройки профиля</p></NavLink> : <NavLink to="/profile/settings"><p className='profile__link_item'>Настройки профиля</p></NavLink>
                    }
                </div>
                <div className="profile__crumbs">
                    <Link style={{ color: "#fff" }} to="/">Главная</Link> - <p style={{ color: "#d4b9ff" }}>
                        {
                            location.pathname.includes('settings') ? 'Настройки профиля' : location.pathname.includes('balance') ? 'Баланс' :
                                location.pathname.includes('my-posts') ? 'Мои объявления' : location.pathname.includes('product') ?
                                'Редактировать продукт' : ''

                        }
                    </p>
                </div>
                <>
                    <Routes>
                        <Route path="/my-posts" element={<Posts />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/balance" element={<Balance />} />
                        <Route path="/product/:id" element={<ChangeProduct />} />
                    </Routes>
                </>
            </div>
        </div>
    )
}

export default Profile