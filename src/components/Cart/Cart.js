import React, { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as ActionCreators from '../../store/cart';
import { postToApi } from '../../utility/requestService';
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useCart, useProducts } from "../../utility/hooks";

const Cart = () => {
    const cart = useCart();
    //If not empty modal will open, should be array of header and content
    const [show,setShow]=useState(false)
    const [modalContent, setModalContent] = useState(null);
    const [productList] = useProducts();
    const dispatch = useDispatch();

    const totalPrice = (cart && productList) ? cart.reduce((prev, curr) => {
        const currData = productList.find((product) => product.id === curr.id)
        return (prev + (curr.amount * currData.price))
    }, 0) : 0

    const sendCart = () => {
        postToApi('/order', { products: cart })
            .then((data) => { dispatch(ActionCreators.deleteCart()); setModalContent(['Success', 'ID:' + data.id + ". Price: " + data.totalPrice]);setShow(true) })
            .catch(() => { setModalContent(['Request Failed', 'Error please retry']);setShow(true) })
    }
    const handleClose = () => {
        setShow(false)
        setModalContent(null)
    }

    const renderedProducts = cart && productList && cart.map(item => {
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
                <Form.Control type='number' min='1' style={{ width: '80px' }}
                    value={item.amount} onChange={(e) => dispatch(ActionCreators.changeNumOfItem(item.id, e.currentTarget.value))} />
            </div>
            <div className='m-2'>
                <Button variant='outline-danger' onClick={() => dispatch(ActionCreators.removeItem(item.id))}>
                    <FaTrash />
                </Button>
            </div>
        </div>
    })

    return <div className='mt-5 mx-4'>
        <Card>
            <Card.Header className="bg-dark text-light">
                <FaShoppingCart className="mr-2" /> {' Shopping Cart'}
            </Card.Header>
            <Card.Body>
                <div className='m-2'>
                    {renderedProducts}
                </div>
            </Card.Body>
            <Card.Footer className="text-right">
                Total price:<b>{totalPrice.toFixed(2)}</b>
                <Button variant='outline-secondary' className='m-2' onClick={() => sendCart()}>Send Order</Button>
            </Card.Footer>
        </Card>
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{modalContent && modalContent[0]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContent && modalContent[1]}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
    </div >
}

export default Cart