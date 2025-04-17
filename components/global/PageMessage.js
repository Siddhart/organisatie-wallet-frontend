import React, { useEffect, useRef, useState } from 'react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'

//packages
import autoAnimate from '@formkit/auto-animate'

const PageMessage = ({ title, message }) => {
    const [open, setOpen] = useState(false)
    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current, {
            duration: 250,
            easing: 'ease-in-out'
        })
    }, [parent])

    return (
        <div className='w-full h-fit flex-1'>
            <div 
                className='bg-white p-6 rounded-t-xl border border-gray-200 flex items-center justify-between shadow-sm'
                style={{
                    borderBottomLeftRadius: open ? 0 : '0.75rem',
                    borderBottomRightRadius: open ? 0 : '0.75rem'
                }}
            >
                <h1 className='text-2xl font-bold text-[#383EDE]'>{title}</h1>
                <button 
                    onClick={() => setOpen(!open)}
                    className='p-2 rounded-lg hover:bg-gray-50 transition-colors'
                >
                    {open ? <HiChevronUp className="w-5 h-5 text-[#383EDE]" /> : <HiChevronDown className="w-5 h-5 text-[#383EDE]" />}
                </button>
            </div>
            <div 
                ref={parent} 
                style={{
                    border: open && "1px solid #e5e7eb"
                }}
                className='bg-gray-50 rounded-b-xl h-fit overflow-hidden shadow-sm'
            >
                {open && (
                    <div className='p-6'>
                        <p className='text-gray-600 leading-relaxed'>{message}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PageMessage