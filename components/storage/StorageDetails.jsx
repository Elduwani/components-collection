import { useEffect } from 'react'
import { FiDatabase, FiFolder, FiMenu, FiVideo, FiTrash2, FiAirplay, FiServer, FiMusic } from "react-icons/fi"
import ProgressBar from './ProgressBar'
import data from "./storageData"

export default function StorageDetails({ diskSize, setTotal }) {
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
        <div className="py-6 space-y-4">
            {
                data.details.map((element, i) => {
                    const { name, size, info } = element
                    return (
                        <div key={i} className="flex space-x-4">
                            <div className="text-blue-500 mt-1">{checkIcon(name)}</div>
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between">
                                    <p>{name}</p>
                                    <p className="text-gray-400 text-sm">{size} GB</p>
                                </div>
                                <ProgressBar
                                    height="h-1.5"
                                    width={percent(size, diskSize / data.details.length)}
                                />
                                <p className="text-xs text-gray-400">{info}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

function checkIcon(name) {
    if (name.match(/documents/gi)) return <FiFolder />
    if (name.match(/apps/gi)) return <FiMenu />
    if (name.match(/videos/gi)) return <FiVideo />
    if (name.match(/temporary/gi)) return <FiTrash2 />
    if (name.match(/desktop/gi)) return <FiAirplay />
    if (name.match(/other/gi)) return <FiServer />
    if (name.match(/music/gi)) return <FiMusic />
    return <FiDatabase />
}