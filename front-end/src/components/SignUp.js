import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';  //usenavigate  is a hoock to redirect the path 


const SignUp = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    })

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    

    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();

        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result))    // store user data to the local storage
        localStorage.setItem("token",JSON.stringify(result.auth))    // store user data to the local storage
        if(result)
        {
            navigate("/")
        }
    }
    return (

        <div className="form">
            <h1>Register</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />

            <input className="inputBox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />


            <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />


            <button className='btn' onClick={collectData} type="button">SignUp</button>
        </div>
    )
}

export default SignUp;

































































