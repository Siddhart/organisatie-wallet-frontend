import React, { useState, useEffect } from 'react'
import { getUsers } from '@/helpers/user'

//components
import PageMessage from '@/components/global/PageMessage'
import SearchBar from '@/components/global/SearchBar'
import UserTable from '@/components/user-table/UserTable'
import Tabs from '@/components/global/Tabs'

const tabs = [
  { id: 'all', name: 'Alle gebruikers' },
  { id: 'pending', name: 'Wachtend op goedkeuring' }
];

const UsersOverview = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const fetchedUsers = await getUsers()
        let filteredUsers = fetchedUsers
        
        // Filter by search
        if (search !== "") {
          filteredUsers = filteredUsers.filter(user =>
            user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.position?.toLowerCase().includes(search.toLowerCase())
          )
        }

        // Filter by tab
        if (activeTab === 'all') {
          filteredUsers = filteredUsers.filter(user => user.verificationState === 1)
        } else if (activeTab === 'pending') {
          filteredUsers = filteredUsers.filter(user => user.verificationState === 0)
        }

        setUsers(filteredUsers)
      } catch (err) {
        setError('Er is een fout opgetreden bij het ophalen van de gebruikers.')
        console.error('Error fetching users:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
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

          {error ? (
            <div className="text-red-500 text-center mt-4">{error}</div>
          ) : isLoading ? (
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