import React, { useContext, useState } from 'react';
import { AiOutlineNodeCollapse, AiOutlineNodeExpand } from 'react-icons/ai';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdOutlineInventory } from 'react-icons/md';
import { LuTrendingUpDown } from 'react-icons/lu';
import { TbRulerMeasure } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { TbMoodEdit } from "react-icons/tb";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);  
  const location = useLocation();


  return (
    <div className={`sidebar bg-purple h-full p-4 fixed left-0 top-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Collapsibility Toggle */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <AiOutlineNodeExpand className="text-2xl" /> : <AiOutlineNodeCollapse className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-6">
        <li>
          <Link to="/dashboard" className={`flex items-center gap-2 ${location.pathname === "/dashboard" ? "border-b-2 border-pink" : ""}`}>
            <LuLayoutDashboard className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`} />
            {!collapsed && <span className="ml-2">Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/profile" className={`flex items-center gap-2 ${location.pathname === "/profile" ? "border-b-2 border-pink" : ""}`}>
            <TbMoodEdit className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`} />
            {!collapsed && <span className="ml-2">Profile</span>}
          </Link>
        </li>

        {user && user.fitMaker ? (
          <>
            <li>
              <Link to="/inventory" className={`flex items-center gap-2 ${location.pathname === "/inventory" ? "border-b-2 border-pink" : ""}`}>
                <MdOutlineInventory className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`} />
                {!collapsed && <span className="ml-2">Inventory</span>}
              </Link>
            </li>
            <li>
              <Link to="/inventory-movement" className={`flex items-center gap-2 ${location.pathname === "/inventory-movement" ? "border-b-2 border-pink" : ""}`}>
                <LuTrendingUpDown className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`} />
                {!collapsed && <span className="ml-2">Inventory Movement</span>}
              </Link>
            </li>
          </>
        ) : null}

        {user && user.fitFinder ? (
          <>
            <li>
              <Link to="/measurement" className={`flex items-center gap-2 ${location.pathname === "/measurement" ? "border-b-2 border-pink" : ""}`}>
                <TbRulerMeasure className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`} />
                {!collapsed && <span className="ml-2">Measurement</span>}
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default Sidebar;