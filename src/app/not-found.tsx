import Link from "next/link";

export default function NotFound () {
    return(
        <div>
            404 Not Found
            <p><Link href="/">Return Home </Link></p>
        </div>
    )
}