import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ActionCreators from '../../store/cart'

const Cart = (props) => {
    const cart = useSelector(state => state.cart)
    const [productList, setProductList] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        fetch('http://localhost:8080/products', { mode: 'cors' }).then((response) => response.json())
            .then(data => { setProductList(data) })
    }, [])
    const totalPrice = (cart && productList) ? cart.reduce((prev, curr) => {
        var currData = productList.find((product) => product.id === curr.id)
        return (prev + (curr.amount * currData.price))
    }, 0) : 0
    const sendCart = () => {
        fetch('http://localhost:8080/order', {
            method: 'post', mode: 'cors', body: JSON.stringify({ products: cart }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => { dispatch(ActionCreators.deleteCart()); alert('ID:' + data.id + ". Price: " + data.totalPrice) })
            .catch(() => { alert('Error please retry') })
    }
    return <div className='mt-5 mx-4'>
        <div className="card">
            <div className="card-header bg-dark text-light">
                <i className="fas fa-shopping-cart mr-2"></i> Shopping Cart
  </div>
            <div className="card-body">
                <div className='m-2'>
                    {cart && productList && cart.map(item => {
                        const itemData = productList.find(val => val.id === item.id)
                        return <div key={item.id} className='d-flex'>
                            <img className='m-2' width='15%' height='100px' src={itemData.imageUrl}
                                alt={itemData.name} />
                            <div className='flex-grow-1 m-2'>
                                <h5 className="card-title">{itemData.name}</h5>
                                <p className="card-text">{itemData.description}</p>
                            </div>
                            <div className='m-2 mt-3'>
                                <b>{itemData.price}</b> X
                            </div>
                            <div className='m-2' >
                                <input type='number' min='1' className='form-control' style={{ width: '80px' }}
                                    value={item.amount} onChange={(e) => dispatch(ActionCreators.changeNumOfItem(item.id, e.currentTarget.value))} />
                            </div>
                            <div className='m-2'>
                                <button className='btn btn-outline-danger'
                                    onClick={() => dispatch(ActionCreators.removeItem(item.id))}><i className="fas fa-trash"></i></button>
                            </div>
                        </div>

                    })}
                </div>
            </div>
            <div className="card-footer text-right">
                Total price:<b>{totalPrice.toFixed(2)}</b>
                <button className='btn btn-outline-secondary m-2' onClick={() => sendCart()}>Send Order</button>
            </div>
        </div>
    </div>
}

export default Cart