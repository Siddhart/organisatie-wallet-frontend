import CrossSvg from '@/assets/icons/CrossSvg'
import React, { useState } from 'react'

const Popup = ({ title, content, setPopup }) => {

    return (
        <div className='z-[100] w-full h-full fixed top-0 left-0 flex items-center justify-center'>
            <div className='bg-black w-full h-full absolute top-0 left-0 bg-opacity-50' onClick={() => setPopup(false)}/>
            <div className='relative w-[500px] aspect-[5/6.5] bg-white rounded-md overflow-hidden flex flex-col'>
                <div>
                    <div className='bg-[#383EDE] p-4 text-white w-full flex items-center justify-between'>
                        <p className='text-3xl font-bold'>{title}</p>
                        <button onClick={() => setPopup(false)}>
                            <CrossSvg color='white' />
                        </button>
                    </div>
                </div>

                {/* CONTENT */}
                <div className='h-full w-full'>
                    {React.cloneElement(content, { setPopup })}
                </div>
            </div>
        </div>
    )
}

export default Popup