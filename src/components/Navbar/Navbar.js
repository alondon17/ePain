import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from "react-router";
import { useCart } from "../../utility/hooks";

const Navbar = () => {
    const history = useHistory()
    const cart = useCart()

    return (
        <div className="bg-dark text-light d-flex justify-content-between" >
            <div className='ml-5 my-2' onClick={() => history.push('/')}>
                Ecommerce
            </div>
            <div className='mr-5 my-2 text-muted' onClick={() => history.push('/cart')}>
                <FaShoppingCart /> Cart {cart.length > 0 && `(${cart.length})`}
            </div>
        </div>
    )
}

export default Navbar