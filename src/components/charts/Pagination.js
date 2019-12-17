import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentDataset }) => {
    // console.log(itemsPerPage, totalItems)
    const pageNumbers = []
    const [number, setNumber] = useState(1)

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    useEffect(() => {
        paginate(number)
    }, [number])

    useEffect(() => {
        setNumber(1)
    }, [currentDataset])

    const first = pageNumbers[0]
    const last = pageNumbers[pageNumbers.length - 1]

    return (
        <div className="pagination-arrows">
            <ul>
                <li
                    className={`left ${number <= first ? 'disabled' : ''}`}
                    onClick={() => {
                        if (number > first) {
                            setNumber(n => n - 1)
                        }
                    }}
                ><FiChevronLeft /></li>
                <li>{`${number} of ${pageNumbers.length}`}</li>
                <li
                    className={`right ${number >= last ? 'disabled' : ''}`}
                    onClick={() => {
                        if (number < last) {
                            setNumber(n => n + 1)
                        }
                    }}
                ><FiChevronRight /></li>
            </ul>
        </div>
    );
}

export default Pagination;

{
    /* 
        <ul>
            {
                pageNumbers.map(num => (
                    <li key={num} onClick={((e) => {
                        e.preventDefault()
                        paginate(num)
                    })}>
                        <a href={num}>{num}</a>
                    </li>
                ))
            }
        </ul> 
    */
}