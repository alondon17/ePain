import React from "react";
import { useDispatch } from "react-redux";
import { pather } from "../../utility/utility";
import * as ActionCreators from '../../store/cart';
import { FaTrash } from "react-icons/fa";
import { useCart, useProducts } from "../../utility/hooks";
import { Button, Form } from "react-bootstrap";

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const cart = useCart();
    const [product] = useProducts(props.match.params.id);

    const textCodifiers = [
        { name: 'Description', loc: 'description' },
        { name: 'Brand', loc: ['brand', 'name'] },
        { name: 'Size', loc: 'size' },
        { name: 'Camera', loc: 'camera' },
        { name: 'CPU', loc: 'cpu' },
        { name: 'Memory', loc: 'memory' },
        { name: 'Display', loc: 'display' },
        { name: 'Battery', loc: 'battery' },
    ]

    const cartData = product ? cart.find((item => item.id === product.id)) : null;
    const textDetails = product && textCodifiers.map(obj => {
        return <div key={obj.name}>
            <strong>{obj.name}</strong>
            <p>{pather(product, obj.loc)}</p>
        </div>
    })

    return (
        <React.Fragment>
            {product ?
                <div className='container-fluid row w-100'>
                    <div className='col-4 border-top border-left rounded-left'>
                        <img className='w-100 m-2 mt-4' src={product.imageUrl} alt='bob' />
                    </div>
                    <div className='col-8 border-top border-left border-right rounded-right'>
                        <div className='mx-3 my-4'>
                            <h4>{product.name}</h4>
                            <h5 style={{ color: 'orange' }}>${product.price}</h5>
                            {textDetails}
                            <hr />
                            <hr />
                            {cartData ?
                                <div className='d-flex mt-auto mx-auto' >
                                    <Form.Control type='number' min='1' className='mr-2' style={{ width: '80px' }}
                                        value={cartData.amount} onChange={(e) => dispatch(ActionCreators.changeNumOfItem(cartData.id, e.currentTarget.value))} />
                                    <Button variant='outline-danger' onClick={() => dispatch(ActionCreators.removeItem(cartData.id))}>
                                        <FaTrash />
                                    </Button>
                                </div>
                                : <Button variant="outline-primary" className="mt-auto mx-auto" onClick={() => dispatch(ActionCreators.addItem(product.id))}>
                                    {'Add to Cart'}
                                </Button>}
                        </div>
                    </div>
                </div>
                : null}
        </React.Fragment>
    )
}
export default ProductPage;