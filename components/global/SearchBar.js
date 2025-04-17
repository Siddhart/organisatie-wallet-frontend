import React, { useState } from 'react'
import { HiSearch } from 'react-icons/hi'

const SearchBar = ({title, state, setState}) => {
    const [searchValue, setSearchValue] = useState(state);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        setState(e.target.value);
    };

    return (
        <div className="mb-6">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#383EDE] focus:border-transparent sm:text-sm"
                    placeholder="Zoeken op naam, e-mail of rol..."
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
        </div>
    )
}

export default SearchBar