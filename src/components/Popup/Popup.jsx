import React, { useState, useContext } from "react";
import { CustomContext } from "../../context";
import { useForm } from "react-hook-form";
import instance from "../../axios";


const Popup = ({ popup, setPopup }) => {
  const [status, setStatus] = useState("signIn");
  const { setUser, setFilter, filter } = useContext(CustomContext)

  const signUpHandler = async (data) => {
    await instance.post("/registration", {
      ...data,
      balance: 1000
    }).then((res) => {
      setUser(res.data.user)
      localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
      localStorage.setItem('token', JSON.stringify(res.data.access_token))
      setFilter({ ...filter, not_me: res.data.user.id })
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch(err => {
      if (err.response.status === 400) {
        alert('пользователь с такой почтой существует!')
      }
    })
  }

  const signInHandler = async (data) => {
    await instance.post("/login", data).then((res) => {
      setUser(res.data.user)
      localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
      localStorage.setItem('token', JSON.stringify(res.data.access_token))
      setFilter({ ...filter, not_me: res.data.user.id })
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch(err => {
      if (err.response.status === 404) {
        alert('Пользователь с такой почтой не найден!')
      }
      if (err.response.status === 400) {
        alert('Неверный пароль!')
      }
    })
  }

  const {
    handleSubmit,
    register,
    reset, formState: {
      errors
    }
  } = useForm()
  const popupClose = (e) => {
    if (e.target.classList.contains('overlay')) {
      setPopup(false)
    } else {
      setPopup(true)
    }
  }
  const submitForm = (data) => {

    if (status === 'signIn') {
      signInHandler(data)
    } else {
      signUpHandler(data)
    }
    setPopup(false)
    reset()
  }
  return (
    <div onClick={(e) => popupClose(e)} className={`overlay ${popup && "overlay_active"}`}>
      <div className="popup">
        <form noValidate onSubmit={handleSubmit(submitForm)} action="" className="popup__form">
          <div className="popup__form-top">
            <h2 onClick={() => setStatus("signIn")} className={`popup__title ${status === "signIn" && "popup__title_active"}`}>
              Войти
            </h2>
            <h2 onClick={() => setStatus("signUp")} className={`popup__title ${status === "signUp" && "popup__title_active"}`}>
              Регистрация
            </h2>
          </div>
          <input {...register("email", {
            required: {
              message: "Почта не может быть пустой!",
              value: true,
            },
            minLength: {
              message: "Минимальная длина почты 10!",
              value: 10,
            },
            pattern: {
              message: "Проверьте почту!",
              value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
            },
          })} className="popup__input" type="email" placeholder="email" />
          {
            status === "signUp" && <input {...register("name")} className="popup__input" type="text" placeholder="name" />
          }
          <input {...register("password", {
            required: {
              message: "Пароль не может быть пустым!",
              value: true,
            },
            minLength: {
              message: "Минимальная длина пароля 5!",
              value: 5,
            },
          })} className="popup__input" type="password" placeholder="password" />
          <div className="popup__errors">
            <p className="errors-error">
              {errors.email ? errors.email.message : errors.password?.message}
            </p>
          </div>
          <button className="popup__btn" type="submit">
            {
              status === "signIn" ? <p>Войти</p> : <p>Регистрация</p>
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
