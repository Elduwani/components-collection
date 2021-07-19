import { useState } from 'react'
import Dropdown from '../Dropdown'
import ProgressBar from './ProgressBar'
import StorageDetails from "./StorageDetails"

const Storage = () => {
    const options = [256, 500, 1000, 2000, 4000]
    const [diskSize, setDiskSize] = useState(options[0])
    const [total, setTotal] = useState(0)
    const used = Math.ceil((total / diskSize) * 100)

    const digitize = (number) => number > 999 ? String(number).substring(0, 1) + "TB" : number + "GB"

    const menuList = options.map(option => (
        {
            label: digitize(option),
            onClick: () => setDiskSize(option)
        }
    ))

    return (
        <div className="p-8 max-w-md bg-gray-800 border border-gray-700 rounded-lg">
            <div className="flex justify-between mb-2">
                <p className="text-white">{digitize(total)} <span className="text-gray-400">/ {digitize(diskSize)}</span></p>
                <p className="text-gray-400">{used}%</p>
            </div>
            <ProgressBar width={used} />
            <StorageDetails diskSize={diskSize} setTotal={setTotal} />
            <Dropdown menuList={menuList} toTop>
                <div className="bg-gray-700 h-10 rounded-md grid place-items-center select-none">
                    Choose drive size &uarr;
                </div>
            </Dropdown>
        </div>
    );
}

export default Storage;
