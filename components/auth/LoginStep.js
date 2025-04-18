import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import QRCode from 'react-qr-code'

//assets
import CardsSvg from '@/assets/cardsSvg'
import AndroidSvg from '@/assets/download/androidSvg'
import IosSvg from '@/assets/download/iosSvg'
import RightArrowSvg from '@/assets/icons/rightArrowSvg'
import LogoSvg from '@/assets/logo'
import OverheidSvg from '@/assets/overheidSvg'

//packages
import Cookies from 'universal-cookie'
import { loginWithEmailAndPassword } from '@/helpers/auth'

const LoginStep = ({ setStep }) => {
    const cookies = new Cookies(null, { path: '/' });
    const router = useRouter();
    const [showQR, setShowQR] = useState(false)
    const userName = "siddhartssg@gmail.com"
    const password = "Test123!"

    async function login() {
        try {
            const data = await loginWithEmailAndPassword(userName, password);

            if (data) {
                const sessionData = JSON.stringify(data);
                cookies.set("session", sessionData)
                // router.push('/dashboard');
            } else {
                console.error("Login failed: No data received");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    return (
        <div className='bg-[#F5F4F9] h-screen w-screen'>
            <div className='absolute top-4 left-4 w-20 h-20 bg-white flex items-center justify-center rounded-2xl'>
                <LogoSvg />
            </div>

            <div className='flex flex-row h-full w-full flex-1'>
                <div className='flex flex-col gap-8 h-full w-[58%] items-center justify-center'>
                    <CardsSvg />
                    <p className='w-1/2 text-center text-2xl'>Deel Eenvoudig en Snel bedrijfsgegevens met andere partijen!</p>
                </div>

                <div className='flex flex-col relative h-full w-auto flex-1 bg-white rounded-l-[32px]'>
                    <div className='w-full flex items-center justify-center'>
                        <OverheidSvg />
                    </div>

                    <div className='2xl:mt-16 mt-4 px-16 flex flex-col gap-8'>
                        <p className='font-bold text-4xl leading-snug'>Scan de QR-Code met de <br />NL-Wallet</p>
                        <p className='text-2xl leading-normal'>Open de NL-Wallet app en Scan de QR-Code met je persoonlijke wallet.</p>

                        <div onClick={() => login()} className='flex justify-center bg-black w-fit cursor-pointer'>
                            <QRCode
                                value="https://example.com/login"
                                level="H"
                                style={{ width: '200px', height: '200px' }}
                            />
                        </div>
                    </div>

                    <div className='absolute 2xl:bottom-16 bottom-4 left-16 flex flex-col gap-4'>
                        <p className='font-bold text-2xl'>Download de NL-Wallet app:</p>
                        <div className='flex flex-row gap-8'>
                            <IosSvg />
                            <AndroidSvg />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginStep