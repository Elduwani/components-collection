export default function ProgressBar({ height, width }) {
    return (
        <div className={`${height ?? "h-6"} text-white flex bg-blue-900 overflow-hidden rounded`}>
            <div className={`h-full bg-blue-600 transition-all`} style={{ width: width + "%" }}></div>
        </div>
    )
}
