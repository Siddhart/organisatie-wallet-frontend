import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getUser, updateUserVerification, updateEmployeeState } from '@/helpers/user'
import KeyValue from '@/components/card-info/KeyValue'
import CrossSvg from '@/assets/icons/CrossSvg'

const UserDetails = () => {
    const router = useRouter()
    const { id } = router.query
    const [activeTab, setActiveTab] = useState('general')
    const [user, setUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isVerifying, setIsVerifying] = useState(false)
    const [isUpdatingState, setIsUpdatingState] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return
            
            setIsLoading(true)
            setError(null)
            try {
                const userData = await getUser(id)
                setUser(userData)
                setSelectedRole(userData.position)
            } catch (err) {
                setError('Er is een fout opgetreden bij het ophalen van de gebruiker.')
                console.error('Error fetching user:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, [id])

    const handleVerify = async () => {
        if (!id) return;
        
        setIsVerifying(true);
        try {
            // Update both verification state and employee state
            await updateUserVerification(id, 2); // Verified = 2
            await updateEmployeeState(id, 1); // Active = 1
            // Refresh the page data
            const userData = await getUser(id);
            setUser(userData);
        } catch (err) {
            setError('Er is een fout opgetreden bij het verifiëren van de gebruiker.');
            console.error('Error verifying user:', err);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleEmployeeStateChange = async (value) => {
        if (!id) return;
        
        setIsUpdatingState(true);
        try {
            await updateEmployeeState(id, parseInt(value));
            // Refresh the page data
            const userData = await getUser(id);
            setUser(userData);
        } catch (err) {
            setError('Er is een fout opgetreden bij het bijwerken van de status.');
            console.error('Error updating employee state:', err);
        } finally {
            setIsUpdatingState(false);
        }
    };

    const getStatusText = (verificationState, employeeState) => {
        if (verificationState === 0) return 'In afwachting';
        if (verificationState === 1) return 'In behandeling';
        if (verificationState === 2) {
            switch (employeeState) {
                case 0: return 'Inactief';
                case 1: return 'Actief';
                case 2: return 'Met verlof';
                case 3: return 'Geschorst';
                case 4: return 'Beëindigd';
                case 5: return 'Gepensioneerd';
                default: return 'Onbekend';
            }
        }
        if (verificationState === 3) return 'Verlopen';
        if (verificationState === 4) return 'Ingetrokken';
        return 'Onbekend';
    };

    const getStatusColor = (verificationState, employeeState) => {
        if (verificationState === 0) return 'bg-yellow-100 text-yellow-800';
        if (verificationState === 1) return 'bg-blue-100 text-blue-800';
        if (verificationState === 2) {
            switch (employeeState) {
                case 0: return 'bg-red-100 text-red-800';
                case 1: return 'bg-green-100 text-green-800';
                case 2: return 'bg-purple-100 text-purple-800';
                case 3: return 'bg-orange-100 text-orange-800';
                case 4: return 'bg-gray-100 text-gray-800';
                case 5: return 'bg-gray-100 text-gray-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        }
        if (verificationState === 3) return 'bg-red-100 text-red-800';
        if (verificationState === 4) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
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
        if (!user) return null;

        switch (activeTab) {
            case 'general':
                return (
                    <div className="flex flex-col gap-6">
                        <div className="bg-white">
                            <h2 className="text-lg font-semibold text-[#445581] mb-4">Persoonlijke Informatie</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-3">
                                    <KeyValue 
                                        title="Volledige naam" 
                                        value={`${user.firstName} ${user.voorvoegsel && user.voorvoegsel !== "string" ? `${user.voorvoegsel} ` : ''}${user.lastName}`} 
                                    />
                                    <KeyValue 
                                        title="Voorletters" 
                                        value={user.voorletters ? `${user.voorletters.split("").join(".")}.` : '-'} 
                                    />
                                    <KeyValue 
                                        title="Voornamen" 
                                        value={user.firstName} 
                                    />
                                    <KeyValue 
                                        title="Tussenvoegsel" 
                                        value={user.voorvoegsel || '-'} 
                                    />
                                    <KeyValue 
                                        title="Achternaam" 
                                        value={user.lastName} 
                                    />
                                    <KeyValue 
                                        title="E-mail" 
                                        value={user.email} 
                                    />
                                    <KeyValue 
                                        title="Laatste aanmelding" 
                                        value={new Date(user.laatsteAanmelding).toLocaleString('nl-NL')} 
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <KeyValue title="Geslacht" value={user.gender || '-'} />
                                    <KeyValue title="Geboortedatum" value={new Date(user.birthDate).toLocaleDateString('nl-NL')} />
                                    <KeyValue title="Geboorteplaats" value={user.birthPlace || '-'} />
                                    <KeyValue title="Geboorteland" value={user.birthCountry || '-'} />
                                    <KeyValue title="Telefoonnummer" value={user.phoneNumber || '-'} />
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
                                            <p className="text-sm text-gray-600 mt-1">Laatste inlog: {new Date(user.laatsteAanmelding).toLocaleString('nl-NL')}</p>
                                        </div>
                                        <span className="text-sm text-gray-500">Vandaag</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-[#445581]">Account aangemaakt</h3>
                                            <p className="text-sm text-gray-600 mt-1">Account succesvol aangemaakt</p>
                                        </div>
                                        <span className="text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString('nl-NL')}</span>
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

                            <div className="space-y-6">
                                {/* Verificatie Sectie */}
                                {user.verificationState === 0 && (
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-[#445581]">Gebruiker Verifiëren</h3>
                                                <p className="text-sm text-gray-600 mt-1">Geef deze gebruiker toegang tot het systeem</p>
                                            </div>
                                            <button 
                                                onClick={handleVerify}
                                                disabled={isVerifying}
                                                className={`bg-[#383EDE] text-white py-2 px-4 rounded-lg transition-colors ${
                                                    isVerifying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2E32B8]'
                                                }`}
                                            >
                                                {isVerifying ? 'Verifiëren...' : 'Verifiëren'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Employee State Section */}
                                {user.verificationState === 2 && (
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <h3 className="font-semibold text-[#445581] mb-2">Medewerker Status</h3>
                                                <div className="relative">
                                                    <select
                                                        value={user.employeeState}
                                                        onChange={(e) => handleEmployeeStateChange(e.target.value)}
                                                        disabled={isUpdatingState}
                                                        className="w-full p-3 pr-10 appearance-none bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#383EDE] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <option value="0" className="py-2">Inactief</option>
                                                        <option value="1" className="py-2">Actief</option>
                                                        <option value="2" className="py-2">Met verlof</option>
                                                        <option value="3" className="py-2">Geschorst</option>
                                                        <option value="4" className="py-2">Beëindigd</option>
                                                        <option value="5" className="py-2">Gepensioneerd</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Verwijderen Sectie */}
                                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-red-800">Gebruiker Verwijderen</h3>
                                            <p className="text-sm text-red-600 mt-1">Verwijder deze gebruiker permanent uit het systeem</p>
                                        </div>
                                        <button className="bg-[#AB0065] text-white py-2 px-4 rounded-lg hover:bg-[#900055] transition-colors flex items-center gap-2">
                                            <span>Verwijderen</span>
                                            <CrossSvg color="white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#383EDE]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="text-red-500 text-center">{error}</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="text-gray-500 text-center">Gebruiker niet gevonden</div>
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
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.verificationState, user.employeeState)}`}>
                        {getStatusText(user.verificationState, user.employeeState)}
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