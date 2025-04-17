import React from 'react'
import { HiPlus } from 'react-icons/hi'

//components
import UserRow from './UserRow';

const UserTable = ({users}) => {
    return (
        <div className="relative pb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Gebruikers</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#383EDE] text-white rounded-lg hover:bg-[#2e32b3] transition-colors">
                    <HiPlus className="w-5 h-5" />
                    <span>Gebruiker toevoegen</span>
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Naam
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    E-mail
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Rol
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Laatste aanmelding
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Acties
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users?.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        Geen gebruikers gevonden
                                    </td>
                                </tr>
                            ) : (
                                users?.map((user, index) => (
                                    <UserRow key={index} user={user} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserTable