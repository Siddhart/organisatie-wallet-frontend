import DeleteCard from '@/assets/deleteCard'
import CrossSvg from '@/assets/icons/CrossSvg'
import RightArrowSvg from '@/assets/icons/rightArrowSvg'
import { deleteCredential } from '@/helpers/credentials'
import React from 'react'
import { toast } from 'react-toastify'

const DeleteCredentialPopupContent = ({ setPopup, urn }) => {

    async function deleteCredentialFromWallet() {
        await deleteCredential(urn).then(res => {

            toast.success("Credential succesvol verwijderd", {
                onClose: () => {
                    window.location.href = "/cards"
                },
                autoClose: 2000
            })
        })
    }

    return <div className='p-4'>
        <DeleteCard />
        <div className='mt-4'>
            <p>Je staat op het punt deze credential te <b>verwijderen</b>. Je kunt een nieuwe credential aanvragen bij de issuer.</p>
        </div>

        <div className='absolute bottom-0 left-0 w-full grid grid-cols-2 gap-4 p-4'>
            <button onClick={() => setPopup(false)} className='border-[1px] border-[#383EDE] w-full h-fit gap-3 py-5 px-6 rounded-xl text-[#383EDE]'>
                <p className='font-bold text-base'>Terug</p>
            </button>
            <button onClick={() => deleteCredentialFromWallet()} className='bg-[#AB0065] border-[1px] border-[#AB0065] flex flex-row justify-center w-full h-fit gap-3 py-5 px-6 rounded-xl text-white'>
                <p className='font-bold text-base'>Verwijderen</p>
                <CrossSvg color='white' />
            </button>
        </div>
    </div>
}

export default DeleteCredentialPopupContent