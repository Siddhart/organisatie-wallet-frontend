import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

//assets
import DeleteSvg from '@/assets/icons/DeleteSvg'

//components
import AccessButton from '@/components/card-info/AccessButton'
import KeyValue from '@/components/card-info/KeyValue'
import DayBlock from '@/components/card-info/DayBlock'
import CardEvent from '@/components/card-info/CardEvent'

//helpers
import { deleteCredential, getCredentialData } from '@/helpers/credentials'
import CredentialCard from '@/components/global/CredentialCard'
import Popup from '@/components/global/Popup'
import DeleteCredentialPopupContent from '@/components/popups/deleteCredential'

const CardInfo = () => {
  const router = useRouter()
  const { id } = router.query

  const [credential, setCredential] = useState(null)

  const [deleteCredentialPopup, setDeleteCredentialPopup] = useState(false)

  useEffect(() => {
    const fetchCredentialData = async () => {
      let credentialDataResponse = await getCredentialData(id)

      setCredential(credentialDataResponse)
      // console.log(credentialDataResponse);
    }

    if (id) fetchCredentialData()
  }, [router])

  return (
    <div className='relative w-full flex flex-row gap-6 overflow-hidden'>

      {deleteCredentialPopup && <Popup setPopup={setDeleteCredentialPopup} title={"Credential Verwijderen"} content={<DeleteCredentialPopupContent urn={id} />}></Popup>}

      <div className='flex flex-col h-screen flex-1 max-w-[350px] rounded-t-md bg-[#F5F4F9]'>
        <div className='sticky top-0'>
          <div className=' max-w-[350px] bg-[#383EDE] p-4 text-white text-3xl font-bold  flex items-center justify-between rounded-t-md'>
            <p>Kaartgegevens</p>
          </div>
          <div className='p-4 w-full'>
            {credential && <CredentialCard showBorder shouldLink={false} key={1} data={credential} />}
          </div>
        </div>

        <div className='relative flex flex-col gap-12 pb-4 mb-40 h-full overflow-scroll'>


          <div>
            <p className='font-bold sticky top-0 bg-[#F5F4F9] text-xl text-[#445581] px-4'>Credential Data</p>
            <div className='flex flex-col gap-6 p-4'>
              {credential?.parsedDocument?.credentialSubject && Object.keys(credential?.parsedDocument?.credentialSubject)?.map((key, i) => {
                let keyObj = [key, credential?.parsedDocument?.credentialSubject[key]]
                if (credential?.parsedDocument?.credentialSubject[key].length == undefined) return

                return <KeyValue title={key} value={keyObj[1]} />
              })}
            </div>
          </div>

          <div>
            <p className='font-bold sticky top-0 bg-[#F5F4F9] text-xl text-[#445581] px-4'>Issuer Data</p>
            <div className='flex flex-col gap-6 p-4'>
              <KeyValue title={"IssuerName"} value={credential?.parsedDocument?.issuer?.name} />
              <KeyValue title={"Id"} value={credential?.parsedDocument?.issuer?.id} />
            </div>
          </div>
        </div>


        <div className='absolute bottom-0 w-full h-fit p-4 max-w-[350px] '>
          <button onClick={() => setDeleteCredentialPopup(true)} className='border-2 bg-[#AB0065] w-full h-full flex items-center justify-center gap-3 py-3 rounded-2xl'>
            <DeleteSvg />
            <p className='text-white text-base font-bold'>Kaart Verwijderen</p>
          </button>
        </div>
      </div>

      <div className='flex flex-1 flex-col justify-between w-full h-full gap-6'>
        <div className='w-full h-36 bg-[#F5F4F9] rounded-md'>
          <div className='w-full h-16 bg-[#383EDE] p-4 text-white text-3xl font-bold  flex items-center justify-between rounded-t-md'>
            <p>Toegang Wijzigen</p>
          </div>

          <div id='overflowDiv' className='flex flex-row gap-4 flex-1 h-20 items-center p-4 w-10'>
            <AccessButton value="Eigenaar" selected={true} />
            <AccessButton value="Developer" selected={true} />
            <AccessButton value="HR" selected={false} />
          </div>
        </div>
        <div className='flex flex-col flex-1 w-full h-full '>
          <div className='w-full h-fit bg-[#383EDE] p-4 text-white text-3xl font-bold  flex items-center justify-between rounded-t-md'>
            <p>Recente Activiteiten</p>
          </div>

          <div className='flex flex-col gap-6 p-4 w-full bg-[#F5F4F9] rounded-b-md overflow-scroll h-[60vh]'>
            <DayBlock events={[
              <CardEvent name={"Belastingdienst"} event={"Inloggen"} time={"12:00"} user={"Siddhart Ghogli"} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKguQbW4_cBy9UyMp0dIOsPQ1kDhZAOTDZhA&s"} />,
              <CardEvent name={"Sligro"} event={"Gegevens Gedeeld"} time={"12:00"} user={"Siddhart Ghogli"} image={"https://www.sligrofoodgroup.nl/sites/default/files/download/sligro-logo.jpeg"} />,
            ]} />
            <DayBlock events={[
              <CardEvent name={"Belastingdienst"} event={"Inloggen"} time={"12:00"} user={"Siddhart Ghogli"} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKguQbW4_cBy9UyMp0dIOsPQ1kDhZAOTDZhA&s"} />,
              <CardEvent name={"Sligro"} event={"Gegevens Gedeeld"} time={"12:00"} user={"Siddhart Ghogli"} image={"https://www.sligrofoodgroup.nl/sites/default/files/download/sligro-logo.jpeg"} />,
            ]} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardInfo