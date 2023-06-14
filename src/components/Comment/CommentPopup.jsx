import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import instance from '../../axios'
import { CustomContext } from '../../context'

export const CommentPopup = ({ popup, setPopup }) => {

  const {product, fetchComment} = useContext(CustomContext)


  const popupClose = (e) => {
    if (e.target.classList.contains('overlay')) {
      setPopup(false)
    } else {
      setPopup(true)
    }
  }

  const {
    handleSubmit,
    register,
    reset, formState: {
      errors
    }
  } = useForm()

 

  const submitForm = (data) => {
    fetchComment(data, product)
    location.reload()
    reset()
  }

  return (
    <div onClick={(e) => popupClose(e)} className={`overlay ${popup && "overlay_active"}`}>
      <div className="popup">
        <form onSubmit={handleSubmit(submitForm)} action="" className="popup__form">
          <div className="popup__form-top">
            <h2 className="popup__title">Создать отзыв</h2>
          </div>
          <input {...register("title", {
            required: {
              message: "Это поле не может быть пустым!",
              value: true,
            },
            minLength: {
              message: "Минимальная длина 5!",
              value: 5,
            },
          })} type="text" placeholder='Название' className='popup__input' />
          <div className="error">
             {errors.title && errors.title?.message}
          </div>
          <textarea {...register("text", {
            required: {
              message: "Это поле не может быть пустым!",
              value: true,
            },
            minLength: {
              message: "Минимальная длина 5!",
              value: 5,
            },
          })} style={{ padding: '10px' }} type="text" placeholder='Текст' className='popup__input' />
           <div className="error">
             {errors.text && errors.text?.message}
          </div>
          <button className='popup__btn' type='submit'>Создать</button>
        </form>
      </div>
    </div>
  )
}
