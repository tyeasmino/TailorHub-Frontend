// FitMakerDashboard.js
import React, { useState } from 'react';
import Modal from '../Modal'; // Import the Modal component
import DepositForm from '../DepositForm'; // Import the DepositForm component
import { AiOutlineFileDone } from "react-icons/ai";
import { RiScissorsCutFill } from "react-icons/ri";
import { GiProfit } from "react-icons/gi";
import { MdTaskAlt } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";

import { TourProvider } from '@reactour/tour'
import StartTourButton from '../StartTourButton';

const FitMakerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const steps = [
    {
      selector: '[data-tour-element="dashboard"]',
      content: (
        <div>
          <p className='font-semibold text-lg mb-2'>
          🌟 Welcome to the Dashboard!
          </p>
          <p className=''>
           This is the main hub of your app where you can access all key features. Click here to view your overall progress and navigate to other important sections.
          </p>
          <p className='text-sm text-violet-400 mt-2'>
            Pro tip: Use keyboard shortcut */Ctrl + B to toggle
          </p>
        </div>
      ),
      position: () => [8, 130],
    },
    {
      selector: '[data-tour-element="deposit-toggle"]',
      content: '💰 The Deposit Toggle button allows you to quickly switch between your deposits. Click here to manage and review your deposit history, ensuring everything is up to date!',
    },
    {
      selector: '[data-tour-element="total-order"]',
      content: '📊 The Total Order Status shows you the sum of all your orders. You can get an overview of your business performance here and track your order metrics.',
    },
    {
      selector: '[data-tour-element="completed-order"]',
      content: '✅ The Completed Orders button lets you review all orders that have been successfully processed. Click here to analyze completed transactions and ensure your workflow is smooth.',
    },
    {
      selector: '[data-tour-element="profit"]',
      content: '💵 Profit is the heart of your success! Here, you can see how much you’re earning from your completed orders. Stay on top of your financial health by regularly checking this!',
    },
    {
      selector: '[data-tour-element="running-order"]',
      content: '⏳ Running Orders show you all current transactions in progress. Monitor these closely to ensure that everything is moving along as expected and no orders are delayed.',
    },
    
    // New steps for additional sidebar elements
    {
      selector: '[data-tour-element="profile"]',
      content: '👤 Your Profile is where you can view and update your personal information. Click here to make sure your details are accurate and up to date.',
    },
    {
      selector: '[data-tour-element="dress"]',
      content: '👗 The Dress section allows you to browse and manage your dress collection. Explore the options available and update your inventory!',
    },
    {
      selector: '[data-tour-element="inventory"]',
      content: '📦 The Inventory button shows you all the products you have in stock. You can easily add, remove, or update your products from here.',
    },
    {
      selector: '[data-tour-element="inventory-movement"]',
      content: '🔄 The Inventory Movement section tracks the flow of your products. Whether you’re restocking or sending products out, this will help you stay organized.',
    },
    // {
    //   selector: '[data-tour-element="measurement"]',
    //   content: '📏 Measurement helps you keep track of sizes and other product dimensions. Update the measurements as needed to maintain accuracy across your collection.',
    // },
    {
      selector: '[data-tour-element="orders"]',
      content: '📝 The Orders section shows you all pending and completed orders. Keep track of the status of each one and ensure timely processing.',
    },
  
    // Add any other elements
    // {
    //   selector: '[data-tour-element="support"]',
    //   content: '❓ Need help? The Support section is where you can find resources and contact customer service for assistance.',
    // },
    // {
    //   selector: '[data-tour-element="settings"]',
    //   content: '⚙️ Settings lets you customize your app preferences. Click here to adjust notification preferences, language settings, and more.',
    // },
    // {
    //   selector: '[data-tour-element="logout"]',
    //   content: '🚪 When you’re done, click here to logout securely. Make sure to log out when you’re finished for privacy and security.',
    // },
  ];
  

  const PTBadge = () => null

  return (
    <TourProvider 
      steps={steps}
      components={{
        Badge: PTBadge
      }}
      onClickClose={(e) => {
        e.setCurrentStep(0),
        e.setIsOpen(false)
      }}
    >
      <div className="p-6 font-sans bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-between">
          <div>FitMaker Dashboard </div>
          <div><StartTourButton/></div>
        </h1>
        <button
          data-tour-element='deposit-toggle'
          onClick={openModal}
          className="w-full sm:w-auto bg-violet-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-violet-600 transition duration-200 ease-in-out"
        >
          Add Deposit
        </button>

        {/* Show Modal only if isModalOpen is true */}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <DepositForm onClose={closeModal} />
          </Modal>
        )}

        <section className='flex gap-5 my-5'>
          <div data-tour-element='total-order' className='w-1/5 shadow shadow-violet-300 rounded p-5 flex flex-col items-center text-xl'> <MdOutlineAddTask className='text-[50px]' /> Total Orders <span>71</span> </div>
          <div data-tour-element='completed-order' className='w-1/5 shadow shadow-violet-300 rounded p-5 flex flex-col items-center text-xl'> <MdTaskAlt className='text-[50px]' /> Completed Orders <span>48</span> </div>
          <div data-tour-element='running-order' className='w-1/5 shadow shadow-violet-300 rounded p-5 flex flex-col items-center text-xl'> <RiScissorsCutFill className='text-[50px]' /> Running Orders <span>23</span> </div>
          <div className='w-1/5 shadow shadow-violet-300 rounded p-5 flex flex-col items-center text-xl'> <MdOutlineInventory className='text-[50px]' /> Inventory Items <span>425</span> </div>
          <div data-tour-element='profit' className='w-1/5 shadow shadow-violet-300 rounded p-5 flex flex-col items-center text-xl'> <GiProfit className='text-[50px]' /> Profits <span>2540</span> </div>
        </section>
      </div>
    </TourProvider>
  );
};

export default FitMakerDashboard;
