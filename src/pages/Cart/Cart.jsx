import React, { useContext, useEffect, useState } from 'react'
import { Card } from '../../components/Card/Card'
import { BsTrash } from 'react-icons/bs/index.esm'
import { CustomContext } from '../../context'

export const Cart = () => {

    const { cart } = useContext(CustomContext)

    const [orders, setOrders] = useState([])

    useEffect(() => {
        setOrders(cart)
    }, [JSON.parse(localStorage.getItem('cart'))])

    const { deleteFromCart } = useContext(CustomContext)

    return (
        <div className='cart'>
            <div className="container">
                <div className="cart__clean">
                    {
                        orders.length !== 0 && <>
                            <button onClick={() => {
                                localStorage.removeItem('cart')
                                location.reload()
                            }} type='button' style={{ padding: '10px 15px' }}>Очистить корзину</button>
                        </>
                    }
                </div>
                <div className="cart__items">
                    {
                        orders && orders.map(el =>
                        (
                            <Card item={el} key={el.id} basket={<BsTrash style={{ float: 'right' }} onClick={() => deleteFromCart(el)} className='home__delete' />} />
                        )
                        )}
                  
                </div>
                {
                        orders.length === 0 ? <p>Пусто...</p> : <button style={{padding: '10px 15px'}}>Купить</button>
                    }
            </div>
        </div>
    )
}
