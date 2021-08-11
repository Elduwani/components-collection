import Link from "next/link"

export default function Footer() {
    return (
        <footer className="flex items-end px-6 w-full h-24 border-gray-700 mx-auto max-w-4xl">
            <Link href="https://elduwani.dev">
                <a className="text-xs text-gray-500" target="_blank" rel="noopenner noreferrer">@elduwani</a>
            </Link>
        </footer>
    )
}
