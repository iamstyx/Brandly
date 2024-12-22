import { Image, PencilRuler } from 'lucide-react'
import React, { useState } from 'react'

function SideNav({selectedIndex}) {
    const menuList=[
        {
            id:1,
            name:'Icon',
            icon:PencilRuler
        },
        {
            id:2,
            name:'Background',
            icon:Image
        }
    ]

    const [activeIndex,setActiveIndex]=useState(0);
    return (
        <div className='lg:border-r lg:h-screen bg-gray-50'>
            <div className='py-2 lg:py-4 flex lg:flex-col'>
                {menuList.map((menu,index)=>(
                    <div
                        onClick={()=>{setActiveIndex(index);
                        selectedIndex(index)}} 
                        className={`p-3 text-sm font-medium px-4 lg:px-7 text-gray-600
                        cursor-pointer flex items-center gap-3 flex-1 lg:flex-none justify-center lg:justify-start
                        hover:bg-gray-100 transition-all
                        ${activeIndex==index ? 'bg-white shadow-sm lg:border-r-2 border-primary text-primary' : ''}
                        `}
                        key={index}>
                        <menu.icon className="w-4 h-4"/>
                        <span className="hidden lg:inline">{menu.name}</span>
                    </div>
                ))}
            </div>
            <div className='hidden lg:flex items-center justify-center'>
                <h2 className='text-xs text-gray-400 fixed bottom-8'>
                    Made with ❤️ <span className='text-primary font-medium'></span>
                </h2>
            </div>
        </div>
    )
}

export default SideNav