import React, { useEffect, useMemo, useState } from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router";
import styles from './ProductPagination.module.css';
import * as ActionCreators from '../../../store/cart';
import { useCart } from "../../../utility/hooks";
import * as sortTypes from '../sortTypes';
import { Button, Card, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import PaginationButtons from "./PaginationButtons/PaginationButtons";

const ProductPagination = ({ productList = [], sort = 0, filters = [] }) => {
    const [currPage, setCurrPage] = useState(1)
    const [is4PerRow, setIs4PerRow] = useState(false);;
    const [searchQuery, setSearchQuery] = useState('');
    const cart = useCart();
    const perRow = is4PerRow ? 4 : 3;
    const perPage = perRow * 2;
    const history = useHistory();
    const dispatch = useDispatch();

    const filteredProductList = useMemo(() => {
        let result = [...productList];
        if (filters && filters.length > 0)
            result = result.filter((val) => filters.includes(val.brand.id))
        if (searchQuery.length > 0) {
            result = result.filter(val => val.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        if (sort === sortTypes.LowToHigh) {
            result.sort((a, b) => a.price - b.price);
        }
        if (sort === sortTypes.HighToLow) {
            result.sort((a, b) => b.price - a.price);
        }
        return result
    }, [productList, filters, sort, searchQuery])

    const pageProducts = filteredProductList.slice(perPage * (currPage - 1), perPage * currPage)
    const lastPageNum = Math.ceil(filteredProductList.length / perPage)

    //Resets the current page if the products shown change
    useEffect(() => setCurrPage(1), [filters, searchQuery, sort])

    
    const pageProductsCards = pageProducts.map(((obj) => {
        const cartData = cart.find((item) => item.id === obj.id)
        return <div key={obj.id} className={'mb-2 col-' + (12 / perRow)}>
            <Card className="h-100">
                <Card.Img variant='top' src={obj.imageUrl} className="mt-2" alt="..." />
                <Card.Body className="d-flex flex-column">
                    <p className="card-title">
                        <a href={'/product/' + obj.id} onClick={(e) => {
                            e.preventDefault();
                            history.push('/product/' + obj.id)
                        }}>{obj.name}</a>
                    </p>
                    <h5 className="card-title">${obj.price}</h5>
                    <p className="card-text">{obj.description}</p>
                    {cartData ?
                        <div className='d-flex mt-auto mx-auto' >
                            <Form.Control type='number' min='1' className='mr-2' style={{ width: '80px' }} value={cartData.amount}
                                onChange={(e) => dispatch(ActionCreators.changeNumOfItem(cartData.id, e.currentTarget.value))} />
                            <Button variant='outline-danger' onClick={() => dispatch(ActionCreators.removeItem(cartData.id))}>
                                <FaTrash />
                            </Button>
                        </div>
                        : <Button variant='info' className="mt-auto mx-auto" onClick={() => dispatch(ActionCreators.addItem(obj.id))}>
                            {'Add to Cart'}
                        </Button>}
                </Card.Body>
            </Card>
        </div>
    }))

    return (<React.Fragment>
        <div className='container-fluid w-100'>
            <div className='row mb-2'>
                <div className='col'>
                    <Card>
                        <Card.Body>
                            <div className='d-flex'>
                                <div className='flex-grow-1'>
                                    <Form.Control type="text" value={searchQuery} width='100%' onChange={(e) => setSearchQuery(e.target.value)} />
                                </div>
                                <div className='ml-2 my-auto'>
                                    {"Change Layout: "}
                                    <span className={'border border-secondary px-1 perPage' + (is4PerRow ? styles.perPage :styles.perPageCurr)}
                                        onClick={() => { setCurrPage(1); setIs4PerRow(false) }}>
                                        {"■ ■ ■"}
                                    </span>
                                    {'   '}
                                    <span className={'border border-secondary px-1 perPage'+ (is4PerRow ? styles.perPageCurr : styles.perPage)}
                                        onClick={() => { setCurrPage(1); setIs4PerRow(true) }}>
                                        {'■ ■ ■ ■'}
                                    </span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className='row'>
                {pageProductsCards}
            </div>
            <div className='row col'>
                <nav aria-label="...">
                    <PaginationButtons currPage={currPage} setCurrPage={setCurrPage} lastPageNum={lastPageNum} />
                </nav>
            </div>
        </div>
    </React.Fragment>
    )
}
ProductPagination.propTypes = {
    productList: PropTypes.arrayOf(PropTypes.object),
    sort: PropTypes.number,
    filters: PropTypes.arrayOf(PropTypes.number)
}
export default ProductPagination