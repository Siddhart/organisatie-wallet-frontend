import React from 'react'

//assets
import CardsSvg from '@/assets/cardsSvg'
import RightArrowSvg from '@/assets/icons/rightArrowSvg'
import LogoSvg from '@/assets/logo'
import OverheidSvg from '@/assets/overheidSvg'

const EmailStep = ({ setStep, email, setEmail }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        setStep(3)
    }

    return (
        <div className='bg-[#F5F4F9] h-screen w-screen'>
            <div className='absolute top-4 left-4 w-20 h-20 bg-white flex items-center justify-center rounded-2xl'>
                <LogoSvg />
            </div>

            <div className='flex flex-row h-full w-full flex-1'>
                <div className='flex flex-col gap-8 h-full w-[58%] items-center justify-center'>
                    <CardsSvg />
                    <p className='w-1/2 text-center text-2xl'>Create your WebSloth Business Wallet</p>
                </div>

                <div className='flex flex-col relative h-full w-auto flex-1 bg-white rounded-l-[32px]'>
                    <div className='w-full flex items-center justify-center'>
                        <OverheidSvg />
                    </div>

                    <div className='2xl:mt-16 mt-4 px-16 flex flex-col gap-8'>
                        <p className='font-bold text-4xl leading-snug'>Enter your email</p>
                        <p className='text-2xl leading-normal'>Please provide your email address. An admin will review your request and grant access to your WebSloth Business Wallet.</p>
                        
                        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className='w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#383EDE]'
                                required
                            />
                            <button type="submit" className='bg-[#383EDE] flex flex-row w-fit h-fit gap-3 py-5 px-6 rounded-xl text-white'>
                                <RightArrowSvg />
                                <p className='font-bold text-base'>Continue</p>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailStep 