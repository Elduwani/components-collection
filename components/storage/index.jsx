import Storage from "./Storage"
import "./storage.scss"

export default function Index() {
    // const [count, setCount] = React.useState(1)

    return (
        <div className="storage-page-wrapper">
            <div className="left-content">
                <h2 className="headline">Select your storage options</h2>
                <div className="headline"></div>
            </div>
            <div className="right-content">
                <Storage />
            </div>
        </div>
    )
}
