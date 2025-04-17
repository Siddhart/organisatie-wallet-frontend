import React from 'react'
import { HiUsers, HiDocument, HiArrowRight } from 'react-icons/hi'

//components
import PageMessage from '@/components/global/PageMessage'

const Dashboard = () => {
    const recentActivities = [
        { user: 'Siddhart Ghogli', action: 'heeft een nieuwe credential toegevoegd', time: '2 minuten geleden' },
        { user: 'Vinay Mahadew', action: 'heeft een gebruiker toegevoegd', time: '15 minuten geleden' },
        { user: 'John Doe', action: 'heeft een credential gedeeld', time: '1 uur geleden' }
    ]

    const quickActions = [
        { title: 'Gebruiker Toevoegen', description: 'Voeg een nieuwe gebruiker toe aan uw organisatie', link: '/users', icon: HiUsers },
        { title: 'Credential Toevoegen', description: 'Voeg een nieuwe credential toe aan uw organisatie', link: '/cards', icon: HiDocument }
    ]

    return (
        <div className='w-full space-y-6'>
            <PageMessage 
                title="Welkom terug, Siddhart!" 
                message="Hier vindt u een overzicht van uw organisatie en recente activiteiten." 
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recente Activiteiten</h2>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-[#383EDE]"></div>
                                <div>
                                    <p className="text-sm text-gray-900">
                                        <span className="font-medium">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Snelle Acties</h2>
                    <div className="space-y-4">
                        {quickActions.map((action, index) => (
                            <a
                                key={index}
                                href={action.link}
                                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-[#383EDE] hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-gray-100">
                                        <action.icon className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{action.title}</p>
                                        <p className="text-sm text-gray-500">{action.description}</p>
                                    </div>
                                </div>
                                <HiArrowRight className="w-5 h-5 text-gray-400" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard