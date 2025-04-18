import React from 'react'
import { useRouter } from 'next/router'
import { HiChevronRight } from 'react-icons/hi'

const UserRow = ({ user }) => {
    const router = useRouter()

    const handleClick = (e) => {
        // Don't navigate if clicking action buttons
        if (e.target.closest('button')) {
            return
        }
        router.push(`/users/${user.id}`)
    }

    const getRoleColor = (role) => {
        switch (role.toLowerCase()) {
            case 'eigenaar':
                return 'bg-blue-100 text-blue-800'
            case 'developer':
                return 'bg-purple-100 text-purple-800'
            case 'hr':
                return 'bg-green-100 text-green-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    // Demo data for last login
    const getLastLogin = () => {
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        
        const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']
        const day = days[now.getDay()]
        
        return `${day}, ${formattedTime}`
    }

    return (
        <tr 
            onClick={handleClick}
            className="hover:bg-gray-50 cursor-pointer"
        >
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-[#383EDE] flex items-center justify-center text-white font-semibold">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </div>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                    {user.role}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {getLastLogin()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/users/${user.id}`)
                    }}
                    className="text-gray-400 hover:text-[#383EDE] transition-colors"
                >
                    <HiChevronRight className="h-5 w-5" />
                </button>
            </td>
        </tr>
    )
}

export default UserRow