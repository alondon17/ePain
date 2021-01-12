import React, { useEffect, useState } from "react"
import Filters from "./Filters/Filters"
import ProductPagination from "./ProductPagination/ProductPagination"
const MainPage = (props) => {
    const [products,setProducts] = useState(null)
      useEffect(()=>{  fetch('http://localhost:8080/products', { mode: 'cors' }).then((response) => response.json())
      .then(data => { setProducts(data) })
  }, [])
    const [filters,setFilters]=useState([])
    const [sort,setSort]=useState(0)
    const productContent = products ?
        <div className='container-fluid row mt-2'>
            <div className='col-3'>
                <Filters filters={filters} sort={sort}
                setSort={(v)=>setSort(v)}
                setFilters={(v)=>setFilters(v)} productList={products}/>
            </div>
            <div className='col-9'>
                <ProductPagination sort={sort} filters={filters} productList={products}
                    />
            </div>
        </div>
        : 'ooooops'
    return <div>{productContent}</div>
}
export default MainPage