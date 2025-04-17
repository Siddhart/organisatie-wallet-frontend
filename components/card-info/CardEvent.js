import React from 'react'

//assets
import ChevronRight from '@/assets/icons/ChevronRight'

const CardEvent = ({ name, event, time, user, image }) => {
    return <div className='w-full p-4 h-28 flex flex-row justify-between items-center border-t-[1px]'>
    <div className='flex flex-row items-center gap-4'>
      <img src={image} className='bg-black rounded-md w-10 h-10 border-[1px] border-black' />
      <div className='flex flex-col justify-center'>
        <p className='text-base font-bold text-[#152A62]'>{name}</p>
        <p className='text-sm text-[#152A62]'>{event}</p>
        <p className='text-xs text-[#445581]'>{time} door {user}</p>
      </div>
    </div>
    <ChevronRight />
  </div>
}

export default CardEvent