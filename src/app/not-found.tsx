import Link from "next/link";

export default function NotFound () {
    return(
        <div style={{ 
            margin: "150px auto", 
            display: "flex" , 
            alignItems: "center", 
            justifyContent: "center",
            flexDirection: "column" }}>
            404 Not Found
            <p><Link href="/" style={{ borderBottom: "1px solid black"}}>Return Home </Link></p>
        </div>
    )
}