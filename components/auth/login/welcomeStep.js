import React from 'react'

//assets
import CardsSvg from '@/assets/cardsSvg'
import AndroidSvg from '@/assets/download/androidSvg'
import IosSvg from '@/assets/download/iosSvg'
import RightArrowSvg from '@/assets/icons/rightArrowSvg'
import LogoSvg from '@/assets/logo'
import OverheidSvg from '@/assets/overheidSvg'

const WelcomeStep = ({ setStep }) => {
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
                        <p className='font-bold text-4xl leading-snug'>Log in met je NL-Wallet om<br />toegang te krijgen tot je<br />organisatie wallet.</p>
                        <p className='text-2xl leading-normal'>Met de NL Wallet-app kunt u makkelijk inloggen en online gegevens delen met de overheid en andere aangesloten organisaties. </p>
                        <button onClick={() => setStep(1)} className='bg-[#383EDE] flex flex-row w-fit h-fit gap-3 py-5 px-6 rounded-xl text-white'>
                            <RightArrowSvg />
                            <p className='font-bold text-base'>Inloggen met NL-Wallet</p>
                        </button>
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

export default WelcomeStep