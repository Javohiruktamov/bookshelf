import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contex/AuthContext'; 
import { Link } from 'react-router-dom';
import "./Login.scss"

const Login = () => {
  let {setToken} = useContext(AuthContext)


  const passwordRef = useRef("");
  const emailRef = useRef("");
  const navigate = useNavigate("")

const handleSubmit = (e) => {
  e.preventDefault()
 let email = emailRef.current.value
 let password = passwordRef.current.value

 fetch("http://localhost:5000/users")
 .then(res => res.json())
 .then(data => {
  const user = data.find(el => el.email == email && el.password == password )
  if(user){
    setToken(user)
    navigate("/")
  }else{
    alert("Incorrect email or password")
  }
 })
}

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
      <h1>Sign in </h1>
      <label htmlFor="email">Email: </label>
      <input ref={emailRef} type="email" id="email" placeholder='Email kiriting' />
      <label htmlFor="password">Parol: </label>
      <input ref={passwordRef} type="password" id="password" placeholder='Parol kiriting' />
      <button type="submit">Submit</button>
      <p>Already signed up? <Link to={"/"}>Go to Sing up</Link></p>
    </form>
    </div>
  )
}

export default Login