import React from 'react'

const KeyValue = ({ title, value }) => {
    const formattedTitle = title.replace(/([A-Z])/g, (match, p1) => {
        const prevChar = title.charAt(title.indexOf(match) - 1);
        return prevChar === prevChar.toLowerCase() ? ` ${p1}` : p1;
      }).trim();
      
      return <div className='flex flex-col break-all'>
        <p className='text-sm break-all capitalize'>{formattedTitle}</p>
        <p className='text-base font-bold'>{value}</p>
      </div>
}

export default KeyValue