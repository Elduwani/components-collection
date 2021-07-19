interface Props {
    inputRef: React.MutableRefObject<any>,
    onChange: (e?: any) => void,
    placeholder: string,
    className: string,
    type?: string
}
export default function Input({ inputRef, onChange, type, placeholder, className }: Props) {
    return (
        <input
            ref={inputRef}
            type={type ?? "text"}
            onChange={onChange}
            placeholder={placeholder}
            className={`
                h-12 block w-full border-0 rounded-lg placeholder-gray-400 text-gray-600 bg-transparent
                ${className}
            `}
        />
    )
}
