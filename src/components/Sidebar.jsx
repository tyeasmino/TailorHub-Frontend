import React, { useContext, useState } from 'react';
import { AiOutlineNodeCollapse, AiOutlineNodeExpand } from 'react-icons/ai';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdOutlineInventory } from 'react-icons/md';
import { LuTrendingUpDown } from 'react-icons/lu';
import { TbRulerMeasure } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { TbMoodEdit } from "react-icons/tb";
import { IoShirtOutline } from "react-icons/io5";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);  
  const location = useLocation();

  // Toggle the sidebar collapse/expand state
  const toggleSidebar = () => setCollapsed(!collapsed);

  // Check if the current page is the dashboard, profile, or inventory page
  const isOnProtectedPage = location.pathname === '/dashboard' || location.pathname === '/profile' || location.pathname === '/inventory';

  return (
    <div
      className={`sidebar dark:bg-dark bg-purple h-full p-4 fixed left-0 top-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Collapsibility Toggle */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleSidebar}>
          {collapsed ? (
            <AiOutlineNodeExpand className="text-2xl" />
          ) : (
            <AiOutlineNodeCollapse className="text-2xl" />
          )}
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-6">
        <li className="relative group">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 ${location.pathname === "/dashboard" ? "bg-white p-4 shadow font-semibold" : ""}`}
          >
            <LuLayoutDashboard
              className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
            />
            {/* Show tooltip only when collapsed */}
            <span
              className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
            >
              Dashboard
            </span>
            {!collapsed && <span className="ml-2">Dashboard</span>}
          </Link>
        </li>
        <li className="relative group">
          <Link
            to="/profile"
            className={`flex items-center gap-2 ${location.pathname === "/profile" ? "bg-white md:p-4 shadow font-semibold" : ""}`}
          >
            <TbMoodEdit
              className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
            />
            {/* Show tooltip only when collapsed */}
            <span
              className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
            >
              Profile
            </span>
            {!collapsed && <span className="ml-2">Profile</span>}
          </Link>
        </li>

        {user && user.fitMaker ? (
          <>
            <li className="relative group">
              <Link
                to="/dress"
                className={`flex items-center gap-2 ${location.pathname === "/dress" ? "bg-white p-4 shadow font-semibold" : ""}`}
              >
                <IoShirtOutline 
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Dress
                </span>
                {!collapsed && <span className="ml-2">Dress</span>}
              </Link>
            </li>
            <li className="relative group">
              <Link
                to="/inventory"
                className={`flex items-center gap-2 ${location.pathname === "/inventory" ? "bg-white p-4 shadow font-semibold" : ""}`}
              >
                <MdOutlineInventory
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Inventory
                </span>
                {!collapsed && <span className="ml-2">Inventory</span>}
              </Link>
            </li>
            <li className="relative group">
              <Link
                to="/inventory-movement"
                className={`flex items-center gap-2 ${location.pathname === "/inventory-movement" ? "bg-white p-4 shadow font-semibold" : ""}`}
              >
                <LuTrendingUpDown
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Inventory Movement
                </span>
                {!collapsed && <span className="ml-2">Inventory Movement</span>}
              </Link>
            </li>
          </>
        ) : null}

        {user && user.fitFinder ? (
          <>
            <li className="relative group">
              <Link
                to="/measurement"
                className={`flex items-center gap-2 ${location.pathname === "/measurement" ? "bg-white p-4 shadow font-semibold" : ""}`}
              >
                <TbRulerMeasure
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Measurement
                </span>
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
