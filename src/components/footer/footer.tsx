'use client'

import Image from 'next/image';
import { FooterDate } from '@/components/footer/footerData'
import { FooterContain, FooterLink } from './footerStyles';

export const Footer = () => {
    return (
        <FooterContain>
            <ul style={{ display:'flex' }}>
                {
                    FooterDate.map((item, index)=>(
                        <li key={ index } style={{ margin:'20px' }}> <FooterLink href={ item.link } target='_blank' >
                        <Image src={ item.src} style={{ width:'30px', height:'30px' }} alt={ item.name } /> 
                        </FooterLink></li>
                    ))
                }
            </ul>
        </FooterContain>
    )
}