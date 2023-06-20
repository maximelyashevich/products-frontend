import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { CustomContext } from '../../context'

export const Balance = () => {

  const { fetchPutUser, user } = useContext(CustomContext)

  const {
    register, reset, formState: {
      errors }, handleSubmit
  } = useForm()

  const submitForm = (data) => {
    fetchPutUser({ 
      name: user.name,
      email: user.email,
      img: user.img,
      balance: +user.balance + +data.money,
      password: data.password })
    reset()
  }


  return (
    <div className='profile__balance'>
      <div className="container">
        <form onSubmit={handleSubmit(submitForm)} action="" className="profile__balance-list form">
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <h3 >Пополнить баланс</h3>
          </div>
          <div>
            <input {...register("num", {
              required: {
                value: true,
                message: "Обязательное поле!"
              },
              minLength: {
                value: 16,
                message: "Минимальная длина 16!"
              }
            })} placeholder='Номер карты' type="text" className="profile__balance-input form__input" />
          </div>
          <p className='errors-error'>
            {errors.num && errors.num.message}
          </p>
          <div>
            <input {...register("cvv", {
              required: {
                value: true,
                message: "Обязательное поле!"
              },
              maxLength: {
                value: 3,
                message: "Максимальная длина 3!"
              }
            })} placeholder='CVV код' type="text" className="profile__balance-input form__input" />
          </div>
          <p className='errors-error'>
            {errors.cvv && errors.cvv.message}
          </p>
          <label htmlFor="" className="profile__balance-label">
            <input placeholder='Сумма' {...register("money", {
              required: {
                value: true,
                message: "Обязательное поле!"
              }
            })} type="number" className="profile__balance-input form__input" />
          </label>
          <p className='errors-error'>
            {errors.money && errors.money.message}
          </p>
          <input {...register("password", {
            required: {
              value: true,
              message: "Обязательное поле!"
            },
            minLength: {
              value: 5,
              message: "Минимальная длина 5"
            }
          })} placeholder='Введите пароль' type="password" className="form__input" />
          <p className='errors-error'>
            {errors.password && errors.password?.message}
          </p>
          <button type={'submit'} style={{ padding: "10px 20px", marginTop: "20px" }}>Пополнить</button>
        </form>
      </div>
    </div>
  )
}