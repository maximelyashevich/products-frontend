import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import instance from '../../axios'
import { useNavigate } from 'react-router-dom'
import { CustomContext } from '../../context'

const AddPost = () => {
  
  const {user} = useContext(CustomContext)

  const {
    handleSubmit,
    register,
    reset, formState: {
      errors
    }
  } = useForm()

  const navigate = useNavigate()

  const createPost = async (data) => {
    let token = JSON.parse(localStorage.getItem("token"))
    console.log(token)
    await instance.post("/post", data, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res)
    })
  }

  const submitForm = (data) => {
    createPost(data)
    reset
    navigate("/")
  }

  return (

    <div className='add-post'>
      <div className="container">
        <form onSubmit={handleSubmit(submitForm)} className='form' action="">
          <div className="form__title">
            <h2>Создать объявление</h2>
          </div>
          <div className="input">
            <div>
              <input {...register("title", {
                required: {
                  message: "Это поле не может быть пустым!",
                  value: true
                },
                minLength: {
                  message: "Минимальная длина 5!",
                  value: 5,
                }
              })} type="text" placeholder="Название" />
              <div className='form__error'>{errors.title?.message}</div>
            </div>
            <div>
              <input {...register("description", {
                required: {
                  message: "Это поле не может быть пустым!",
                  value: true
                },
                minLength: {
                  message: "Минимальная длина 5!",
                  value: 5,
                }
              })} type="text" placeholder="Описание" />
            </div>
            <div className='form__error'>{errors.description?.message}</div>
            <div>
              <input {...register("img", {
                required: {
                  message: "Это поле не может быть пустым!",
                  value: true
                }
              })} type="text" placeholder="Изображение" />
            </div>
            <div className='form__error'>{errors.img?.message}</div>
            <div>
              <input {...register("price", {
                required: {
                  message: "Это поле не может быть пустым!",
                  value: true
                }
              })} type="number" placeholder="Цена" />
            </div>
            <div className='form__error'>{errors.price?.message}</div>
          </div>
          <div className='form__category'>
            <select {...register("category")}>
              <option value="phone">Телефон</option>
              <option value="notebook">Ноутбук</option>
              <option value="watch">Часы</option>
              <option value="headphones">Наушники</option>
            </select>
          </div>
          {user.email ? <button type='submit'>Создать</button> : <p style={{"justify-content":"space-around",display: "flex", margin:"10px auto", color:"red"}}>Войдите в аккаунт, чтобы создать объявление</p>}
          
        </form>
      </div>
    </div>
  )
}

export default AddPost