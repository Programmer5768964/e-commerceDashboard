import React,{useState,useEffect} from 'react'

import { useNavigate } from 'react-router-dom'

const Login = ()=>{
    const navigate = useNavigate();
   useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth)
    {
        navigate('/')
    }
   })
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
   


    const collectData = async()=>{
     
        console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })

        result = await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.User))
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate('/')
        }else{
            alert("please enter valid field")
        }
    }
    return (
        <div className='form'>
             <h1>Login</h1>

            <input className="inputBox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />


            <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />


            <button className='btn' onClick={collectData} type="button">Login</button>
        </div>
    )
}

export default Login;

