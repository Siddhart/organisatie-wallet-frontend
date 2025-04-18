import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import KeyValue from '@/components/card-info/KeyValue'
import CrossSvg from '@/assets/icons/CrossSvg'

const UserDetails = () => {
    const router = useRouter()
    const { id } = router.query
    const [activeTab, setActiveTab] = useState('general')
    const [user, setUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)

    // Temporary user data - should be replaced with API call
    useEffect(() => {
        if (id) {
            // Simulating API call
            const userData = {
                firstName: 'Siddhart',
                lastName: 'Ghogli',
                prefix: '',
                email: 'siddhart.ghogli@kvk.nl',
                role: 'Eigenaar',
                lastLogin: 'Maandag 24 Februari, 23:10',
                status: 'approved',
                birthDate: '15-07-2004',
                birthPlace: "'s-Gravenhage",
                birthCountry: 'Nederland'
            }
            setUser(userData)
            setSelectedRole(userData.role)
        }
    }, [id])

    const getStatusText = (status) => {
        switch (status) {
            case 'approved':
                return 'Goedgekeurd';
            case 'pending':
                return 'In afwachting';
            default:
                return status;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const roles = [
        { id: 'Eigenaar', name: 'Eigenaar', description: 'Volledige toegang tot alle functionaliteiten' },
        { id: 'Developer', name: 'Developer', description: 'Toegang tot API en technische instellingen' },
        { id: 'HR', name: 'HR', description: 'Beheer van personeelsgegevens' },
        { id: 'Viewer', name: 'Viewer', description: 'Alleen leestoegang tot basis functionaliteiten' },
        { id: 'Manager', name: 'Manager', description: 'Beheer van team en projecten' },
        { id: 'Admin', name: 'Admin', description: 'Administratieve taken en gebruikersbeheer' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="flex flex-col gap-6">
                        <div className="bg-white">
                            <h2 className="text-lg font-semibold text-[#445581] mb-4">Persoonlijke Informatie</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-3">
                                    <KeyValue title="Volledige naam" value={`${user.firstName} ${user.lastName}`} />
                                    <KeyValue title="Voorletters" value={user.firstName.split(' ').map(n => n[0]).join('.')} />
                                    <KeyValue title="Voornamen" value={user.firstName} />
                                    <KeyValue title="Voorvoegsel" value={user.prefix || '-'} />
                                    <KeyValue title="Achternaam" value={user.lastName} />
                                    <KeyValue title="E-mail" value={user.email} />
                                    <KeyValue title="Laatste aanmelding" value={user.lastLogin} />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <KeyValue title="Geslachtsnaam" value={user.lastName} />
                                    <KeyValue title="Geboortedatum" value={user.birthDate || '-'} />
                                    <KeyValue title="Geboorteplaats" value={user.birthPlace || '-'} />
                                    <KeyValue title="Geboorteland" value={user.birthCountry || '-'} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'roles':
                return (
                    <div className="flex flex-col gap-6">
                        <div className="bg-white">
                            <h2 className="text-lg font-semibold text-[#445581] mb-4">Rol Toewijzing</h2>
                            <p className="text-sm text-gray-600 mb-4">Selecteer een rol voor deze gebruiker:</p>
                            <div className="flex flex-col gap-4">
                                {roles.map((role) => (
                                    <div
                                        key={role.id}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedRole === role.id
                                                ? 'border-[#383EDE] bg-[#383EDE]/5'
                                                : 'border-gray-200 hover:border-[#383EDE]/30'
                                            }`}
                                        onClick={() => setSelectedRole(role.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-[#445581]">{role.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border-2 ${selectedRole === role.id
                                                    ? 'border-[#383EDE] bg-[#383EDE]'
                                                    : 'border-gray-300'
                                                }`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white">
                            <button 
                                className="w-full bg-[#383EDE] text-white py-2 px-4 rounded-lg hover:bg-[#2E32B8] transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="font-bold">Rol opslaan</span>
                            </button>
                        </div>
                    </div>
                );
            case 'activities':
                return (
                    <div className="flex flex-col gap-6">
                        <div className="bg-white">
                            <h2 className="text-lg font-semibold text-[#445581] mb-4">Activiteiten</h2>
                            <div className="flex flex-col gap-4">
                                <div className="p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-[#445581]">Inloggen</h3>
                                            <p className="text-sm text-gray-600 mt-1">Laatste inlog: {user.lastLogin}</p>
                                        </div>
                                        <span className="text-sm text-gray-500">Vandaag</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-[#445581]">Rol gewijzigd</h3>
                                            <p className="text-sm text-gray-600 mt-1">Rol gewijzigd naar: {user.role}</p>
                                        </div>
                                        <span className="text-sm text-gray-500">1 dag geleden</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-[#445581]">Account aangemaakt</h3>
                                            <p className="text-sm text-gray-600 mt-1">Account succesvol aangemaakt</p>
                                        </div>
                                        <span className="text-sm text-gray-500">1 week geleden</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'actions':
                return (
                    <div className="flex flex-col gap-6">
                        <div className="bg-white">
                            <h2 className="text-lg font-semibold text-red-800 mb-4">Gevaarlijke Acties</h2>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                <p className="text-sm text-red-600">Deze acties kunnen niet ongedaan worden gemaakt.</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                {user.status === 'pending' && (
                                    <button className="w-fit bg-[#383EDE] text-white py-2 px-4 rounded-lg hover:bg-[#2E32B8] transition-colors flex items-center justify-center gap-2">
                                        <span className="font-bold">Gebruiker verifiëren</span>
                                    </button>
                                )}
                                <button className="w-fit bg-[#AB0065] text-white py-2 px-4 rounded-lg hover:bg-[#900055] transition-colors flex items-center justify-center gap-2">
                                    <span className="font-bold">Gebruiker verwijderen</span>
                                    <CrossSvg color="white" />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#383EDE]"></div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="bg-white border rounded-lg p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#383EDE] flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">
                                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#445581]">{user.firstName} {user.lastName}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                    </span>
                </div>
            </div>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {[
                        { id: 'general', name: 'Algemeen' },
                        { id: 'roles', name: 'Rollen' },
                        { id: 'activities', name: 'Activiteiten' },
                        { id: 'actions', name: 'Acties' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                                    ? 'border-[#383EDE] text-[#383EDE]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
              `}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto">
                {renderTabContent()}
            </div>
        </div>
    )
}

export default UserDetails 