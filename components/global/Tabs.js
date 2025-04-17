import React from 'react';

const Tabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
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
  );
};

export default Tabs; 