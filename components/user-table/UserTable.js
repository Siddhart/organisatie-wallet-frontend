import React from 'react'
import { HiPlus } from 'react-icons/hi'

//components
import UserRow from './UserRow';

const UserTable = ({users, onUserClick}) => {
    return (
        <div className="mt-4 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-700">Gebruikers</h2>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#383EDE] text-white rounded-lg hover:bg-[#2e32b3] transition-colors">
                                <HiPlus className="w-5 h-5" />
                                <span>Gebruiker toevoegen</span>
                            </button>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Naam
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rol
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Laatste aanmelding
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        
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
                                        <UserRow key={index} user={user} onUserClick={onUserClick} />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserTable