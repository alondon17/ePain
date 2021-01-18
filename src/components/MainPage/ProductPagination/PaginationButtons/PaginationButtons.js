import PropTypes from "prop-types"
import React from 'react'
import { Pagination } from "react-bootstrap"

const PaginationButtons = ({currPage, setCurrPage, lastPageNum}) => {
    let paginationButtons = []
    for (let i = 1; i <= lastPageNum; i++) {
        paginationButtons.push(
            <Pagination.Item key={i} active={currPage === i} onClick={() => setCurrPage(i)}>
                {i}
            </Pagination.Item>)
    }
    return <Pagination>
        <Pagination.Item onClick={() => setCurrPage(currPage > 1 ? currPage - 1 : currPage)}
            disabled={currPage === 1}>
            {'Previous'}
        </Pagination.Item>
        {paginationButtons}
        <Pagination.Item onClick={() => setCurrPage(currPage < lastPageNum ? currPage + 1 : lastPageNum)}
            disabled={currPage === lastPageNum}>
            {'Next'}
        </Pagination.Item>
    </Pagination>
}

PaginationButtons.propTypes = {
    currPage: PropTypes.number,
    setCurrPage: PropTypes.func,
    lastPageNum: PropTypes.number
}

export default PaginationButtons