import React, { useContext, useState } from 'react'
import { CustomContext } from '../../context'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const Card = ({ item }) => {

    const { user } = useContext(CustomContext)

    const [isActive, setIsActive] = useState(false);
    let cn = "item__description";
    if (isActive) cn += "__active";

    return (
        <div className='home__card' key={item.id}>
            <NavLink to={`/product/${item.id}`}>
            <LazyLoadImage alt='user' src={`${item.img}`} className='home__img'
                        placeholderSrc='https://turma8mag.by/images/default-no-image.png'/> 
                <h2 className='home__title'>{item.title}</h2>
                </NavLink>
                <div onClick={() => setIsActive(!isActive)} className={cn}>
                    <p>{item.description}</p>
                </div>
                <div className="home__card__bottom">
                    <span className='home__price'><p>{item.price} $</p></span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',  overflow: 'hidden' }}>
                        {user.id == item.author.id ? <img alt='user' src={item.author.img} className='header__user_avatar' /> : <Link aria-label="Перейти в профиль" to={`/account/${item.author.id}`}>
                            <img alt='user' src={item.author.img} className='header__user_avatar' />
                        </Link>}
                        <AiOutlineHeart style={{ fontSize: '30px' }} />
                    </div>
                </div>
            
        </div>
    )
}
