import Chart from "./Chart"
import "./chart.scss"

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
    document.body.classList.remove("dark-theme")

    return (
        <div className="light-theme" style={style}>
            <Chart />
        </div>
    )
}

export default Data;
