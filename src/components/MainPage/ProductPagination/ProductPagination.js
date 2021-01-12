import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import './ProductPagination.css'
import * as ActionCreators from '../../../store/cart'

const ProductPagination = ({ productList = [], sort = 0, filters = [], ...props }) => {
    const [currPage, setCurrPage] = useState(1)
    const [is4PerRow, setIs4PerRow] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const cart = useSelector(state => state.cart)
    const perRow = is4PerRow ? 4 : 3
    const perPage = perRow * 2
    const history = useHistory()
    const dispatch = useDispatch()

    const filteredProductList = useMemo(() => {
        let result = [...productList]
        if (filters && filters.length > 0)
            result = result.filter((val) => filters.includes(val.brand.id))
        if (searchQuery.length > 0) {
            result = result.filter(val => val.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        if (sort === 1) {
            result.sort((a, b) => a.price - b.price)
        }
        if (sort === 2) {
            result.sort((a, b) => b.price - a.price)
        }
        return result
    }, [productList, filters, sort, searchQuery])
    const pageProducts = filteredProductList.slice(perPage * (currPage - 1), perPage * currPage)
    const lastPageNum = Math.ceil(filteredProductList.length / perPage)
    useEffect(() => setCurrPage(1), [filters, searchQuery, sort])
    let paginationButtons = []
    for (var i = 1; i <= lastPageNum; i++) {
        const thisI = i
        const cls = "page-item" + (currPage === thisI ? " active" : '')
        paginationButtons.push(
            <li key={thisI} className={cls}
                onClick={() => setCurrPage(thisI)}
            >
                <div className="page-link">{thisI}</div>
            </li>)
    }
    return (<>
        <div className='container-fluid w-100'>
            <div className='row mb-2'>
                <div className='col'>
                    <div className='card'>
                        <div className="card-body">
                            <div className='d-flex'>
                                <div className='flex-grow-1'>
                                    <input type="text" className='form-control' value={searchQuery} width='100%'
                                        onChange={(e) => setSearchQuery(e.target.value)} />
                                </div>
                                <div className='ml-2 my-auto'>
                                    {"Change Layout: "}
                                    <span className={'border border-secondary px-1 perPage' + (is4PerRow ? '' : 'Curr')}
                                        onClick={() => { setCurrPage(1); setIs4PerRow(false) }}>
                                        ■ ■ ■
                                </span>
                                    {'   '}
                                    <span className={'border border-secondary px-1 perPage' + (is4PerRow ? 'Curr' : '')}
                                        onClick={() => { setCurrPage(1); setIs4PerRow(true) }}>
                                        ■ ■ ■ ■
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                {pageProducts.map(((obj) => {
                    const cartData = cart.find((item) => item.id === obj.id)
                    return <div key={obj.id} className={'mb-2 col-' + (12 / perRow)}>
                        <div className="card  h-100" style={{}}>
                            <img src={obj.imageUrl} className="card-img-top mt-2" alt="..." />
                            <div className="card-body d-flex flex-column">
                                <p className="card-title"><a href={'/product/' + obj.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        history.push('/product/' + obj.id)
                                    }}>{obj.name}</a></p>
                                <h5 className="card-title">${obj.price}</h5>
                                <p className="card-text">{obj.description}</p>

                                {cartData ?
                                    <div className='d-flex mt-auto mx-auto' >
                                        <input type='number' min='1' className='form-control mr-2' style={{ width: '80px' }}
                                            value={cartData.amount} onChange={(e) => dispatch(ActionCreators.changeNumOfItem(cartData.id, e.currentTarget.value))} />

                                        <button className='btn btn-outline-danger'
                                            onClick={() => dispatch(ActionCreators.removeItem(cartData.id))}><i className="fas fa-trash"></i></button>
                                    </div> : <button className="btn btn-info mt-auto mx-auto"
                                        onClick={() => dispatch(ActionCreators.addItem(obj.id))}>
                                        Add to Cart</button>}

                            </div>
                        </div>
                    </div>
                }))}
            </div>
            <div className='row col'>
                <nav aria-label="...">
                    <ul className="pagination">
                        <li onClick={() => setCurrPage(currPage > 1 ? currPage - 1 : currPage)}
                            className={"page-item" + (currPage === 1 ? " disabled" : '')}>
                            <div className='page-link'>Previous</div>
                        </li>
                        {paginationButtons}
                        <li onClick={() => setCurrPage(currPage < lastPageNum ? currPage + 1 : lastPageNum)}
                            className={"page-item" + (currPage === lastPageNum ? " disabled" : '')}>
                            <div className="page-link">Next</div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </>
    )
}
export default ProductPagination