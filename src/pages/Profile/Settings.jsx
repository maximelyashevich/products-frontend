import React, { useContext } from 'react'
import { CustomContext } from '../../context'
import { useForm } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export const Settings = () => {

  const { user, fetchPutUser, fetchDeleteUser, setCart, setFilter, setUser, filter } = useContext(CustomContext)
  const {
    handleSubmit,
    register,
    reset, formState: {
      errors
    }
  } = useForm()

  const navigate = useNavigate()

  const submitForm = (data) => {

    if (data.name === '') { data.name = user.name }
    if (data.email === '') { data.email = user.email }
    fetchPutUser({ ...data, balance: user.balance })
    reset()
  }

  const deleteUser = () => {
    let q = confirm("Удалить аккаунт?")
    if (q) {
      fetchDeleteUser(user.id)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("refresh")
      localStorage.removeItem("cart")
      setCart([])
      navigate("/")
      setUser({})
      setFilter({ ...filter, not_me: '0' })
      navigate('/')
    }
  }

  return (
    <div className='settings'>
      <form onSubmit={handleSubmit(submitForm)} action="" className="form__settings">
        <div className="form__settings__img">
          <h4 className='form__title'>Изображение</h4>
          <div style={{ display: 'flex', alignItems: 'center', columnGap: '20px', position: 'relative' }}>
            <input style={{ position: 'relative', zIndex: 0 }} defaultValue={user.img} {...register("img")} type="text" className="form__input imagee" placeholder='ссылка на изображение' />
            <BsTrash onClick={() => {
              let inp = document.querySelector(".imagee")
              inp.value = ''
            }} style={{ position: 'absolute', top: '40%', right: '7.75%', zIndex: 1, fontSize: '20px', cursor: 'pointer' }} />
          </div>

        </div>
        <div className="form__settings__info">
          <h4 className='form__title'>Информация</h4>
          <div><input {...register("name", {
            minLength: {
              value: 3,
              message: "минимальная длина 3!"
            }
          })} type="text" defaultValue={user.name} className="form__input" placeholder='Имя' />
            <p className='errors-error'>{errors.name && errors.name?.message}</p>
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
          })} readOnly defaultValue={user.email} type="text" className="form__input" placeholder='Email' /><p className='errors-error'>{errors.email && errors.email?.message}</p></div>
        </div>
        <div><input type="password" {...register("password", {
          required: {
            value: true,
            message: "Обязательное поле!"
          },
          minLength: {
            value: 5,
            message: "Минимальная длина пароля 5!"
          }
        })} className="form__input" placeholder='Введите пароль' />
          <p className='errors-error'>{errors.password && errors.password?.message}</p>
        </div>
        <button style={{ padding: "10px 20px", marginBottom: "10px", marginTop: '30px' }} type="submit">Сохранить</button>
      </form>
      <button onClick={() => deleteUser()} style={{ padding: '10px 15px', float: 'right', marginBottom: '10px' }}>Удалить аккаунт</button>
    </div>
  )
}
