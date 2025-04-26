import React from 'react'

//assets
import CardsSvg from '@/assets/cardsSvg'
import RightArrowSvg from '@/assets/icons/rightArrowSvg'
import LogoSvg from '@/assets/logo'
import OverheidSvg from '@/assets/overheidSvg'

const OnboardingStep = ({ setStep }) => {
    return (
        <div className='bg-[#F5F4F9] h-screen w-screen'>
            <div className='absolute top-4 left-4 w-20 h-20 bg-white flex items-center justify-center rounded-2xl'>
                <LogoSvg />
            </div>

            <div className='flex flex-row h-full w-full flex-1'>
                <div className='flex flex-col gap-8 h-full w-[58%] items-center justify-center'>
                    <CardsSvg />
                    <p className='w-1/2 text-center text-2xl'>Welkom in de WebSloth Business Wallet! Creeër uw account om verder te gaan.</p>
                </div>

                <div className='flex flex-col relative h-full w-auto flex-1 bg-white rounded-l-[32px]'>
                    <div className='w-full flex items-center justify-center'>
                        <OverheidSvg />
                    </div>

                    <div className='2xl:mt-16 mt-4 px-16 flex flex-col gap-8'>
                        <p className='font-bold text-4xl leading-snug'>Creeër uw Business Wallet Account</p>
                        <p className='text-2xl leading-normal'>U staat op het punt een account aan te maken voor <b>WebSloth</b>. Met dit account kunt u:</p>
                        <ul className='text-xl leading-normal list-disc pl-6 space-y-4'>
                            <li>Uw bedrijfsgegevens beheren</li>
                            <li>Veilig inloggen met uw NL-Wallet</li>
                            <li>Uw wallet via dit dashboard beheren</li>
                        </ul>
                        <p className='text-xl leading-normal'>Een beheerder zal uw verzoek beoordelen en u toegang verlenen tot uw WebSloth account.</p>
                        <button onClick={() => setStep(2)} className='bg-[#383EDE] flex flex-row w-fit h-fit gap-3 py-5 px-6 rounded-xl text-white'>
                            <RightArrowSvg />
                            <p className='font-bold text-base'>Doorgaan naar QR Code</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnboardingStep 