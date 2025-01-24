// DepositForm.js
import React, { useState } from 'react';
import axios from 'axios';

const DepositForm = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const depositData = {
      amount: parseFloat(amount),
    };

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token is missing');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/fitMakers/deposit/',
        depositData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        }
      );

      console.log('Deposit successful:', response);
      setLoading(false);
      setAmount('');
      onClose(); // Close the modal on success
    } catch (err) {
      setLoading(false);
      console.error('Error:', err);
      if (err.response) {
        setError(`Error: ${err.response.data.detail || 'Something went wrong.'}`);
      } else {
        setError('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Deposit</h2>
      <div>
        <label className="block text-gray-600 font-medium mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={handleDeposit}
        disabled={loading}
        className="w-full p-3 mt-4 bg-violet-500 text-white rounded-lg focus:outline-none disabled:bg-gray-400 hover:bg-violet-600"
      >
        {loading ? 'Processing...' : 'Deposit'}
      </button>
    </div>
  );
};

export default DepositForm;
