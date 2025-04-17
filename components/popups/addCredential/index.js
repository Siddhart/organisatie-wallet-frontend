import RightArrowSvg from '@/assets/icons/rightArrowSvg'
import NewCardsSvg from '@/assets/newCards'
import { addCredential, getDid, getIssuerMetadata, resolveCredential } from '@/helpers/credentials'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddCredentialPopupContent = ({ setPopup }) => {
    const [step, setStep] = useState(0)

    return (
        <div className='relative w-full h-full'>
            {step === 0 && <Step1 setPopup={setPopup} setStep={setStep} />}
            {step === 1 && <Step2 setPopup={setPopup} setStep={setStep} />}
        </div>
    )
}

const Step1 = ({ setPopup, setStep }) => {
    return <div className='p-4'>
        <NewCardsSvg />
        <div className='mt-4'>
            <p>Om nieuwe credentials toe te voegen, kun je de <b>NL-wallet</b> gebruiken of de <b>Offer URL</b> invoeren op de volgende pagina.</p>
        </div>

        <div className='absolute bottom-0 left-0 w-full grid grid-cols-2 gap-4 p-4'>
            <button onClick={() => setPopup(false)} className='border-[1px] border-[#AB0065] w-full h-fit gap-3 py-5 px-6 rounded-xl text-[#AB0065]'>
                <p className='font-bold text-base'>Stoppen</p>
            </button>
            <button onClick={() => setStep(1)} className='bg-[#383EDE] border-[1px] border-[#383EDE] flex flex-row justify-center w-full h-fit gap-3 py-5 px-6 rounded-xl text-white'>
                <p className='font-bold text-base'>Volgende Stap</p>
                <RightArrowSvg />
            </button>
        </div>
    </div>
}

const Step2 = ({ setPopup, setStep }) => {
    const [url, setUrl] = useState('');
    const [credentialData, setCredentialData] = useState(null)

    async function resolveCard() {
        await resolveCredential(url).then(async credentialDataOfferResponse => {
            const issuer = credentialDataOfferResponse.credential_issuer
            const configuration = credentialDataOfferResponse.credential_configuration_ids[0]

            const issuerMetadata = await getIssuerMetadata(issuer)
            const credentialName = issuerMetadata.credential_configurations_supported[configuration].credential_definition.type.pop()

            await getDid().then(didData => {
                let did = didData[0].did
                console.log(did);

                setCredentialData(() => ({
                    issuer_name: issuer,
                    credential_name: credentialName,
                    openid_credential_offer: url,
                    did: did
                }))
            })

        });
    }

    async function addCard() {
        let res = await addCredential(credentialData.did, credentialData.openid_credential_offer)

        toast.success("Credential succesvol toegevoegd",{
            onClose: () => {
                window.location.href = `/cards/info/${res[0].id}`
            },
            autoClose: 2000
        })   
    }

    const formattedTitle = (title) => title.replace(/([A-Z])/g, (match, p1) => {
        const prevChar = title.charAt(title.indexOf(match) - 1);
        return prevChar === prevChar.toLowerCase() ? ` ${p1}` : p1;
    }).trim();

    return <div className='flex-1 h-full p-4'>
        {!credentialData && <div>
            <p>Voer de Offer URL in</p>
            <input value={url} onChange={(e) => setUrl(e.target.value)} className='mt-2 h-10 w-full border-[1px] border-black rounded-md focus:outline-none px-2' />
        </div>}


        {credentialData && <div className='relative w-full bg-[#F1F5FF] rounded-2xl flex flex-col justify-between border-[1px] border-black aspect-video p-8'>
            <p className='font-bold text-2xl text-[#152A62]'>{formattedTitle(credentialData?.credential_name)}</p>

            <div className='flex flex-col items-start justify-center'>
                <p className='text-sm break-all capitalize'>Issuer</p>
                <p className='text-base font-bold'>{credentialData.issuer_name}</p>
            </div>
        </div>}

        <div className='absolute bottom-0 left-0 w-full grid grid-cols-2 gap-4 p-4'>
            <button onClick={() => setStep(0)} className='border-[1px] border-[#AB0065] w-full h-fit gap-3 py-5 px-6 rounded-xl text-[#AB0065]'>
                <p className='font-bold text-base'>Vorige Stap</p>
            </button>
            <button onClick={credentialData ? addCard : resolveCard} className='bg-[#383EDE] border-[1px] border-[#383EDE] flex flex-row justify-center w-full h-fit gap-3 py-5 px-6 rounded-xl text-white'>
                <p className='font-bold text-base'>{credentialData ? "Toevoegen" : "Volgende Stap"}</p>
                <RightArrowSvg />
            </button>
        </div>
    </div>
}

export default AddCredentialPopupContent