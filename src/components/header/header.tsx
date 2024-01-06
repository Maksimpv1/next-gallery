'use client'

import { useState } from "react"
import Image from 'next/image';
import { HeaderContainer, HeaderList } from "./styles"
import { TextField } from "@mui/material"
import logo from '../../../public/logo.jpg'

export const Header = () => {
    const [active, setActive] = useState("")
    const [toggle, setToggle] = useState(false)
    return (
        <HeaderContainer><i></i>
            <div>
                <Image src={ logo } style={{ width:'80px', height:'60px' }} alt="Logo"/>
            </div>
            <ul style={{ display:'flex' }}>
                <HeaderList>Main</HeaderList>
                <HeaderList>Profile</HeaderList>
            </ul>
            <TextField fullWidth label="Search" id="fullWidth" style={{ width: '300px', height: '50px' }}/>
        </HeaderContainer>
    )
}