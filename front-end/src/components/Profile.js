import React, { useEffect, useState } from 'react';
import './profile.css'

import img7 from './defaultProfile.png'

import axios from 'axios';

const Profile = ()=>{
    const USER = JSON.parse( localStorage.getItem("user"));
    const userName = USER.name
    

    
    const [image,setImage] = useState('');
    const [data,setData] = useState([]);

    // useEffect(async()=>{
    //     getProfilePic();
    //  })

    //  const getProfilePic = () => {
    //      axios.get('http://localhost:5000/api/getpic')
    //          .then((res) =>
    //              setData(res.data))
                 
    //          .catch((err) =>
    //              console.log(err, "error has occured"))
 
    //  }

    const submitProfilePic = async()=>{
        console.log(USER.name)
        console.log(image);
        const formdata = new FormData();
        formdata.append('u_name', userName);
        formdata.append('profilePic', image);
        axios.post('http://localhost:5000/api/profile', formdata, {
            headers: { 'Authorization': localStorage.getItem('token') }
        })
            .then((res) => {
                console.log(res.data)
                if (res.data.code === 403 && res.data.message === "Token Expired") {
                    localStorage.setItem('token', null)
                }
            })
            .catch((err) => {
                console.log(err, "error has occured")
            })

        }

       
        // console.log(data);

        // let data = await fetch("http://localhost:5000/api/profile",{
        //     method:"POST",
        //     body:JSON.stringify({userName,image}),
        //     headers:{
        //         "Content-Type":"application/json"
        //     }
        // })
        // data = await data.json();
        // console.log(data);
        // if(data)
        // {

        // }

    





    
    return(
        <div>
            <div className='profile-pic'>
                <img className='img' src={img7}  alt="..." />
               
            </div>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} ></input>
            <button onClick={submitProfilePic} className='btn7' type='button' >upload photo</button>


            <h1>{USER.name}</h1>
            
        </div>
    )
}

export default Profile;