import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

//assets
import DeleteSvg from '@/assets/icons/DeleteSvg'

//components
import KeyValue from '@/components/card-info/KeyValue'
import DayBlock from '@/components/card-info/DayBlock'
import CardEvent from '@/components/card-info/CardEvent'
import CredentialCard from '@/components/global/CredentialCard'
import Popup from '@/components/global/Popup'
import DeleteCredentialPopupContent from '@/components/popups/deleteCredential'

//helpers
import { deleteCredential, getCredentialData } from '@/helpers/credentials'

const CardInfo = () => {
  const router = useRouter()
  const { id } = router.query

  const [credential, setCredential] = useState(null)
  const [deleteCredentialPopup, setDeleteCredentialPopup] = useState(false)
  const [activeTab, setActiveTab] = useState('data')
  const [unseenActivitiesCount, setUnseenActivitiesCount] = useState(3)
  const [hasUnseenActivities, setHasUnseenActivities] = useState(true)
  const [rolePermissions, setRolePermissions] = useState({
    Eigenaar: { hasAccess: true, fields: {} },
    Developer: { hasAccess: true, fields: {} },
    HR: { hasAccess: false, fields: {} }
  })

  useEffect(() => {
    const fetchCredentialData = async () => {
      let credentialDataResponse = await getCredentialData(id)
      setCredential(credentialDataResponse)

      // Initialize field permissions for each role
      if (credentialDataResponse?.parsedDocument?.credentialSubject) {
        const fields = Object.entries(credentialDataResponse.parsedDocument.credentialSubject)
          .filter(([_, value]) => value.length !== undefined)
          .map(([key]) => key)

        const initialPermissions = {
          Eigenaar: { hasAccess: true, fields: Object.fromEntries(fields.map(field => [field, true])) },
          Developer: { hasAccess: true, fields: Object.fromEntries(fields.map(field => [field, true])) },
          HR: { hasAccess: false, fields: Object.fromEntries(fields.map(field => [field, false])) }
        }
        setRolePermissions(initialPermissions)
      }
    }

    if (id) fetchCredentialData()
  }, [router])

  const toggleRoleAccess = (role) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        hasAccess: !prev[role].hasAccess,
        fields: Object.fromEntries(
          Object.entries(prev[role].fields).map(([field]) => [field, !prev[role].hasAccess])
        )
      }
    }))
  }

  const toggleFieldAccess = (role, field) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        fields: {
          ...prev[role].fields,
          [field]: !prev[role].fields[field]
        }
      }
    }))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'data':
        return (
          <div className='flex flex-col gap-6 p-4'>
            <p className='font-bold text-xl text-[#445581]'>Credential Data</p>
            <div className='flex flex-col gap-6'>
              {credential?.parsedDocument?.credentialSubject && Object.entries(credential?.parsedDocument?.credentialSubject)?.map(([key, value]) => {
                if (value.length == undefined) return null
                return <KeyValue title={key} value={value} />
              })}
            </div>
          </div>
        )
      case 'permissions':
        return (
          <div className='flex flex-col gap-6 p-4'>
            <p className='font-bold text-xl text-[#445581]'>Access Control</p>
            <div className='flex flex-col gap-6'>
              {Object.entries(rolePermissions).map(([role, { hasAccess, fields }]) => (
                <div key={role} className='bg-white rounded-lg p-4 shadow-sm'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-semibold text-[#445581]'>{role}</h3>
                      <button
                        onClick={() => toggleRoleAccess(role)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${hasAccess
                            ? 'bg-[#383EDE] text-white hover:bg-[#2e33b8]'
                            : 'bg-[#AB0065] text-white hover:bg-[#8a0052]'
                          }`}
                      >
                        {hasAccess ? 'Access Granted' : 'No Access'}
                      </button>
                    </div>
                    {hasAccess && (
                      <div className='border-t border-gray-100 pt-4'>
                        <p className='text-sm text-gray-600 mb-3'>Select which fields this role can access:</p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                          {credential?.parsedDocument?.credentialSubject &&
                            Object.entries(credential.parsedDocument.credentialSubject)
                              .filter(([_, value]) => value.length !== undefined)
                              .map(([field]) => (
                                <div key={field} className='flex items-center gap-3'>
                                  <input
                                    type="checkbox"
                                    id={`${role}-${field}`}
                                    checked={fields[field] || false}
                                    onChange={() => toggleFieldAccess(role, field)}
                                    className='h-4 w-4 text-[#383EDE] focus:ring-[#383EDE] border-gray-300 rounded'
                                  />
                                  <label htmlFor={`${role}-${field}`} className='text-sm text-gray-700'>
                                    {field}
                                  </label>
                                </div>
                              ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'activity':
        return (
          <div className='flex flex-col gap-6 p-4'>
            <p className='font-bold text-xl text-[#445581]'>Recent Activity</p>
            <div className='flex flex-col gap-6'>
              <DayBlock events={[
                <CardEvent
                  name={"Belastingdienst"}
                  event={"Inloggen"}
                  time={"12:00"}
                  user={"Siddhart Ghogli"}
                  image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKguQbW4_cBy9UyMp0dIOsPQ1kDhZAOTDZhA&s"}
                  date={"2024-03-20"}
                  url={"https://belastingdienst.nl"}
                  sharedData={[
                    { field: "Name", value: "Siddhart Ghogli" },
                    { field: "BSN", value: "123456789" },
                    { field: "Address", value: "Sample Street 123" }
                  ]}
                />,
                <CardEvent
                  name={"Sligro"}
                  event={"Gegevens Gedeeld"}
                  time={"12:00"}
                  user={"Siddhart Ghogli"}
                  image={"https://www.sligrofoodgroup.nl/sites/default/files/download/sligro-logo.jpeg"}
                  date={"2024-03-20"}
                  url={"https://sligro.nl"}
                  sharedData={[
                    { field: "Company Name", value: "KVK" },
                    { field: "KVK Number", value: "12345678" },
                    { field: "KVK Number", value: "12345678" },
                    { field: "KVK Number", value: "12345678" },
                    { field: "VAT Number", value: "NL123456789B01" }
                  ]}
                />,
              ]} />

              <DayBlock events={[
                <CardEvent
                  name={"Belastingdienst"}
                  event={"Inloggen"}
                  time={"12:00"}
                  user={"Siddhart Ghogli"}
                  image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKguQbW4_cBy9UyMp0dIOsPQ1kDhZAOTDZhA&s"}
                  date={"2024-01-20"}
                  url={"https://belastingdienst.nl"}
                  sharedData={[
                    { field: "Name", value: "Siddhart Ghogli" },
                    { field: "BSN", value: "123456789" },
                    { field: "Address", value: "Sample Street 123" }
                  ]}
                />,
                <CardEvent
                  name={"Sligro"}
                  event={"Gegevens Gedeeld"}
                  time={"12:00"}
                  user={"Siddhart Ghogli"}
                  image={"https://www.sligrofoodgroup.nl/sites/default/files/download/sligro-logo.jpeg"}
                  date={"2024-01-20"}
                  url={"https://sligro.nl"}
                  sharedData={[
                    { field: "Company Name", value: "KVK" },
                    { field: "KVK Number", value: "12345678" },
                    { field: "KVK Number", value: "12345678" },
                    { field: "KVK Number", value: "12345678" },
                    { field: "VAT Number", value: "NL123456789B01" }
                  ]}
                />,
              ]} />
            </div>
          </div>
        )
    }
  }

  return (
    <div className='relative w-full flex flex-col lg:flex-row gap-6 md:p-4 lg:p-0'>
      {deleteCredentialPopup && <Popup setPopup={setDeleteCredentialPopup} title={"Credential Verwijderen"} content={<DeleteCredentialPopupContent urn={id} />}></Popup>}

      {/* Left Column */}
      <div className='w-full lg:w-1/3 flex flex-col'>
        <div className='h-full relative overflow-y-auto'>
          <div className='bg-[#F5F4F9] rounded-md h-full'>
            <div className='bg-[#383EDE] z-10 sticky top-0 p-4 lg:p-6 text-white text-xl lg:text-2xl font-bold rounded-t-md'>
              <p>Kaartgegevens</p>
            </div>

            <div className='px-4 pt-4 pb-4 md:pb-0 flex flex-col'>
              <div>
                {credential && <CredentialCard showBorder shouldLink={false} data={credential} />}
              </div>
              <div className='mt-6'>
                <p className='font-bold text-xl text-[#445581] mb-4'>Issuer Informatie</p>
                <div className='flex flex-col gap-4'>
                  <KeyValue title={"IssuerName"} value={credential?.parsedDocument?.issuer?.name} />
                  <KeyValue title={"Id"} value={credential?.parsedDocument?.issuer?.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className='w-full lg:w-2/3 bg-[#F5F4F9] rounded-md overflow-y-auto '>
        <div className='bg-[#383EDE] top-0 sticky p-4 text-white text-xl lg:text-2xl font-bold rounded-t-md flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div className='flex flex-wrap gap-2'>
            <button
              className={`px-4 py-2 rounded-md text-sm lg:text-base ${activeTab === 'data' ? 'bg-white text-[#383EDE]' : 'hover:bg-white/20'}`}
              onClick={() => setActiveTab('data')}
            >
              Data
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm lg:text-base ${activeTab === 'permissions' ? 'bg-white text-[#383EDE]' : 'hover:bg-white/20'}`}
              onClick={() => setActiveTab('permissions')}
            >
              Permissions
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm lg:text-base relative ${activeTab === 'activity' ? 'bg-white text-[#383EDE]' : 'hover:bg-white/20'}`}
              onClick={() => {
                setActiveTab('activity')
                setUnseenActivitiesCount(0)
              }}
            >
              Activity
              {unseenActivitiesCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {unseenActivitiesCount}
                </span>
              )}
            </button>
          </div>
          <button
            onClick={() => setDeleteCredentialPopup(true)}
            className='flex flex-row items-center gap-2 p-2 sm:p-4 bg-[#AB0065] text-xs font-bold rounded-md transition-colors'
          >
            <DeleteSvg />
            <p>Kaart Verwijderen</p>
          </button>
        </div>
        <div className=''>
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default CardInfo