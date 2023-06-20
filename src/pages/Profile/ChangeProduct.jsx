import React, { useContext, useEffect } from 'react'
import { CustomContext } from '../../context'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const ChangeProduct = () => {

    const { fetchProductComment, product, fetchPutProduct, fetchDeleteProduct } = useContext(CustomContext)
    const param = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchProductComment(param.id)
    }, [])

    const {
        register, handleSubmit
    } = useForm()

    const submitForm = (data) => {
        let obj = {
            id: product.id,
            title: data.title ? data.title : product.title,
            description: data.description  ? data.description : product.description,
            price: data.price ? data.price : product.price,
            img: data.img ? data.img : product.img
        }
        fetchPutProduct(obj)
        navigate('/profile/my-posts')
    }

    const deleteProduct = () => {
        let q = confirm("Удалить продукт?")
        if (q) {
            fetchDeleteProduct(product.id)
            navigate('/profile/my-posts')
        } 
    }

    return (
        <div className='profile__change-product'>
            <div className="profile__change-product-form">
                <div className="profile__change-product__left">
                    <div className="profile__change-product__avatar">
                    <LazyLoadImage src={product.img} placeholderSrc={'https://www.leftbankwine.com/images/products/bottleshot-placeholder.png'}/>
                    </div>
                </div>
                <div className="profile__change-product__right">
                    <form onSubmit={handleSubmit(submitForm)} action="" className="from">
                        <div className="profile__change-product__title">
                            <label htmlFor="">
                                <p>Название</p>
                                <input {...register('title')} className='form__input' defaultValue={product.title} type="text" />
                            </label>
                        </div>
                        <div className="profile__change-product__description">
                            <label htmlFor="">
                                <p>Описание</p>
                                <textarea {...register('description')} className='form__input' defaultValue={product.description} type="text" />
                            </label>
                        </div>
                        <div className="profile__change-product__price">
                            <label htmlFor="">
                                <p>Цена</p>
                                <input {...register('price')} className='form__input' defaultValue={product.price} type="text" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <div></div>
                                <p>Изображение</p>
                                <input {...register('img')} className='form__input' defaultValue={product.img} type="text" />
                            </label>
                        </div>
                        <div className="profile__change-product__btn">
                            <button style={{ padding: '10px 15px' }}>
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="profile__change-product__delete">
                <button onClick={()=>deleteProduct()} style={{ padding: '10px 15px', float: 'right', margin: '1px 0' }}>Удалить товар</button>
            </div>
        </div>
    )
}
