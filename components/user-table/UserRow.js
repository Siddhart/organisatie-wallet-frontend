import React from 'react'
import { HiOutlineChevronRight, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'

const UserRow = ({ user }) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-[#383EDE] flex items-center justify-center text-white font-semibold">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </div>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.lastLogin}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <HiOutlinePencil className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <HiOutlineTrash className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-[#383EDE] transition-colors">
                        <HiOutlineChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

const getRoleColor = (role) => {
    switch (role) {
        case 'Eigenaar':
            return 'bg-blue-100 text-blue-800';
        case 'Developer':
            return 'bg-purple-100 text-purple-800';
        case 'HR':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default UserRow