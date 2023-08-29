import React from 'react';

import {Navigate,Outlet} from 'react-router-dom'

const PrivateRoute = ()=>{
    const auth = localStorage.getItem('user');
    const auth1 = localStorage.getItem('user1');
    if(auth || auth1){
        return <Outlet/>

    }else{
        <Navigate to="/SignUp"/>

    }
   
}

export default PrivateRoute;

