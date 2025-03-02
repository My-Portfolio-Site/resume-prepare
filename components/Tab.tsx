'use client'

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Tab({ tabs, activeTab, onTabChange }: TabProps) {
  return (
    <div className="flex space-x-2 px-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-3 py-2 rounded-lg text-sm shrink flex ${
            activeTab === tab
              ? 'bg-green-400 text-white font-semibold'
              : 'bg-gray-200 text-gray-700 hover:bg-white'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
