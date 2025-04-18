import React from 'react'
import EventDetailsPopupContent from '@/components/popups/eventDetails'
import Popup from '@/components/global/Popup'

//assets
import ChevronRight from '@/assets/icons/ChevronRight'

const CardEvent = ({ name, event, time, user, image, date, url, sharedData }) => {
  const [showEventDetails, setShowEventDetails] = React.useState(false)

  return (
    <>
      <div 
        className='w-full p-4 h-28 flex flex-row justify-between items-center border-t-[1px] cursor-pointer hover:bg-gray-50 transition-colors'
        onClick={() => setShowEventDetails(true)}
      >
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

      {showEventDetails && (
        <Popup 
          setPopup={setShowEventDetails} 
          title="Event Details" 
          content={
            <EventDetailsPopupContent 
              event={{ name, event, time, user, image, date, url, sharedData }} 
            />
          } 
        />
      )}
    </>
  )
}

export default CardEvent