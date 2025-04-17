import React, { useState, useEffect } from 'react'

//components
import PageMessage from '@/components/global/PageMessage'
import SearchBar from '@/components/global/SearchBar'
import UserTable from '@/components/user-table/UserTable'
import Tabs from '@/components/global/Tabs'

const originalUsers = [
  { firstName: 'Siddhart', lastName: 'Ghogli', email: 'siddhart.ghogli@kvk.nl', role: 'Eigenaar', lastLogin: 'Maandag 24 Februari, 23:10', status: 'approved' },
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@kvk.nl', role: 'Developer', lastLogin: 'Donderdag 20 Februari, 15:20', status: 'approved' },
  { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@kvk.nl', role: 'HR', lastLogin: 'Zaterdag 22 Februari, 12:37', status: 'approved' },
  { firstName: 'Pending', lastName: 'User', email: 'pending.user@kvk.nl', role: 'Developer', lastLogin: 'N/A', status: 'pending' },
];

const tabs = [
  { id: 'all', name: 'Alle gebruikers' },
  { id: 'pending', name: 'Wachtend op goedkeuring' }
];

const UsersOverview = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [users, setUsers] = useState(originalUsers)
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      let filteredUsers = originalUsers
      
      // Filter by search
      if (search !== "") {
        filteredUsers = filteredUsers.filter(user =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase())
        )
      }

      // Filter by tab
      if (activeTab === 'all') {
        filteredUsers = filteredUsers.filter(user => user.status === 'approved')
      } else if (activeTab === 'pending') {
        filteredUsers = filteredUsers.filter(user => user.status === 'pending')
      }

      setUsers(filteredUsers)
      setIsLoading(false)
    }, 500)
  }, [search, activeTab])

  return (
    <div className='w-full'>
      <PageMessage
        title="Gebruikersbeheer"
        message="Op deze pagina beheerd u alle gebruikers van uw organisatie wallet. U kunt gebruikers toevoegen, bewerken en verwijderen."
      />

      <div className="mt-6">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
        <div className="mt-6">
          <SearchBar state={search} setState={setSearch} />

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#383EDE]"></div>
            </div>
          ) : (
            <UserTable users={users} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UsersOverview