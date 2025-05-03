
import React, { useState } from 'react';

interface TabProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
}

const TabSection: React.FC<TabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
  
  return (
    <div className="w-full">
      <div className="flex overflow-x-auto no-scrollbar space-x-4 mb-8 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-primary text-white font-medium'
                : 'bg-secondary/50 hover:bg-secondary text-foreground/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="min-h-[200px]">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`transition-all duration-500 ${
              activeTab === tab.id 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 absolute -z-10 translate-y-4'
            }`}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabSection;
