import DeleteCard from '@/assets/deleteCard'
import CrossSvg from '@/assets/icons/CrossSvg'
import { deleteCredential } from '@/helpers/credentials'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const DeleteCredentialPopupContent = ({ setPopup, urn }) => {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteCredentialFromWallet() {
        setIsLoading(true)
        try {
            await deleteCredential(urn)
            toast.success("Credential succesvol verwijderd", {
                onClose: () => {
                    window.location.href = "/cards"
                },
                autoClose: 2000
            })
        } catch (error) {
            toast.error("Kon de credential niet verwijderen. Probeer het opnieuw.")
            setIsLoading(false)
        }
    }

    return <div className='p-4'>
        <div className='animate-fade-in'>
            <DeleteCard />
            <div className='mt-4'>
                <p>Je staat op het punt deze credential te <b>verwijderen</b>. Je kunt een nieuwe credential aanvragen bij de issuer.</p>
            </div>
        </div>

        <div className='absolute bottom-0 left-0 w-full grid grid-cols-2 gap-4 p-4'>
            <button 
                onClick={() => setPopup(false)} 
                className='border-[1px] border-[#383EDE] w-full h-fit gap-3 py-5 px-6 rounded-xl text-[#383EDE] hover:bg-[#383EDE]/5 transition-colors'
            >
                <p className='font-bold text-base'>Terug</p>
            </button>
            <button 
                onClick={deleteCredentialFromWallet} 
                disabled={isLoading}
                className={`bg-[#AB0065] border-[1px] border-[#AB0065] flex flex-row justify-center w-full h-fit gap-3 py-5 px-6 rounded-xl text-white hover:bg-[#900055] transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                    <>
                        <p className='font-bold text-base'>Verwijderen</p>
                        <CrossSvg color='white' />
                    </>
                )}
            </button>
        </div>
    </div>
}

export default DeleteCredentialPopupContent