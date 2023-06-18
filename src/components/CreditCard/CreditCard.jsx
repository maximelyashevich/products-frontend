import React, { useContext, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { CustomContext } from '../../context';
import { useForm } from 'react-hook-form';

const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const { fetchPutUser, user } = useContext(CustomContext)

  const {
    register, reset, handleSubmit
  } = useForm()

  const submitForm = (data) => {
    fetchPutUser({
      name: user.name,
      email: user.email,
      img: user.img,
      balance: +user.balance + +data.money,
      password: data.password
    })
    reset()
  }

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }


  return (
    <div className=''>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form onSubmit={handleSubmit(submitForm)}>
        <div style={{ position: 'relative', left: '25%' }}>
          <div >

            <input
              type='text'
              name='name'
              className='form-control profile__balance__input'
              placeholder='Имя'
              pattern='[a-z A-Z-]+'
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div>
            <input
              type='tel'
              name='number'
              className='form-control profile__balance__input'
              placeholder='Номер карты'
              pattern='[\d| ]{16,22}'
              maxLength='19'
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div>
            <input
              type='tel'
              name='expiry'
              className='form-control profile__balance__input'
              placeholder='Дата'
              pattern='\d\d/\d\d'
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div>
            <input
              type='tel'
              name='cvc'
              className='form-control profile__balance__input'
              placeholder='CVC'
              pattern='\d{3}'
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div>
            <input {...register("money", {
              required: {
                value: true,
                message: "Обязательное поле!"
              }
            })} className='form-control profile__balance__input' type="number" placeholder='Сумма' />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;