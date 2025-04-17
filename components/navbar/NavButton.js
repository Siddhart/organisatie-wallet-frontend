import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavButton = ({ svg, route, tooltip, isHovering }) => {
    const [selected, setSelected] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (router.route === route || router.route.startsWith(route + '/')) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [route, router]);

    return <Link href={route} className='relative flex flex-row items-center w-full overflow-hidden'>
        <div style={{
            background: selected ? "#383EDE" : "white",
            justifyContent: isHovering ? "start" : "center",

        }} className='w-full h-16 flex items-center  m-2 rounded-2xl'>
            <span className='absolute left-6'>
                {React.cloneElement(svg, { color: selected ? "white" : "#383EDE" })}
            </span>
        </div>
        <div className='absolute left-20 mt-1'>
            <p style={{
                color: selected ? "white" : "#383EDE"
            }} className='font-semibold z-10'>{tooltip}</p>
        </div>
    </Link>
}

export default NavButton