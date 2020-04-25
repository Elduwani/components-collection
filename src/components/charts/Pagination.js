import React, { useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage, currentDataset }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [currentDataset])

    const first = pageNumbers[0]
    const last = pageNumbers[pageNumbers.length - 1]

    return (
        <div className="pagination-arrows">
            <ul>
                <li
                    className={`left ${currentPage <= first ? 'disabled' : ''}`}
                    onClick={() => {
                        if (currentPage > first) {
                            setCurrentPage(n => n - 1)
                        }
                    }}
                ><FiChevronLeft /></li>

                <li>{`${currentPage} of ${pageNumbers.length}`}</li>

                <li
                    className={`right ${currentPage >= last ? 'disabled' : ''}`}
                    onClick={() => {
                        if (currentPage < last) {
                            setCurrentPage(n => n + 1)
                        }
                    }}
                ><FiChevronRight /></li>
            </ul>
        </div>
    );
}

export default Pagination;