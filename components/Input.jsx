export default function Input({ ref, onChange }) {
    return (
        <input
            type={type ?? "text"}
            ref={ref}
            onChange={onChange}
            className="flex-1 bg-transparent"
            placeholder={placeholder}
        />
    )
}
