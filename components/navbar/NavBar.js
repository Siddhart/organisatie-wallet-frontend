import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

//assets
import CardSvg from '@/assets/icons/CardSvg'
import OrganisatieSvg from '@/assets/icons/OrganisatieSvg'
import PeopleSvg from '@/assets/icons/PeopleSvg'
import QrSvg from '@/assets/icons/QrSvg'
import SettingsSvg from '@/assets/icons/SettingsSvg'
import LogoSvg from '@/assets/logo'
import MyProfileSvg from '@/assets/icons/MyProfileSvg'

//packages
import autoAnimate from '@formkit/auto-animate'

//components
import NavButton from './NavButton'

const NavBar = () => {
    const [isHovering, setIsHovering] = useState(false)
    const [hoverTimer, setHoverTimer] = useState(null)

    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current, {
            duration: 500,
            easing: 'linear'
        })
    }, [parent])


    const handleMouseEnter = () => {
        setHoverTimer(setTimeout(() => setIsHovering(true), 1000))
    }

    const handleMouseLeave = () => {
        clearTimeout(hoverTimer)
        setIsHovering(false)
    }

    return (
        <div ref={parent} style={{
            width: isHovering ? 250 : 113,
            alignItems: isHovering ? "start" : 'center',
            transition: 'width 0.25s ease-in-out'
        }} className="h-full p-4 overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="bg-white w-full h-full rounded-2xl flex flex-col justify-between">
                {/* <div className="w-20 h-20 p-4 flex items-center justify-center"> */}
                <Link href="/" className='relative flex flex-row items-center w-full overflow-hidden'>
                    <div style={{
                        justifyContent: isHovering ? "start" : "center",

                    }} className='w-full h-16 flex items-center m-2 rounded-2xl'>
                        <span className='absolute left-4'>
                            <LogoSvg />
                        </span>
                    </div>
                    <div className='absolute left-[81px]  mt-1 flex flex-col text-[#383EDE]'>
                        <p className='font-semibold z-10 whitespace-nowrap'>NL wallet</p>
                        <p className=' z-10 whitespace-nowrap font-black text-xs -mt-1'>Business</p>
                    </div>
                </Link>
                {/* </div> */}

                <div className="flex flex-col gap-0 w-full">
                    <div className="w-full h-20 flex items-center justify-center">
                        <NavButton isHovering={isHovering} tooltip="Dashboard" route={"/"} svg={<OrganisatieSvg />} />
                    </div>
                    <div className="w-full h-20 flex items-center justify-center">
                        <NavButton isHovering={isHovering} tooltip="Credentials" route={"/cards"} svg={<CardSvg />} />
                    </div>
                    <div className="w-full h-20 flex items-center justify-center">
                        <NavButton isHovering={isHovering} tooltip="Gebruikers" route={"/users"} svg={<PeopleSvg />} />
                    </div>
                    {/* <div className="w-full h-20 flex items-center justify-center">
                        <NavButton isHovering={isHovering} tooltip="Flows" route={"/qr"} svg={<QrSvg />} />
                    </div> */}
                </div>

                <div className="flex flex-col gap-0">
                    <div className="w-full h-20 flex items-center justify-center">
                        <NavButton isHovering={isHovering} tooltip="Settings" route={"/settings"} svg={<SettingsSvg />} />
                    </div>
                    <div className="w-full h-20 flex items-center justify-center">
                        <NavButton isHovering={isHovering} tooltip="My Profile" route={"/users/myprofile"} svg={<MyProfileSvg />} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar