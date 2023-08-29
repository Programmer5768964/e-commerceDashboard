import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';




const UpdateProduct = () => {
    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [catagory, setCatagory] = React.useState('')
    const [company, setCompany] = React.useState('');
    const navigate = useNavigate();
    // const [error,setError] = React.useState(false);
    const params = useParams();

    useEffect(() => {
        getProductDetail();
    }, [])

    const getProductDetail = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
            });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCatagory(result.catagory)
        setCompany(result.company)
    }


    const CollectData = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "put",
            body: JSON.stringify({ name, price, catagory, company }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (result) {
            alert("Product Updated");
            navigate("/")
        }



    }



    return (
        <div className='form'>
            <h1>Update Product</h1>
            <input className='inputBox' type="text" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />

            <input className='inputBox' type="text" placeholder="Enter product price" value={price} onChange={(e) => setPrice(e.target.value)} />

            <input className='inputBox' type="text" placeholder="Enter product catagory" value={catagory} onChange={(e) => setCatagory(e.target.value)} />

            <input type="text" placeholder="Enter product company" className='inputBox' value={company} onChange={(e) => setCompany(e.target.value)} />

            <button onClick={CollectData} type='button' className='btn' >Update Product</button>
        </div>
    )
}

export default UpdateProduct;
