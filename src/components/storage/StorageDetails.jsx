import { useEffect } from 'react'
import { FiDatabase, FiFolder, FiMenu, FiVideo, FiTrash2, FiAirplay, FiServer, FiMusic } from "react-icons/fi"
import data from "./storageData"

const checkIcon = (name) => {
    if (name.includes("Documents")) return <FiFolder />
    else if (name.includes("Apps")) return <FiMenu />
    else if (name.includes("Videos")) return <FiVideo />
    else if (name.includes("Temporary")) return <FiTrash2 />
    else if (name.includes("Desktop")) return <FiAirplay />
    else if (name.includes("Other")) return <FiServer />
    else if (name.includes("Music")) return <FiMusic />
    else return <FiDatabase />
}


const StorageDetails = ({ diskSize, setTotal }) => {

    const percent = (num, total) => {
        // To calculate percentages => ((got / total) * 100)
        const percentage = (num / total) * 100
        return String(Math.round(percentage))
    }

    useEffect(() => {
        const total = data.details.reduce((acc, curr) => acc + curr.size, 0)
        setTotal(total)
        // eslint-disable-next-line 
    }, [diskSize])

    return (
        <div style={{ marginTop: 20 }}>
            {
                data.details.map((element, i) => {
                    const { name, size, info } = element
                    return (
                        <div key={i} className="storage-details">
                            <div className="icon">{checkIcon(name)}</div>
                            <div className="detail">
                                <div className="info flex">
                                    <div className="flex-left">{name}</div>
                                    <div className="flex-right">{size} GB</div>
                                </div>
                                <div className="progress-parent">
                                    <div
                                        className="progress"
                                        style={{ width: percent(size, diskSize / data.details.length) + "%" }}
                                    >
                                    </div>
                                </div>
                                <p>{info}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default StorageDetails;
