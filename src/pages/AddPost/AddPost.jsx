import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import instance from '../../axios'
import { Link, useNavigate } from 'react-router-dom'
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
    reset()
    navigate("/profile/my-posts")
  }

  return (

    <div className='add-post'>
      {
        user.email ? <></> : navigate('/')
      }
      <div className="container">
        <div className="profile__crumbs">
          <Link to="/"><p>
            Главная
            </p></Link> <p> - Создать объявление</p>
        </div>
        <form onSubmit={handleSubmit(submitForm)} className='form' action="">
          <div className="form__title">
            <h2>Создать объявление</h2>
          </div>
          <div className="input">
            <div>
              <input className='form__input input' style={{width: '80%'}} {...register("title", {
                required: {
                  message: "Это поле не может быть пустым!",
                  value: true
                },
                minLength: {
                  message: "Минимальная длина 5!",
                  value: 5,
                }
              })} type="text" placeholder="Название" />
              <p className='errors-error'>{errors.title?.message}</p>
            </div>
            <div>
              <textarea style={{maxHeight: "300px", minHeight: "300px", minWidth: '80%', maxWidth: '80%'}} className='form__input' {...register("description", {
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
            <p className='errors-error'>{errors.description?.message}</p>
            <div>
              <input className='form__input input' style={{width: '80%'}} {...register("img", {
                required: {
                  message: "Это поле не может быть пустым!",
                  value: true
                }
              })} type="text" placeholder="Изображение" />
            </div>
            <p className='errors-error'>{errors.img?.message}</p>
            <div>
              <input className='form__input input' style={{width: '80%'}} {...register("price", {
                required: {
                  message: "Это поле не может быть пустым!",
                  value: true
                }
              })} type="number" placeholder="Цена" />
            </div>
            <p className='errors-error'>{errors.price?.message}</p>
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