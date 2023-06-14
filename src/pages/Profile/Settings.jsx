import React, { useContext } from 'react'
import { CustomContext } from '../../context'
import { useForm } from 'react-hook-form'

export const Settings = () => {

  const { user, fetchPutUser } = useContext(CustomContext)

  const {
    handleSubmit,
    register,
    reset, formState: {
      errors
    }
  } = useForm()

  const submitForm = (data) => {
   
    if (data.name === ''){data.name = user.name} 
    if (data.email === ''){data.email = user.email}
    fetchPutUser({...data, balance: user.balance})
    reset()
  }

  return (
    <div className='settings'>
      <form onSubmit={handleSubmit(submitForm)} action="" className="form__settings">
        <div className="form__settings__img">
          <h4 className='form__title'>Изображение</h4>
          <input {...register("img")} type="text" className="form__input" placeholder='ссылка на изображение' />
          <hr />
        </div>
        <div className="form__settings__info">
          <h4 className='form__title'>Информация</h4>
          <div><input {...register("name", {
            minLength: {
              value: 5,
              message: "минимальная длина 5!"
            }
          })} type="text" defaultValue={user.name} className="form__input" placeholder='Имя' />
          <p style={{color: "red"}}>{errors.name && errors.name?.message}</p>
          </div>
          <div><input {...register("email", {
             
            minLength: {
              message: "Минимальная длина почты 10!",
              value: 10,
            },
            pattern: {
              message: "Проверьте почту!",
              value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
            },
          })} readOnly defaultValue={user.email} type="text" className="form__input" placeholder='Email' /><p style={{color: "red"}}>{errors.email && errors.email?.message}</p></div>
        </div>
        <div><input {...register("password", {
          required: {
            value: true,
            message: "Обязательное поле!"
          }
        })} type="text" className="form__input" placeholder='Введите пароль' />
        <p style={{color: "red"}}>{errors.password && errors.password?.message}</p>
        </div>
        <hr />
        <button style={{ padding: "10px 20px", "marginBottom": "10px" }} type="submit">Сохранить</button>
      </form>
    </div>
  )
}
