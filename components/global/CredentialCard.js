import React from 'react'
import Link from 'next/link'
import moment from 'moment';
import { HiArrowRight, HiBuildingOffice2, HiDocument } from 'react-icons/hi2'

const CredentialCard = ({ data, showBorder = false, shouldLink = true }) => {
    const cardContent = (
        <div className='relative w-full bg-gray-50 h-full rounded-xl flex flex-col justify-between p-6 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-row justify-between items-start'>
                    <div className='flex flex-col gap-1'>
                        <p className='font-bold text-lg text-gray-900'>{data?.parsedDocument?.issuer?.name}</p>
                        <p className='text-sm text-gray-500'>{data?.parsedDocument?.type[data?.parsedDocument?.type?.length - 1]}</p>
                    </div>
                    <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden'>
                        {data?.parsedDocument?.issuer?.image?.id ? (
                            <img src={data?.parsedDocument?.issuer?.image?.id} className='w-full h-full object-cover' alt="Issuer logo" />
                        ) : (
                            <HiBuildingOffice2 className="w-6 h-6 text-[#383EDE]" />
                        )}
                    </div>
                </div>
                
                {!shouldLink && (
                    <div className='flex pt-12 flex-col gap-2 mt-4'>
                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                            <HiDocument className="w-4 h-4" />
                            <span>Issuance Date</span>
                        </div>
                        <p className='text-base font-medium text-gray-900'>
                            {moment(new Date(data?.parsedDocument?.issuanceDate)).format("DD MMMM YYYY")}
                        </p>
                    </div>
                )}
            </div>

            {shouldLink && (
                <div className='flex items-center justify-between mt-6 pt-4 border-t border-gray-100'>
                    <span className='text-sm font-medium text-[#383EDE]'>View Details</span>
                    <HiArrowRight className="w-5 h-5 text-[#383EDE]" />
                </div>
            )}
        </div>
    );

    return shouldLink ? (
        <Link 
            href={`/cards/info/${data?.id}`} 
            className={`relative w-full aspect-video rounded-xl overflow-hidden transition-transform hover:scale-[1.02] duration-200 ${showBorder ? 'border border-gray-200' : ''}`}
        >
            {cardContent}
        </Link>
    ) : (
        <div className={`relative w-full aspect-video rounded-xl overflow-hidden ${showBorder ? 'border border-gray-200' : ''}`}>
            {cardContent}
        </div>
    )
}

export default CredentialCard