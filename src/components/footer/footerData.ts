import LinkedIn from '../../../public/linkedin.png'
import Github from '../../../public/github.png'
import Telegram from '../../../public/telegram.png'
import { StaticImageData } from 'next/image'

interface IFooterDate {
    name:string,
    src:StaticImageData,
    link:string,
}

export const FooterDate:Array<IFooterDate> = [
    {
        name:'LinkedIn',
        src:LinkedIn,
        link:'https://www.linkedin.com/in/1-maxim-popov/',
    },
    {
        name:'Github',
        src:Github,
        link:'https://github.com/Maksimpv1',
    },
    {
        name:'Telegram',
        src:Telegram,
        link:'https://t.me/Popov_Max',
    },

]