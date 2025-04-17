import React, { useEffect, useState } from 'react'
import { HiPlus, HiSearch, HiFilter } from 'react-icons/hi'

//components
import PageMessage from '@/components/global/PageMessage'
import CredentialCard from '@/components/global/CredentialCard'
import Popup from '@/components/global/Popup'
import AddCredentialPopupContent from '@/components/popups/addCredential'

//helpers
import { getCredentials } from '@/helpers/credentials'

const CardsOverview = () => {
    const [cards, setCards] = useState([])
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [addCredentialPopup, setAddCredentialPopup] = useState(false)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const cardsData = await getCredentials()
                setCards(cardsData)
            } catch (error) {
                console.error('Error fetching credentials:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCards()
    }, [])

    const filteredCards = cards.filter(card => {
        const matchesSearch = card?.parsedDocument?.issuer?.name?.toLowerCase()?.includes(search.toLowerCase())
        const matchesFilter = filter === 'all' || card?.parsedDocument?.type[card?.parsedDocument?.type?.length - 1].toLowerCase() === filter.toLowerCase()
        return matchesSearch && matchesFilter
    })

    return (
        <div className='w-full'>
            {addCredentialPopup && <Popup setPopup={setAddCredentialPopup} title="Credential Toevoegen" content={<AddCredentialPopupContent />} />}

            <PageMessage 
                title="Mijn Organisatie Credentials" 
                message="Op deze pagina vindt je alle credentials die zijn uitgegevens voor uw organisatie. Klik op een credential voor meer informatie." 
            />

            <div className="mt-6 space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#383EDE] focus:border-transparent sm:text-sm"
                            placeholder="Zoeken op issuer naam..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#383EDE] focus:border-transparent"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">Alle Types</option>
                                <option value="verification">Verification</option>
                                <option value="credential">Credential</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <HiFilter className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <button 
                            onClick={() => setAddCredentialPopup(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#383EDE] text-white rounded-lg hover:bg-[#2e32b3] transition-colors"
                        >
                            <HiPlus className="w-5 h-5" />
                            <span>Credential Toevoegen</span>
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#383EDE]"></div>
                    </div>
                ) : filteredCards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
                        <p className="text-lg font-medium text-gray-900">Geen credentials gevonden</p>
                        <p className="text-sm text-gray-500 mt-1">Probeer een andere zoekterm of filter</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <button 
                            onClick={() => setAddCredentialPopup(true)}
                            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#383EDE] rounded-xl hover:bg-gray-50 transition-colors aspect-video"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <HiPlus className="w-8 h-8 text-[#383EDE]" />
                                <p className="font-medium text-[#383EDE]">Nieuwe Credential</p>
                            </div>
                        </button>
                        {filteredCards.map((card, index) => (
                            <CredentialCard key={index} data={card} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardsOverview