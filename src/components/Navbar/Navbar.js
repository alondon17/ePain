import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
const Navbar=(props) => {
    const history=useHistory()
    const cart=useSelector(state=>state.cart)
    return (
        <div className="bg-dark text-light d-flex justify-content-between" >
            <div className='ml-5 my-2' onClick={()=>history.push('/')}>
                Ecommerce
            </div>
            <div className='mr-5 my-2 text-muted' onClick={()=>history.push('/cart')}>
                <i className="fas fa-shopping-cart"></i> Cart {cart.length>0&&`(${cart.length})`}
            </div>
        </div>
    )
}
export default Navbar