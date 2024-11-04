import React, { useContext, useRef } from 'react';
import { AuthContext } from '../Contex/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Register.scss"

const Register = () => {
    const { setToken } = useContext(AuthContext);

    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const emailRef = useRef("");
    const navigate = useNavigate("")

    const handleSubmit = (e) => {
        e.preventDefault(); 

        let data = JSON.stringify({
            userName: usernameRef.current.value,
            password:passwordRef.current.value,
            email: emailRef.current.value
        })

        if(usernameRef.current.value != "" && passwordRef.current.value != "" && emailRef.current.value != ""){
            fetch("http://localhost:5000/users" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data
        })
        .then(res => res.json())
        .then(data => {
            if(data.id){
                navigate("/login")
            }
        })
        }


    };

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <label htmlFor="name">Ismingiz: </label>
            <input ref={usernameRef} type="text" id="name" placeholder='Ismingizni kiriting' />
            <label htmlFor="email">Email: </label>
            <input ref={emailRef} type="email" id="email" placeholder='Email kiriting' />
            <label htmlFor="password">Parol: </label>
            <input ref={passwordRef} type="password" id="password" placeholder='Parol kiriting'   />
            <button type="submit">Submit</button><br />
            <p>Already sign up? <Link to={"/login"}>Go to Sign in</Link></p>

        </form>
        </div>
    );
};

export default Register;