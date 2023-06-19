import React, { useContext } from 'react'
import { CustomContext } from '../../context'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const Card = ({ item, basket, heart }) => {

    const { user, addToCart } = useContext(CustomContext)
    const location = useLocation()

    return (
        <div className='home__card' key={item.id}>
            <NavLink to={`/product/${item.id}`}>
                <LazyLoadImage alt='user' src={`${item.img}`} className='home__img'
                    placeholderSrc='https://turma8mag.by/images/default-no-image.png' />
                <h2 className='home__title'>{item.title}</h2>
            </NavLink>
            <div className="home__card__bottom">
                <span className='home__price'><p>{item.price} $</p></span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}>
                    {
                        user.id == item.author.id ? <img alt='user' src={item.author.img} className='header__user_avatar' /> : <Link aria-label="Перейти в профиль" to={`/account/${item.author.id}`}>
                            <LazyLoadImage alt='user' src={item.author.img} className='header__user_avatar' placeholderSrc='https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg' />
                        </Link>
                    }
                    {basket}
                    {
                        !user.email ? '' : user.id !== item.author.id ? <div onClick={() => addToCart(item)}>
                            {heart}
                        </div> : <NavLink onClick={() => {fetchProductComment(item.id)}} to={`/profile/product/${item.id}`}>
                            {heart}
                        </NavLink>
                    }
                </div>
            </div>
        </div>
    )
}
