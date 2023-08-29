import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

        result = await result.json();
        setProducts(result);
    }

    const Del = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",

            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            getProducts();
            // alert("Record is deleted")


        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();

            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }

    }


    return (
        <div className='product-list'>

            <h1>Product List</h1>
            <input className='search-product-box' type="text" placeholder='SEARCH PRODUCT' onChange={searchHandle} />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Catagory</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((product, index) =>
                    <ul key={product._id}>

                        <li>{index + 1}</li>
                        <li>{product.name}</li>
                        <li>{product.price}</li>
                        <li>{product.catagory}</li>
                        <li><button onClick={() => Del(product._id)}>Delete</button><Link to={'/update/' + product._id}>Update</Link></li>

                    </ul>
                )
                    : <h1>No Match found</h1>
            }




        </div>
    )
}

export default ProductList;