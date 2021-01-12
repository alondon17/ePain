import { useEffect, useState } from "react"

const Filters = ({ sort = 0, setSort, filters = [], setFilters, ...props }) => {
    const [brands, setBrands] = useState(undefined)
    useEffect(
        () => {
            fetch('http://localhost:8080/brands').then((response) => response.json()).then((data) => setBrands(data))
        }
        , []
    )
    // if(!brands) return <div></div>
    const brandData = brands && brands.map((brand) => {
        var numOfPhones = props.productList.reduce((cumul, curr) => curr.brand.id === brand.id ? cumul + 1 : cumul, 0)
        return { ...brand, num: numOfPhones }
    })
    return brands ? < >
        <div className="card">
            <div className="card-header">
                Brands
  </div>
            <ul className="list-group list-group-flush">
                {brandData.map((brand) => {
                    const checked = filters.includes(brand.id)
                    const onClick = () => {
                        if (checked) {
                            let newFilters = filters.filter((id) => id !== brand.id)
                            setFilters(newFilters)
                        }
                        else {
                            setFilters(filters.concat(brand.id))
                        }
                    }
                    return <li key={brand.id} className="list-group-item">
                        <div className="form-check mr-sm-2">
                            <input className="form-check-input" checked={checked} type="checkbox"  onChange={onClick}/>
                            <label className="form-check-label">
                                {brand.name + " (" + brand.num + ')'}</label>
                        </div>
                    </li>
                })}
            </ul>
        </div>
        <div className="card mt-3">
            <div className="card-header">
                Brands
  </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item" onClick={() => setSort(sort === 1 ? 0 : 1)}>
                    <div className="form-check mr-sm-2">
                        <input className="form-check-input" type="radio" checked={sort === 1}
                             readOnly/>
                        <label className="form-check-label">
                            Low to High
  </label>
                    </div>
                </li>
                <li className="list-group-item" onClick={() => setSort(sort === 2 ? 0 : 2)}>
                    <div className="form-check mr-sm-2">
                        <input className="form-check-input" type="radio" checked={sort === 2}
                            readOnly/>
                        <label className="form-check-label">
                            High to Low
  </label>
                    </div>
                </li>
            </ul>
        </div>
    </>
        : <div></div>
}
export default Filters