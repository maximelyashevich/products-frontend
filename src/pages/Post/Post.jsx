import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CustomContext } from '../../context'
import { Comment } from '../../components/Comment/Comment'
import { CommentPopup } from '../../components/Comment/CommentPopup'
import { BulletList } from 'react-content-loader'

const Post = () => {

  const params = useParams()
  const [popup, setPopup] = useState(false)
  const { product, fetchProductComment, comments, user, commentLoading} = useContext(CustomContext)

  useEffect(() => {
    fetchProductComment(params.id)
  }, [])

  return (
    <div className='product'>
      <div className='container'>
        <div className='product__nav'>
          <Link to='/'>Главная</Link> - <p>Продукт</p>
        </div>
        <div className='product__content'>
          <div className='product__content__left'>
            <img className='product__content-img' src={product.img} alt={product.title} />
          </div>
          <div className='product__content__right'>
            <h2 className='product__content-title'>{product.title}</h2>
            <p className='product__content-description'>{product.description}</p>
            <p className='product__content-price'>{product.price} $</p>
            <hr />
            <h3 className='product__content__comment-title'>Отзывы</h3>
            {
              commentLoading ? <BulletList/> : comments[0] ? <>{comments.map(item => {
                return (
                  <div key={item.id}>
                    <Comment title={item.title} text={item.text} author={item.author} />
                  </div>
                )
              })}</> : <>Пусто</>
            }
            {
              user.email ? <button onClick={() => setPopup(true)} className='product__content__btn' type="button">Оставить отзыв</button> : <p style={{ justifyContent: "space-around", display: "flex", margin: "10px auto", color: "red" }}>Войдите в аккаунт, чтобы оставить отзыв</p>
            }
            {popup && <CommentPopup popup={popup} setPopup={setPopup} />}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Post