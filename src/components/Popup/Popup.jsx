import React, { useState } from "react";
import instance from '../../axios'


const Popup = ({ popup, setPopup, user, setUser }) => {
  const [status, setStatus] = useState("signIn");
  const [name, setName] = useState('')
  const[psw, setPsw] = useState('')
  const[email, setEmail] = useState('')

  const popupClose = (e) => {
    if(e.target.classList.contains('overlay')) {
        setPopup(false)
    } else {
        setPopup(true)
    }
  }

  const signUpHandler = async () => {
     await instance.post("/registration", {
      email: email,
      name: name,
      password: psw,
      balance: 1000 
    }).then((res) => {
      setUser(res.data.user)
      setPopup(false)
      setEmail('')
      setName('')
      setPsw('')
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch(err => alert(err))
  }

  const signInHandler = async () => {
     await instance.post("/login", {
      email: email,
      password: psw 
    }).then((res) => {
      setUser(res.data.user)
      setPopup(false)
      setEmail('')
      setName('')
      setPsw('')
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch(err => alert(err))
  }

  return (
    <div onClick={(e) => popupClose(e)} className={`overlay ${popup && "overlay_active"}`}>
      <div className="popup">
        <form action="" className="popup__form">     
          <div className="popup__form-top">
            <h2 onClick={() => setStatus("signIn")} className={`popup__title ${status === "signIn" && "popup__title_active"}`}>
              Войти
            </h2>
            <h2 onClick={() => setStatus("signUp")} className={`popup__title ${status === "signUp" && "popup__title_active"}`}>
              Регистрация
            </h2>
         
          </div>         
          <input className="popup__input" type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
          {
          status === "signUp" && <input className="popup__input" type="text" placeholder="name"  onChange={e => setName(e.target.value)}/>
          }
          <input className="popup__input" type="password" placeholder="password" onChange={e => setPsw(e.target.value)}/>
          <div className="popup__btn" type="submit" onClick={() => {
              if (status === 'signIn'){
                signInHandler()
              } else {
                signUpHandler()
              }
          }}>
            {
            status === "signIn" ? <p>Войти</p> : <p>Регистрация</p>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
