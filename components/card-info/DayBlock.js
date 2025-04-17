import React from 'react'

const DayBlock = ({ events = [] }) => {
    return <div className='w-full bg-white rounded-lg'>
        <div className='w-full px-4 py-2 font-bold'>
            <p className='text-[#152A62]'>Februari, 2025</p>
        </div>
        <div className='flex flex-col w-full'>
            {events.map((obj, i) => {
                return obj
            })}
        </div>
    </div>
}

export default DayBlock