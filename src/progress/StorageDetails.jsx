import React from 'react'
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


const StorageDetails = ({ state }) => {

    const percent = (num) => {
        const x = (state * num * 3) / 100
        if (x > 98) return "95.0"
        else return String(Math.round(x))
    }

    return (
        <div style={{ marginTop: 20, cursor: "pointer" }}>
            {
                data.usageDetails.map((element, i) => {
                    const { name, size, info } = element
                    return (
                        <div key={i} className="storage-details flex">
                            <div className="icon">{checkIcon(name)}</div>
                            <div className="detail">
                                <div className="info flex">
                                    <div className="flex-left">{name}</div>
                                    <div className="flex-right">{percent(size)} GB</div>
                                </div>
                                <div className="progress-parent">
                                    <div className="progress" style={{ width: percent(size) + "%" }}></div>
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
