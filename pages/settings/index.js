import React, { useState } from 'react'
import { HiCog, HiUser, HiShieldCheck, HiBell, HiGlobe, HiKey, HiUserGroup } from 'react-icons/hi'

//components
import PageMessage from '@/components/global/PageMessage'

const Settings = () => {
    const [activeTab, setActiveTab] = useState('organization')

    const tabs = [
        { id: 'organization', label: 'Organisatie', icon: HiCog },
        { id: 'roles', label: 'Rollen', icon: HiUserGroup },
        { id: 'security', label: 'Beveiliging', icon: HiShieldCheck },
        { id: 'notifications', label: 'Notificaties', icon: HiBell },
        { id: 'language', label: 'Taal', icon: HiGlobe },
        { id: 'api', label: 'API Instellingen', icon: HiKey }
    ]

    const roles = [
        { name: 'Eigenaar', description: 'Volledige toegang tot alle functionaliteiten', permissions: ['Alles'] },
        { name: 'Beheerder', description: 'Beheer van gebruikers en rollen', permissions: ['Gebruikers beheren', 'Rollen beheren'] },
        { name: 'Developer', description: 'Toegang tot API en technische instellingen', permissions: ['API beheren', 'Integraties beheren'] },
        { name: 'HR', description: 'Beheer van personeelsgegevens', permissions: ['Personeelsgegevens beheren', 'Documenten beheren'] }
    ]

    const organizationSettings = [
        {
            title: 'Organisatie Naam',
            description: 'De naam van uw organisatie zoals deze wordt weergegeven in de applicatie',
            value: 'KVK',
            type: 'text'
        },
        {
            title: 'Organisatie Email',
            description: 'Het primaire emailadres voor uw organisatie',
            value: 'info@kvk.nl',
            type: 'email'
        },
        {
            title: 'Organisatie Website',
            description: 'De website van uw organisatie',
            value: 'https://www.kvk.nl',
            type: 'url'
        }
    ]

    const securitySettings = [
        {
            title: 'Twee-factor Authenticatie',
            description: 'Verhoog de beveiliging van uw account met twee-factor authenticatie',
            value: false,
            type: 'toggle'
        },
        {
            title: 'Sessie Timeout',
            description: 'Na hoeveel minuten van inactiviteit wordt u automatisch uitgelogd',
            value: '30',
            type: 'select',
            options: ['15', '30', '60', '120']
        }
    ]

    const notificationSettings = [
        {
            title: 'Email Notificaties',
            description: 'Ontvang notificaties per email',
            value: true,
            type: 'toggle'
        },
        {
            title: 'Push Notificaties',
            description: 'Ontvang push notificaties in de applicatie',
            value: true,
            type: 'toggle'
        }
    ]

    const languageSettings = [
        {
            title: 'Interface Taal',
            description: 'Selecteer de taal voor de gebruikersinterface',
            value: 'Nederlands',
            type: 'select',
            options: ['Nederlands', 'English', 'Deutsch']
        }
    ]

    const apiSettings = [
        {
            title: 'API Sleutel',
            description: 'Uw unieke API sleutel voor integraties',
            value: '••••••••••••••••',
            type: 'password'
        },
        {
            title: 'API Limiet',
            description: 'Maximum aantal API verzoeken per minuut',
            value: '100',
            type: 'number'
        }
    ]

    const renderSettings = (settings) => {
        return settings.map((setting, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">{setting.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{setting.description}</p>
                    </div>
                    {setting.type === 'toggle' ? (
                        <button
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#383EDE] focus:ring-offset-2 ${
                                setting.value ? 'bg-[#383EDE]' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    setting.value ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    ) : setting.type === 'select' ? (
                        <select
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#383EDE] focus:border-[#383EDE] sm:text-sm rounded-md bg-white"
                            value={setting.value}
                        >
                            {setting.options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={setting.type}
                            value={setting.value}
                            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#383EDE] focus:border-[#383EDE] sm:text-sm rounded-md bg-white"
                        />
                    )}
                </div>
            </div>
        ))
    }

    const renderRoles = () => {
        return (
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-[#383EDE]">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                                    Rol
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                                    Beschrijving
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                                    Rechten
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                                    Acties
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {roles.map((role, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{role.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">{role.description}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {role.permissions.map((permission, pIndex) => (
                                                <span
                                                    key={pIndex}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {permission}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <button className="text-[#383EDE] hover:text-[#2e32b3] font-medium">
                                            Bewerken
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full space-y-6">
            <PageMessage
                title="Instellingen"
                message="Beheer hier de instellingen voor uw organisatie en persoonlijke voorkeuren."
            />

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full lg:w-64">
                    <nav className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                                    activeTab === tab.id
                                        ? 'bg-[#383EDE] text-white'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <tab.icon className="mr-3 h-5 w-5" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                    {activeTab === 'organization' && renderSettings(organizationSettings)}
                    {activeTab === 'roles' && renderRoles()}
                    {activeTab === 'security' && renderSettings(securitySettings)}
                    {activeTab === 'notifications' && renderSettings(notificationSettings)}
                    {activeTab === 'language' && renderSettings(languageSettings)}
                    {activeTab === 'api' && renderSettings(apiSettings)}
                </div>
            </div>
        </div>
    )
}

export default Settings 