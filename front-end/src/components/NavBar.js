import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const NavBar = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        // console.warn("logged out...");
        localStorage.clear();
        navigate("/SignUp");


    }

    return (
        <div>
            {
                auth ?
                    <ul className='nav-ul'>
                        <li><Link to="/">Products</Link></li>
                        {/* <li><Link to="/update">Update Product</Link></li> */}
                        <li><Link to="/profile">Profile</Link></li>
                        <li> <Link onClick={logout} to="/SignUp">Logout ({JSON.parse(auth).name})</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                        {/* <li><Link to="/admin">Add Product</Link></li> */}
                    </ul>
                    :
                    <ul className='nav-ul nav-ul-right' >
                        <li><Link to="/SignUp">Sign Up</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                       

                    </ul>


            }



        </div>
    )
}

export default NavBar;