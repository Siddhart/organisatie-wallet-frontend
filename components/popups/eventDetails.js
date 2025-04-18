import React from 'react'
import KeyValue from '@/components/card-info/KeyValue'

const EventDetailsPopupContent = ({ event }) => {
  return (
    <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto pr-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 p-4 sticky top-0 bg-[#F5F4F9] -mr-4 pr-4">
          <img 
            src={event.image} 
            alt={event.name} 
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-[#445581]">{event.name}</h3>
            <p className="text-sm text-gray-600">{event.event}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg px-4 pb-4 shadow-sm">
          <h4 className="font-semibold text-[#445581] mb-4">Event Details</h4>
          <div className="flex flex-col gap-3">
            <KeyValue title="Time" value={event.time} />
            <KeyValue title="User" value={event.user} />
            <KeyValue title="Date" value={event.date} />
            <KeyValue title="URL" value={event.url} />
          </div>
        </div>

        <div className="bg-white rounded-lg px-4 pt-2 pb-24 shadow-sm">
          <h4 className="font-semibold text-[#445581] mb-4">Shared Information</h4>
          <div className="flex flex-col gap-3">
            {event.sharedData?.map((data, index) => (
              <KeyValue key={index} title={data.field} value={data.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPopupContent 