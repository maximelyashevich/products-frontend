import React, { useContext } from 'react'
import { CustomContext } from '../../context'
import { Link } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'

export const Card = ({ item }) => {


    const { user } = useContext(CustomContext)

    return (
        <div className='home__card' key={item.id}>
            <Link to={`product/${item.id}`}>
                <img className='home__img' src={item.img} alt="" />
                {user.id === item.author.id ? <h2 style={{color: 'red'}} className='home__title'>{item.title}</h2> : <h2 className='home__title'>{item.title}</h2>}
                <p className='home__description'>{item.description}</p>
                <div className="home__card__bottom">
                    <span className='home__price'>{item.price} $</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {user.id == item.author.id ? <Link to={`/profile/my-posts`}>
                            <img src={item.author.img} className='header__user_avatar' />
                        </Link> :  <Link to={`/account/${item.author.id}`}>
                            <img src={item.author.img} className='header__user_avatar' />
                        </Link>}
                        <AiOutlineHeart style={{ fontSize: '30px' }} />
                    </div>

                </div>
            </Link>
        </div>
    )
}
