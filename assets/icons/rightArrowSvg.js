import React from 'react'

const RightArrowSvg = ({color = "white"}) => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 11.5H16.67L11.08 5.91L12.5 4.5L20.5 12.5L12.5 20.5L11.09 19.09L16.67 13.5H4.5V11.5Z" fill={color} />
        </svg>
    )
}

export default RightArrowSvg