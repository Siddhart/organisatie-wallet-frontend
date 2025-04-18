import React, { useState } from 'react'
import KeyValue from '@/components/card-info/KeyValue'
import CrossSvg from '@/assets/icons/CrossSvg'

const UserDetailsPopupContent = ({ user, setPopup }) => {
  const [activeTab, setActiveTab] = useState('general')
  const [selectedRole, setSelectedRole] = useState(user.role)

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
          <div className="flex flex-col gap-3">
            <KeyValue title="Naam" value={`${user.firstName} ${user.lastName}`} />
            <KeyValue title="E-mail" value={user.email} />
            <KeyValue title="Rol" value={user.role} />
            <KeyValue title="Laatste login" value={user.lastLogin} />
          </div>
        );
      case 'roles':
        return (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">Selecteer een rol voor deze gebruiker:</p>
            {roles.map((role) => (
              <div
                key={role.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedRole === role.id
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
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedRole === role.id
                      ? 'border-[#383EDE] bg-[#383EDE]'
                      : 'border-gray-300'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        );
      case 'actions':
        return (
          <div className="flex flex-col gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-semibold">Gevaarlijke acties</h3>
              <p className="text-sm text-red-600 mt-1">Deze acties kunnen niet ongedaan worden gemaakt.</p>
            </div>
            <button className="w-full bg-[#AB0065] text-white py-2 px-4 rounded-lg hover:bg-[#900055] transition-colors flex items-center justify-center gap-2">
              <span className="font-bold">Gebruiker verwijderen</span>
              <CrossSvg color="white" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderActionButton = () => {
    if (activeTab === 'roles') {
      return (
        <button 
          className="w-full bg-[#383EDE] text-white py-2 px-4 rounded-lg hover:bg-[#2E32B8] transition-colors flex items-center justify-center gap-2"
        >
          <span className="font-bold">Rol opslaan</span>
        </button>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-4 bg-[#F5F4F9] pr-4">
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

      {/* Fixed Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-4" aria-label="Tabs">
          {[
            { id: 'general', name: 'Algemeen' },
            { id: 'roles', name: 'Rollen' },
            { id: 'actions', name: 'Acties' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="py-4">
          {renderTabContent()}
        </div>
      </div>

      {/* Fixed Action Button */}
      {renderActionButton() && (
        <div className="px-4 py-4 border-t border-gray-200 bg-white">
          {renderActionButton()}
        </div>
      )}
    </div>
  )
}

export default UserDetailsPopupContent 