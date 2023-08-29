import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [catagory, setCatagory] = React.useState('')
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    const CollectData = async () => {
        console.log(name, price, catagory, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        if (!name || !price || !catagory || !company) {
            setError(true);
            return false;
        }



        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, catagory, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`


            }
        });

        result = await result.json();
        console.log(result);
        if (result) {
            navigate("/")
        }



    }

    return (
        <div className='form'>
            <h1>Add Product</h1>
            <input className='inputBox' type="text" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className='invalid-input' >Enter vaild field</span>}
            <input className='inputBox' type="text" placeholder="Enter product price" value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className='invalid-input' >Enter vaild field</span>}
            <input className='inputBox' type="text" placeholder="Enter product catagory" value={catagory} onChange={(e) => setCatagory(e.target.value)} />
            {error && !catagory && <span className='invalid-input' >Enter vaild field</span>}
            <input type="text" placeholder="Enter product company" className='inputBox' value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className='invalid-input' >Enter vaild field</span>}
            <button onClick={CollectData} type='button' className='btn' >Add Product</button>
        </div>
    )
}

export default AddProduct;
