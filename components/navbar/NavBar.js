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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

    // Mobile menu content
    const MobileMenu = () => (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center gap-2">
                        <LogoSvg />
                        <div className="flex flex-col">
                            <p className="font-semibold text-[#383EDE]">NL wallet</p>
                            <p className="font-black text-xs text-[#383EDE]">Business</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#383EDE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="flex flex-col gap-2">
                        <Link 
                            href="/" 
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 active:bg-gray-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <OrganisatieSvg color="#383EDE" />
                            <span className="text-lg font-semibold">Dashboard</span>
                        </Link>
                        <Link 
                            href="/cards" 
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 active:bg-gray-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <CardSvg color="#383EDE" />
                            <span className="text-lg font-semibold">Credentials</span>
                        </Link>
                        <Link 
                            href="/users" 
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 active:bg-gray-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <PeopleSvg color="#383EDE" />
                            <span className="text-lg font-semibold">Gebruikers</span>
                        </Link>
                        <Link 
                            href="/settings" 
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 active:bg-gray-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <SettingsSvg color="#383EDE" />
                            <span className="text-lg font-semibold">Settings</span>
                        </Link>
                        <Link 
                            href="/users/myprofile" 
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 active:bg-gray-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MyProfileSvg color="#383EDE" />
                            <span className="text-lg font-semibold">My Profile</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="fixed top-4 left-4 z-40 lg:hidden p-2 rounded-lg bg-white shadow-lg hover:bg-gray-100 active:bg-gray-200"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21M3 6H21M3 18H21" stroke="#383EDE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && <MobileMenu />}

            {/* Desktop Navigation */}
            <div 
                ref={parent} 
                style={{
                    width: isHovering ? 250 : 113,
                    alignItems: isHovering ? "start" : 'center',
                    transition: 'width 0.25s ease-in-out'
                }} 
                className="hidden lg:block h-full p-4 overflow-hidden" 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
            >
                <div className="bg-white w-full h-full rounded-2xl flex flex-col justify-between">
                    <Link href="/" className='relative flex flex-row items-center w-full overflow-hidden'>
                        <div style={{
                            justifyContent: isHovering ? "start" : "center",
                        }} className='w-full h-16 flex items-center m-2 rounded-2xl'>
                            <span className='absolute left-4'>
                                <LogoSvg />
                            </span>
                        </div>
                        <div className='absolute left-[81px] mt-1 flex flex-col text-[#383EDE]'>
                            <p className='font-semibold z-10 whitespace-nowrap'>NL wallet</p>
                            <p className='z-10 whitespace-nowrap font-black text-xs -mt-1'>Business</p>
                        </div>
                    </Link>

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
        </>
    )
}

export default NavBar