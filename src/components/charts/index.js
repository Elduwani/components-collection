import React from 'react';
import Chart from "./Chart"
import "./styles.css"

const style = {
    margin: `40px 0`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: `100vh`
}

const Data = () => {

    document.title = "Data Visualisation | React Hooks"

    return (
        <div className="light-theme" style={style}>
            <Chart />
        </div>
    )
}

export default Data;
