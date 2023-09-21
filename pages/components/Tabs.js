// components/Tabs.js
import { useState } from 'react';

const Tabs = ({ tabs, initialActiveTab }) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ul className="tab-list">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-pane ${activeTab === tab ? 'active' : ''}`}
          >
            {/* Content for each tab */}
            {activeTab === tab && <div>{tab} Content</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
