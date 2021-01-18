import React from "react"
import { Card, Form, ListGroup } from "react-bootstrap"
import { useBrands } from "../../../utility/hooks"
import * as sortTypes from '../sortTypes'
import PropTypes from 'prop-types'

const Filters = ({ sort =sortTypes.None, setSort, filters = [], setFilters, ...props }) => {
    const [brands] = useBrands()

    const brandData = brands && brands.map((brand) => {
        const numOfPhones = props.productList.reduce((cumul, curr) => curr.brand.id === brand.id ? cumul + 1 : cumul, 0)
        return { ...brand, num: numOfPhones }
    })
    const brandOnClick = (brand, checked) => {
        if (checked) {
            const newFilters = filters.filter((id) => id !== brand.id)
            setFilters(newFilters)
        }
        else {
            setFilters(filters.concat(brand.id))
        }
    }
    const brandButtons = brands && brandData.map((brand) => {
        const checked = filters.includes(brand.id)
        return <ListGroup.Item key={brand.id}>
            <Form.Check className="mr-sm-2">
                <Form.Check.Input checked={checked} type="checkbox" onChange={() => brandOnClick(brand, checked)} />
                <Form.Check.Label>
                    {`${brand.name} (${brand.num})`}
                </Form.Check.Label>
            </Form.Check>
        </ListGroup.Item>
    })

    return brands ? <React.Fragment >
        <Card>
            <Card.Header>
                {'Brands'}
            </Card.Header>
            <ListGroup variant='flush'>
                {brandButtons}
            </ListGroup>
        </Card>
        <Card className="mt-3">
            <Card.Header>
                {'Brands'}
            </Card.Header>
            <ListGroup variant='flush'>
                <ListGroup.Item onClick={() => setSort(sort === sortTypes.LowToHigh ? sortTypes.None : sortTypes.LowToHigh)}>
                    <Form.Check className="mr-sm-2">
                        <Form.Check.Input type="radio" checked={sort === sortTypes.LowToHigh}
                            readOnly />
                        <Form.Check.Label>
                            {'Low to High'}
                        </Form.Check.Label>
                    </Form.Check>
                </ListGroup.Item>
                <ListGroup.Item onClick={() => setSort(sort === sortTypes.HighToLow ? sortTypes.None : sortTypes.HighToLow)}>
                    <Form.Check className="mr-sm-2">
                        <Form.Check.Input type="radio" checked={sort === sortTypes.HighToLow}
                            readOnly />
                        <Form.Check.Label>
                            {'High to Low'}
                        </Form.Check.Label>
                    </Form.Check>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    </React.Fragment>
        : <div></div>
}
Filters.propTypes = {
    sort: PropTypes.number,
    setSort: PropTypes.func,
    filters: PropTypes.arrayOf(PropTypes.number),
    setFilters: PropTypes.func
}
export default Filters