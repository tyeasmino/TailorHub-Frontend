// FitMakerDashboard.js
import React, { useState } from 'react';
import Modal from '../Modal'; // Import the Modal component
import DepositForm from '../DepositForm'; // Import the DepositForm component

const FitMakerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">FitMaker Dashboard</h1>
      <button
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
    </div>
  );
};

export default FitMakerDashboard;
