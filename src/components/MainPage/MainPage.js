import React, { useState } from "react"
import { useProducts } from "../../utility/hooks"
import Filters from "./Filters/Filters"
import ProductPagination from "./ProductPagination/ProductPagination"
import * as sortTypes from './sortTypes'

const MainPage = () => {
    const [products] = useProducts()
    const [filters, setFilters] = useState([])
    const [sort, setSort] = useState(sortTypes.None)

    const productContent = products ?
        <div className='container-fluid row mt-2'>
            <div className='col-3'>
                <Filters filters={filters} sort={sort} setSort={(v) => setSort(v)}
                    setFilters={(v) => setFilters(v)} productList={products} />
            </div>
            <div className='col-9'>
                <ProductPagination sort={sort} filters={filters} productList={products} />
            </div>
        </div>
        : <h4>Loading...</h4>
    return <div>{productContent}</div>
}
export default MainPage