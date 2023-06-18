import React, { useContext, useState } from 'react'
import { CustomContext } from '../../context'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { QuickView } from '../Popup/QuickView'

export const Card = ({ item, basket, heart }) => {

    const { user, addToCart } = useContext(CustomContext)
    const [isActive, setIsActive] = useState(false)
    const location = useLocation()

    let cn = "item__description";
    if (isActive) cn += "__active";
    if (!isActive) cn = cn.substring(0, 17)

    return (
        <div className='home__card' key={item.id}>

            <NavLink to={`/product/${item.id}`}>
                <LazyLoadImage alt='user' src={`${item.img}`} className='home__img'
                    placeholderSrc='https://turma8mag.by/images/default-no-image.png' />
                <h2 className='home__title'>{item.title}</h2>
            </NavLink>
            <div onClick={() => setIsActive(!isActive)} className={cn}>
                <p>{item.description}</p>
            </div>
            <div className="home__card__bottom">
                <span className='home__price'><p>{item.price} $</p></span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}>
                    {
                        user.id == item.author.id ? <img alt='user' src={item.author.img} className='header__user_avatar' /> : <Link aria-label="Перейти в профиль" to={`/account/${item.author.id}`}>
                            <LazyLoadImage alt='user' src={item.author.img} className='header__user_avatar' placeholderSrc='https://avatars.mds.yandex.net/i?id=b5d48f6503c4c16efcd372946a0b27169c58e895-7215189-images-thumbs&n=13' />
                        </Link>
                    }
                    
                        {basket}
                    
                    {
                        location.pathname === '/' && <QuickView />
                    }
                    {
                        !user.email ? '' : <div onClick={() => addToCart(item)}>
                            {heart}
                        </div>
                    }
                </div>

            </div>

        </div>
    )
}
