import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Chart from 'react-apexcharts'
import Pagination from './Pagination'
import getData from '../../functions/loadXML'
import numberFormat from '../../functions/numberFormat'


const ChartApp = () => {
    const [data, setData] = useState(getData())
    const [value, setValue] = useState(data.options[4])
    const [currentDataset, setCurrentDataset] = useState([])

    useEffect(() => {
        setCurrentDataset(data.data[value.value])
    }, [value, data])

    //Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = currentDataset.slice(indexOfFirstItem, indexOfLastItem)

    const options = {
        chart: {
            id: "basic-bar",
        },
        title: {
            text: value.label.length > 60 ? value.label.substr(0, 60) + "..." : value.label,
            align: 'center'
        },
        theme: { palette: 'palette2' },
        xaxis: { categories: currentItem.map(el => el.year) },
        dataLabels: {
            enabled: false,
            formatter: function (val) {
                return numberFormat(val).toLowerCase()
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return numberFormat(val)
                },
            }
        }
    }
    const series = [
        {
            name: "World Bank - Canada",
            data: currentItem.map(el => el.value)
        }
    ]

    const paginate = (pageNumber) => setCurrentPage(+pageNumber)

    return (
        <>
            <div className="select-wrapper">
                <Select
                    className="select-basic-single"
                    options={data.options}
                    onChange={(val) => setValue(val)}
                    name="select"
                    defaultValue={value}
                />
            </div>
            <div className="mixed-chart">
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    width="500"
                />
            </div>
            <Pagination
                paginate={paginate}
                itemsPerPage={itemsPerPage}
                totalItems={currentDataset.length}
                currentDataset={currentDataset}
            />
        </>
    );
}

export default ChartApp;