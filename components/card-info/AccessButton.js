import React, { useState } from 'react'

//assets
import CheckSvg from '@/assets/icons/CheckSvg'
import CrossSvg from '@/assets/icons/CrossSvg'

//packages
import { toast } from 'react-toastify'

const AccessButton = ({ value, selected }) => {
    const [select, setSelect] = useState(selected)

    function changeState() {
        setSelect(!select)
        toast.success(`${value} heeft nu ${select ? "geen" : ""} toegang tot deze credential`, {
            closeButton: false,
            autoClose: 2000
        })
    }

    return <button onClick={changeState} style={{
        backgroundColor: select ? "#383EDE" : "white",
        border: "2px solid",
        borderColor: select ? "#383EDE" : "#AB0065"
    }} className='flex flex-row gap-4 items-center px-4 py-2 rounded-full w-fit text-white font-bold h-10'>
        <p style={{
            color: select ? "white" : "#AB0065"
        }}>{value}</p>
        <span>{select ? <CheckSvg /> : <CrossSvg />}</span>
    </button>
}

export default AccessButton