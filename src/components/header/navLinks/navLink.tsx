'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./navLink.module.css"

interface iItem {
    name:string,
    link:string
}
interface NavLinkProps {
    item: iItem;
}

export const NavLink: React.FC<NavLinkProps> = ({ item }) => {
    const pathName = usePathname();
    return(
        <Link
            href={item.link}
            className={ `${styles.container } ${pathName === item.link && styles.active}`}>
                {item.name}
        </Link>
    )
}