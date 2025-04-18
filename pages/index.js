import React from 'react'
import { Users, FileText, ArrowRight, UserCog } from 'lucide-react'

//components
import PageMessage from '@/components/global/PageMessage'
import StatsOverview from '@/components/dashboard/StatsOverview'

const Dashboard = () => {
    const recentActivities = [
        { user: 'Siddhart Ghogli', action: 'heeft een nieuwe credential toegevoegd', time: '2 minuten geleden' },
        { user: 'Vinay Mahadew', action: 'heeft een gebruiker toegevoegd', time: '15 minuten geleden' },
        { user: 'John Doe', action: 'heeft een credential gedeeld', time: '1 uur geleden' }
    ]

    const quickActions = [
        { title: 'Gebruiker Toevoegen', description: 'Voeg een nieuwe gebruiker toe aan uw organisatie', link: '/users', icon: Users },
        { title: 'Credential Toevoegen', description: 'Voeg een nieuwe credential toe aan uw organisatie', link: '/cards', icon: FileText },
        { title: 'Rollen Beheren', description: 'Beheer gebruikersrollen en permissies', link: '/roles', icon: UserCog }
    ]

    return (
        <div className='w-full'>
            <PageMessage 
                title="Dashboard" 
                message="Welkom terug! Hier vindt u een overzicht van uw organisatie en recente activiteiten." 
            />

            <div className='mt-6 space-y-6'>
                <StatsOverview />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-white border rounded-xl p-6 shadow-sm'>
                        <h2 className='text-lg font-bold text-gray-900 mb-4'>Snelle Acties</h2>
                        <div className='space-y-4'>
                            {quickActions.map((action, index) => (
                                <a
                                    key={index}
                                    href={action.link}
                                    className='flex items-center justify-between p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors'
                                >
                                    <div className='flex items-center gap-4'>
                                        <div className='w-10 h-10 rounded-lg bg-[#383EDE] flex items-center justify-center'>
                                            <action.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className='font-medium text-gray-900'>{action.title}</p>
                                            <p className='text-sm text-gray-500'>{action.description}</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-[#383EDE]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className='bg-white border rounded-xl p-6 shadow-sm'>
                        <h2 className='text-lg font-bold text-gray-900 mb-4'>Recente Activiteiten</h2>
                        <div className='space-y-4'>
                            {recentActivities.map((activity, index) => (
                                <div key={index} className='flex items-center justify-between p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-10 h-10 rounded-lg bg-[#383EDE] flex items-center justify-center'>
                                            <span className='text-sm font-bold text-white'>
                                                {activity.user.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <p className='font-medium text-gray-900'>{activity.user} {activity.action}</p>
                                            <p className='text-sm text-gray-500'>{activity.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard