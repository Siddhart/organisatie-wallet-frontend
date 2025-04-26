import React, { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'
import { CheckCircle2 } from 'lucide-react'

//assets
import CardsSvg from '@/assets/cardsSvg'
import LogoSvg from '@/assets/logo'
import OverheidSvg from '@/assets/overheidSvg'

const QRStep = ({ setStep }) => {
    const [sessionId, setSessionId] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        const generateSession = async () => {
            try {
                const response = await fetch('/api/qr/generate');
                const data = await response.json();
                setSessionId(data.sessionId);
            } catch (error) {
                console.error('Error generating session:', error);
            }
        };
        generateSession();
    }, []);

    // Poll for session data
    useEffect(() => {
        if (!sessionId) return;

        const pollInterval = setInterval(async () => {
            try {
                const response = await fetch(`/api/qr/session/${sessionId}`);
                const data = await response.json();

                if (data && data.data) {
                    // Extract relevant data from the response
                    const attributes = data.data.data.attributes;
                    const employeeData = {
                        // Persoonlijke info
                        FirstName: attributes.find(attr => attr.key === 'mock.firstNames')?.value.value,
                        LastName: attributes.find(attr => attr.key === 'mock.lastName')?.value.value,
                        BirthName: attributes.find(attr => attr.key === 'mock.birthName')?.value.value,
                        Gender: attributes.find(attr => attr.key === 'mock.gender')?.value.value,
                        BirthDate: attributes.find(attr => attr.key === 'mock.birthDate')?.value.value ? 
                            new Date(attributes.find(attr => attr.key === 'mock.birthDate').value.value) : null,
                        OlderThan18: attributes.find(attr => attr.key === 'mock.olderThan18')?.value.value === "true",
                        BirthPlace: attributes.find(attr => attr.key === 'mock.birthPlace')?.value.value,
                        BirthCountry: attributes.find(attr => attr.key === 'mock.birthCountry')?.value.value,
                        Married: attributes.find(attr => attr.key === 'mock.hasSpouseOrPartner')?.value.value === "true",
                        
                        // Bedrijfsinfo
                        LegalName: data.data.data.issuer.legalName.nl,
                        Category: data.data.data.issuer.category.nl,
                        City: data.data.data.issuer.city.nl,
                        Kvk: data.data.data.issuer.kvk,
                    };

                    try{
                        // await fetch('https://api.businesswallet.eu/api/', {
                        //     method: 'POST',
                        //     headers: {
                        //         'Content-Type': 'application/json',
                        //     },
                        //     body: JSON.stringify(employeeData)
                        // })
    
                        console.log('Extracted employee data:', employeeData);
                        setIsSuccess(true);
                        clearInterval(pollInterval);
                    }catch{

                    }
                }
            } catch (error) {
                console.error('Error polling session:', error);
            }
        }, 2000); // Poll every 2 seconds

        return () => clearInterval(pollInterval);
    }, [sessionId]);

    if (isSuccess) {
        return (
            <div className='bg-[#F5F4F9] h-screen w-screen'>
                <div className='absolute top-4 left-4 w-20 h-20 bg-white flex items-center justify-center rounded-2xl'>
                    <LogoSvg />
                </div>

                <div className='flex flex-row h-full w-full flex-1'>
                    <div className='flex flex-col gap-8 h-full w-[58%] items-center justify-center'>
                        <CardsSvg />
                        <p className='w-1/2 text-center text-2xl'>Bedankt voor uw registratie!</p>
                    </div>

                    <div className='flex flex-col relative h-full w-auto flex-1 bg-white rounded-l-[32px]'>
                        <div className='w-full flex items-center justify-center'>
                            <OverheidSvg />
                        </div>

                        <div className='flex flex-col items-center justify-center h-full px-16'>
                            <div className='flex flex-col items-center gap-6 max-w-lg'>
                                <CheckCircle2 className='w-12 h-12 text-[#4CAF50]' />
                                <p className='font-bold text-3xl text-[#4CAF50] text-center'>Registratie Ontvangen</p>
                                <div className='flex flex-col gap-4 text-center'>
                                    <p className='text-xl leading-normal'>Wij hebben uw gegevens ontvangen. Een beheerder van de wallet zal uw verzoek beoordelen.</p>
                                    <p className='text-lg leading-normal text-gray-600'>U ontvangt een e-mail zodra uw verzoek is goedgekeurd.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-[#F5F4F9] h-screen w-screen'>
            <div className='absolute top-4 left-4 w-20 h-20 bg-white flex items-center justify-center rounded-2xl'>
                <LogoSvg />
            </div>

            <div className='flex flex-row h-full w-full flex-1'>
                <div className='flex flex-col gap-8 h-full w-[58%] items-center justify-center'>
                    <CardsSvg />
                    <p className='w-1/2 text-center text-2xl'>Scan QR Code om uw registratie te voltooien</p>
                </div>

                <div className='flex flex-col relative h-full w-auto flex-1 bg-white rounded-l-[32px]'>
                    <div className='w-full flex items-center justify-center'>
                        <OverheidSvg />
                    </div>

                    <div className='2xl:mt-16 mt-4 px-16 flex flex-col gap-8'>
                        <p className='font-bold text-4xl leading-snug'>Scan de QR Code</p>
                        <p className='text-2xl leading-normal'>Scan deze QR code met uw NL-Wallet app om uw WebSloth account registratie te voltooien.</p>
                        
                        <div className='flex justify-center bg-black w-fit'>
                            {sessionId && (
                                <QRCode
                                    value={
                                        JSON.stringify({ 
                                            "pn": "WebSloth Business Wallet", 
                                            "ep": `${window.location.origin}/api/qr/session/${sessionId}`, 
                                            "r": "Registreren", 
                                            "ra": [{ 
                                                "n": "Persoonsgegevens", 
                                                "a": ["Voornaam", "Achternaam", "Geboortedatum", "Geboorteplaats", "Geboorteland", "BSN"], 
                                                "i": "https://businesswallet.eu/ro.png" 
                                            }], 
                                            "pi": "https://websloth.agency/logo.png" 
                                        })
                                    }
                                    level="L"
                                    style={{ width: '225px', height: '225px' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QRStep 