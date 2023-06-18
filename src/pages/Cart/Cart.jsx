import React from 'react'
import { Card } from '../../components/Card/Card'
import {TiDeleteOutline} from 'react-icons/ti'

export const Cart = () => {

    let orders = JSON.parse(localStorage.getItem('cart'))

    return (
        <div className='cart'>
            <div className="container">
                <div className="cart__clean">
                    <button onClick={() => {
                        localStorage.removeItem('cart')
                        location.reload()
                    }} type='button' style={{ padding: '10px 15px' }}>Очистить корзину</button>
                </div>
                <div className="cart__items">
                    {orders ? orders.map(el =>
                    (
                        <Card item={el} key={el.id} basket={<TiDeleteOutline className='home__delete'/>} />
                    )
                    ) : <p>Пусто...</p>}
                </div>

            </div>
        </div>
    )
}
