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
import { LuClipboardList } from "react-icons/lu";




const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Toggle the sidebar collapse/expand state
  const toggleSidebar = () => setCollapsed(!collapsed);

  // Check if the current page is the dashboard, profile, or inventory page
  const isOnProtectedPage = location.pathname === '/dashboard' || location.pathname === '/profile' || location.pathname === '/inventory' || location.pathname === '/orders';

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
            data-tour-element='dashboard'
            to="/dashboard"
            className={`flex items-center gap-2 ${location.pathname === "/dashboard" ? "bg-white dark:bg-transparent p-4 shadow font-semibold" : ""}`}
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
            data-tour-element='profile'
            to="/profile"
            className={`flex items-center gap-2 ${location.pathname === "/profile" ? "bg-white  dark:bg-transparent md:p-4 shadow font-semibold" : ""}`}
          >
            <TbMoodEdit
              className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
            />
            {/* Show tooltip only when collapsed */}
            <span
              className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white   rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
            >
              Profile
            </span>
            {!collapsed && <span className="ml-2">Profile</span>}
          </Link>
        </li>

        {user && user.fitMaker ? (
          <>
            {/* <li className="relative group">
              <Link
              data-tour-element='dress'
                to="/dress"
                className={`flex items-center gap-2 ${location.pathname === "/dress" ? "bg-white  dark:bg-transparent p-4 shadow font-semibold" : ""}`}
              >
                <IoShirtOutline
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Dress
                </span>
                {!collapsed && <span className="ml-2">Dress</span>}
              </Link>
            </li> */}
            <li className="relative group">
              <Link
              data-tour-element='inventory'
                to="/inventory"
                className={`flex items-center gap-2 ${location.pathname === "/inventory" ? "bg-white  dark:bg-transparent p-4 shadow font-semibold" : ""}`}
              >
                <MdOutlineInventory
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white  rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Inventory
                </span>
                {!collapsed && <span className="ml-2">Inventory</span>}
              </Link>
            </li>
            <li className="relative group">
              <Link
              data-tour-element='inventory-movement'
                to="/inventory-movement"
                className={`flex items-center gap-2 ${location.pathname === "/inventory-movement" ? "bg-white  dark:bg-transparent p-4 shadow font-semibold" : ""}`}
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
              data-tour-element='measurement'
                to="/measurement"
                className={`flex items-center gap-2 ${location.pathname === "/measurement" ? "bg-white  dark:bg-transparent p-4 shadow font-semibold" : ""}`}
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

        <li className="relative group">
          <Link
          data-tour-element='orders'
            to="/orders"
            className={`flex items-center gap-2 ${location.pathname === "/orders" ? "bg-white  dark:bg-transparent md:p-4 shadow font-semibold" : ""}`}
          > 
            <LuClipboardList
              className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
            />
            <span
              className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
            >
              Orders
            </span>
            {!collapsed && <span className="ml-2">Orders</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
