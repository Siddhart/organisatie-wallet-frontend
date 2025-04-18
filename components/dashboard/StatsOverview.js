import React, { useEffect, useState } from 'react'
import { FileText, Clock, Users, Activity } from 'lucide-react'
import { getCredentials } from '@/helpers/credentials'
import moment from 'moment'

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className='bg-white rounded-xl border p-6 shadow-sm'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-1'>
                <p className='text-sm text-gray-500'>{title}</p>
                <p className='text-2xl font-bold text-gray-900'>{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    </div>
)

const StatsOverview = () => {
    const [stats, setStats] = useState({
        totalCredentials: 0,
        expiringCredentials: 0,
        totalUsers: 0,
        weeklyActivities: 0
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const credentials = await getCredentials()
                if (!credentials?.exception) {
                    const now = moment()
                    const thirtyDaysFromNow = moment().add(30, 'days')
                    const weekAgo = moment().subtract(7, 'days')
                    
                    // Get expiring credentials (within 30 days)
                    const expiringCredentials = credentials.filter(c => {
                        const expirationDate = moment(c.parsedDocument?.expirationDate)
                        return expirationDate.isBetween(now, thirtyDaysFromNow)
                    })

                    // Get weekly activities (assuming activities are stored in credentials)
                    const weeklyActivities = credentials.filter(c => 
                        moment(c.parsedDocument?.issuanceDate).isAfter(weekAgo)
                    )

                    setStats({
                        totalCredentials: credentials.length,
                        expiringCredentials: expiringCredentials.length,
                        totalUsers: new Set(credentials.map(c => c.parsedDocument?.holder?.id)).size,
                        weeklyActivities: weeklyActivities.length
                    })
                }
            } catch (error) {
                console.error('Error fetching stats:', error)
            }
        }

        fetchStats()
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <StatCard
                title="Totaal Credentials"
                value={stats.totalCredentials}
                icon={FileText}
                color="bg-[#383EDE]"
            />
            <StatCard
                title="Verlopen Binnen 30 Dagen"
                value={stats.expiringCredentials}
                icon={Clock}
                color="bg-[#383EDE]"
            />
            <StatCard
                title="Totaal Gebruikers"
                value={stats.totalUsers}
                icon={Users}
                color="bg-[#383EDE]"
            />
            <StatCard
                title="Activiteiten Deze Week"
                value={stats.weeklyActivities}
                icon={Activity}
                color="bg-[#383EDE]"
            />
        </div>
    )
}

export default StatsOverview 