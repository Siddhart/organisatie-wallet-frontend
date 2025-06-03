import React, { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'
import { CheckCircle2 } from 'lucide-react'
import { createUserFromPID } from '@/helpers/user'

//assets
import CardsSvg from '@/assets/cardsSvg'
import LogoSvg from '@/assets/logo'
import OverheidSvg from '@/assets/overheidSvg'

const mockData = {
    "id": "fz627152a1c",
    "data": {
        "id": "pid",
        "docType": "com.example.pid",
        "issuer": {
            "id": "943441129",
            "legalName": {
                "nl": "Rijksdienst voor Identiteits­gegevens"
            },
            "displayName": {
                "nl": "Rijksdienst voor Identiteits­gegevens"
            },
            "category": {
                "en": "Government",
                "nl": "Overheid"
            },
            "description": {
                "en": "RvIG is the authority and director for the secure and reliable use of identity data.",
                "nl": "RvIG is de autoriteit en regisseur van het veilig en betrouwbaar gebruik van identiteits­gegevens."
            },
            "logo": {
                "type": "asset",
                "data": "assets/non-free/logos/rijksoverheid.png"
            },
            "webUrl": "https://www.rvig.nl/",
            "privacyPolicyUrl": "https://www.rvig.nl/over-deze-site/privacyverklaring-rijksdienst-voor-identiteitsgegevens",
            "countryCode": null,
            "city": {
                "en": "The Hague, The Netherlands",
                "nl": "Den Haag, Nederland"
            },
            "department": null,
            "kvk": "27373207"
        },
        "front": {
            "title": {
                "en": "Personal data",
                "nl": "Persoons­gegevens"
            },
            "subtitle": {
                "en": "Willeke Liselotte",
                "nl": "Willeke Liselotte"
            },
            "info": null,
            "logoImage": "assets/non-free/logos/card_rijksoverheid.png",
            "holoImage": "assets/non-free/svg/rijks_card_holo.svg",
            "backgroundImage": "assets/non-free/svg/rijks_card_bg_light.svg",
            "theme": "light"
        },
        "attributes": [
            {
                "key": "mock.firstNames",
                "label": {
                    "nl": "Voornamen",
                    "en": "First names"
                },
                "value": {
                    "type": "string",
                    "value": "Willeke Liselotte"
                },
                "sourceCardDocType": "com.example.pid"
            },
            {
                "key": "mock.lastName",
                "label": {
                    "nl": "Achternaam",
                    "en": "Surname"
                },
                "value": {
                    "type": "string",
                    "value": "De Bruijn"
                },
                "sourceCardDocType": "com.example.pid"
            },
            {
                "key": "mock.birthName",
                "label": {
                    "nl": "Naam bij geboorte",
                    "en": "Birth name"
                },
                "value": {
                    "type": "string",
                    "value": "Molenaar"
                },
                "sourceCardDocType": "com.example.pid"
            },
            {
                "key": "mock.gender",
                "label": {
                    "nl": "Geslacht",
                    "en": "Gender"
                },
                "value": {
                    "type": "gender",
                    "value": "female"
                },
                "sourceCardDocType": "com.example.pid"
            },
            {
                "key": "mock.birthDate",
                "label": {
                    "nl": "Geboortedatum",
                    "en": "Birth date"
                },
                "value": {
                    "type": "date",
                    "value": 858034800000
                },
                "sourceCardDocType": "com.example.pid"
            },
            {
                "key": "mock.olderThan18",
                "label": {
                    "nl": "Ouder dan 18",
                    "en": "Older than 18"
                },
                "value": {
                    "type": "bool",
                    "value": "true"
                },
                "sourceCardDocType": "com.example.pid"
            },
            {
                "key": "mock.birthPlace",
                "label": {
                    "nl": "Geboorteplaats",
                    "en": "Birthplace"
                },
                "value": {
                    "type": "string",
                    "value": "Delft"
                },
                "sourceCardDocType": "com.example.pid"
            },
            {
                "key": "mock.birthCountry",
                "label": {
                    "nl": "Geboorteland",
                    "en": "Country of birth"
                },
                "value": {
                    "type": "string",
                    "value": "Nederland"
                },
                "sourceCardDocType": "com.example.pid"
            },
            {
                "key": "mock.hasSpouseOrPartner",
                "label": {
                    "nl": "Getrouwd of geregistreerd partnerschap",
                    "en": "Married or registered partnership"
                },
                "value": {
                    "type": "bool",
                    "value": "true"
                },
                "sourceCardDocType": "com.example.pid"
            },
            {
                "key": "mock.citizenshipNumber",
                "label": {
                    "nl": "Burger­service­nummer (BSN)",
                    "en": "BSN"
                },
                "value": {
                    "type": "string",
                    "value": "111222333"
                },
                "sourceCardDocType": "com.example.pid"
            }
        ],
        "config": {
            "updatable": false,
            "removable": false
        }
    },
    "createdAt": 1748973752296
};

const QRStep = ({ setStep }) => {
    const [sessionId, setSessionId] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [pidData, setPidData] = useState(null)
    const [showConfirmation, setShowConfirmation] = useState(false)

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
                console.log('Received session data:', data);

                if (data && data.data) {
                    setPidData(data.data);
                    setShowConfirmation(true);
                    clearInterval(pollInterval);
                }
            } catch (error) {
                console.error('Error polling session:', error);
            }
        }, 2000); // Poll every 2 seconds

        return () => clearInterval(pollInterval);
    }, [sessionId]);

    const handleConfirm = async () => {
        try {
            await createUserFromPID(mockData);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleQRClick = async () => {
        if (!sessionId) return;



        try {
            const response = await fetch(`/api/qr/session/${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mockData)
            });
            
            if (response.ok) {
                setPidData(mockData);
                setShowConfirmation(true);
            }
        } catch (error) {
            console.error('Error sending mock data:', error);
        }
    };

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

    if (showConfirmation && pidData) {
        const mockData = {
            "id": "fz627152a1c",
            "data": {
                "id": "pid",
                "docType": "com.example.pid",
                "issuer": {
                    "id": "943441129",
                    "legalName": {
                        "nl": "Rijksdienst voor Identiteits­gegevens"
                    },
                    "displayName": {
                        "nl": "Rijksdienst voor Identiteits­gegevens"
                    },
                    "category": {
                        "en": "Government",
                        "nl": "Overheid"
                    },
                    "description": {
                        "en": "RvIG is the authority and director for the secure and reliable use of identity data.",
                        "nl": "RvIG is de autoriteit en regisseur van het veilig en betrouwbaar gebruik van identiteits­gegevens."
                    },
                    "logo": {
                        "type": "asset",
                        "data": "assets/non-free/logos/rijksoverheid.png"
                    },
                    "webUrl": "https://www.rvig.nl/",
                    "privacyPolicyUrl": "https://www.rvig.nl/over-deze-site/privacyverklaring-rijksdienst-voor-identiteitsgegevens",
                    "countryCode": null,
                    "city": {
                        "en": "The Hague, The Netherlands",
                        "nl": "Den Haag, Nederland"
                    },
                    "department": null,
                    "kvk": "27373207"
                },
                "front": {
                    "title": {
                        "en": "Personal data",
                        "nl": "Persoons­gegevens"
                    },
                    "subtitle": {
                        "en": "Willeke Liselotte",
                        "nl": "Willeke Liselotte"
                    },
                    "info": null,
                    "logoImage": "assets/non-free/logos/card_rijksoverheid.png",
                    "holoImage": "assets/non-free/svg/rijks_card_holo.svg",
                    "backgroundImage": "assets/non-free/svg/rijks_card_bg_light.svg",
                    "theme": "light"
                },
                "attributes": [
                    {
                        "key": "mock.firstNames",
                        "label": {
                            "nl": "Voornamen",
                            "en": "First names"
                        },
                        "value": {
                            "type": "string",
                            "value": "Willeke Liselotte"
                        },
                        "sourceCardDocType": "com.example.pid"
                    },
                    {
                        "key": "mock.lastName",
                        "label": {
                            "nl": "Achternaam",
                            "en": "Surname"
                        },
                        "value": {
                            "type": "string",
                            "value": "De Bruijn"
                        },
                        "sourceCardDocType": "com.example.pid"
                    },
                    {
                        "key": "mock.birthName",
                        "label": {
                            "nl": "Naam bij geboorte",
                            "en": "Birth name"
                        },
                        "value": {
                            "type": "string",
                            "value": "Molenaar"
                        },
                        "sourceCardDocType": "com.example.pid"
                    },
                    {
                        "key": "mock.gender",
                        "label": {
                            "nl": "Geslacht",
                            "en": "Gender"
                        },
                        "value": {
                            "type": "gender",
                            "value": "female"
                        },
                        "sourceCardDocType": "com.example.pid"
                    },
                    {
                        "key": "mock.birthDate",
                        "label": {
                            "nl": "Geboortedatum",
                            "en": "Birth date"
                        },
                        "value": {
                            "type": "date",
                            "value": 858034800000
                        },
                        "sourceCardDocType": "com.example.pid"
                    },
                    {
                        "key": "mock.olderThan18",
                        "label": {
                            "nl": "Ouder dan 18",
                            "en": "Older than 18"
                        },
                        "value": {
                            "type": "bool",
                            "value": "true"
                        },
                        "sourceCardDocType": "com.example.pid"
                    },
                    {
                        "key": "mock.birthPlace",
                        "label": {
                            "nl": "Geboorteplaats",
                            "en": "Birthplace"
                        },
                        "value": {
                            "type": "string",
                            "value": "Delft"
                        },
                        "sourceCardDocType": "com.example.pid"
                    },
                    {
                        "key": "mock.birthCountry",
                        "label": {
                            "nl": "Geboorteland",
                            "en": "Country of birth"
                        },
                        "value": {
                            "type": "string",
                            "value": "Nederland"
                        },
                        "sourceCardDocType": "com.example.pid"
                    },
                    {
                        "key": "mock.hasSpouseOrPartner",
                        "label": {
                            "nl": "Getrouwd of geregistreerd partnerschap",
                            "en": "Married or registered partnership"
                        },
                        "value": {
                            "type": "bool",
                            "value": "true"
                        },
                        "sourceCardDocType": "com.example.pid"
                    },
                    {
                        "key": "mock.citizenshipNumber",
                        "label": {
                            "nl": "Burger­service­nummer (BSN)",
                            "en": "BSN"
                        },
                        "value": {
                            "type": "string",
                            "value": "111222333"
                        },
                        "sourceCardDocType": "com.example.pid"
                    }
                ],
                "config": {
                    "updatable": false,
                    "removable": false
                }
            },
            "createdAt": 1748973752296
        };
        
        const attributes = mockData.data.attributes;
        
        const userData = {
            firstName: attributes.find(attr => attr.key === 'mock.firstNames')?.value.value,
            lastName: attributes.find(attr => attr.key === 'mock.lastName')?.value.value,
            birthName: attributes.find(attr => attr.key === 'mock.birthName')?.value.value,
            gender: attributes.find(attr => attr.key === 'mock.gender')?.value.value,
            birthDate: new Date(attributes.find(attr => attr.key === 'mock.birthDate')?.value.value).toLocaleDateString(),
            birthPlace: attributes.find(attr => attr.key === 'mock.birthPlace')?.value.value,
            birthCountry: attributes.find(attr => attr.key === 'mock.birthCountry')?.value.value,
            bsn: attributes.find(attr => attr.key === 'mock.citizenshipNumber')?.value.value,
            hasSpouseOrPartner: attributes.find(attr => attr.key === 'mock.hasSpouseOrPartner')?.value.value === 'true',
            olderThan18: attributes.find(attr => attr.key === 'mock.olderThan18')?.value.value === 'true'
        };

        return (
            <div className='bg-[#F5F4F9] h-screen w-screen'>
                <div className='absolute top-4 left-4 w-20 h-20 bg-white flex items-center justify-center rounded-2xl'>
                    <LogoSvg />
                </div>

                <div className='flex flex-row h-full w-full flex-1'>
                    <div className='flex flex-col gap-8 h-full w-[58%] items-center justify-center'>
                        <CardsSvg />
                        <p className='w-1/2 text-center text-2xl'>Bevestig uw gegevens</p>
                    </div>

                    <div className='flex flex-col relative h-full w-auto flex-1 bg-white rounded-l-[32px]'>
                        <div className='w-full flex items-center justify-center'>
                            <OverheidSvg />
                        </div>

                        <div className='2xl:mt-16 mt-4 px-16 flex flex-col gap-8'>
                            <p className='font-bold text-4xl leading-snug'>Controleer uw gegevens</p>
                            
                            <div className='flex flex-col gap-4 bg-gray-50 p-6 rounded-lg'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <p className='font-semibold'>Voornamen:</p>
                                    <p>{userData.firstName}</p>
                                    <p className='font-semibold'>Achternaam:</p>
                                    <p>{userData.lastName}</p>
                                    <p className='font-semibold'>Naam bij geboorte:</p>
                                    <p>{userData.birthName}</p>
                                    <p className='font-semibold'>Geslacht:</p>
                                    <p>{userData.gender === 'female' ? 'Vrouw' : 'Man'}</p>
                                    <p className='font-semibold'>Geboortedatum:</p>
                                    <p>{userData.birthDate}</p>
                                    <p className='font-semibold'>Geboorteplaats:</p>
                                    <p>{userData.birthPlace}</p>
                                    <p className='font-semibold'>Geboorteland:</p>
                                    <p>{userData.birthCountry}</p>
                                    <p className='font-semibold'>BSN:</p>
                                    <p>{userData.bsn}</p>
                                    <p className='font-semibold'>Getrouwd of geregistreerd partnerschap:</p>
                                    <p>{userData.hasSpouseOrPartner ? 'Ja' : 'Nee'}</p>
                                    <p className='font-semibold'>Ouder dan 18:</p>
                                    <p>{userData.olderThan18 ? 'Ja' : 'Nee'}</p>
                                </div>
                            </div>

                            <div className='flex gap-4 mt-4'>
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className='px-6 py-5 border border-gray-300 rounded-xl hover:bg-gray-50'
                                >
                                    Annuleren
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className='bg-[#383EDE] flex flex-row w-fit h-fit gap-3 py-5 px-6 rounded-xl text-white'
                                >
                                    <p className='font-bold text-base'>Bevestigen</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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
                        
                        <div className='flex flex-col items-center gap-4'>
                            <div className='flex justify-center bg-black w-fit cursor-pointer' onClick={handleQRClick}>
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
                                                    "i": "https://businesswallets.eu/ro.png" 
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
        </div>
    )
}

export default QRStep 