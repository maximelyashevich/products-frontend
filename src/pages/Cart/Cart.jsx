import React, { useContext, useEffect, useState } from 'react'
import { Card } from '../../components/Card/Card'
import { BsTrash } from 'react-icons/bs/index.esm'
import { CustomContext } from '../../context'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {

    const { cart } = useContext(CustomContext)

    const [orders, setOrders] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        setOrders(cart)
    }, [JSON.parse(localStorage.getItem('cart'))])

    const { deleteFromCart,fetchPurchase, pStatus } = useContext(CustomContext)

    const makePurchase = () => {
        orders.forEach(element => {
            fetchPurchase(element.id, element.author.id)
        })
        if (pStatus === 200) {    
            localStorage.removeItem('cart')
            navigate('/')
        } else {
            alert('Что-то пошло не так... Попробуйте еще раз')
        }
    }

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
                    orders.length === 0 ? <p>Пусто...</p> : <button onClick={()=>makePurchase()} style={{ padding: '10px 15px' }}>Купить</button>
                }
            </div>
        </div>
    )
}
