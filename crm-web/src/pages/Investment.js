import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';

const Investment = () => {
  const [investmentType, setInvestmentType] = useState('One-Time');
  const { currency } = useSelector((state) => state.currency);
  const [amounts, setAmounts] = useState({
    environment: 0,
    health: 0,
    education: 0,
    childWelfare: 0,
    animalWelfare: 0,
    disability: 0,
  });

  // Calculate the total amount
  const totalAmount = Object.values(amounts).reduce((acc, val) => acc + parseFloat(val || 0), 0);

  // Handle amount change for each card
  const handleAmountChange = (e, category) => {
    setAmounts({
      ...amounts,
      [category]: e.target.value,
    });
  };

  // Card data with descriptions
  const cardsData = [
    {
      label: 'Environment',
      key: 'environment',
      description:
        'Contribute to causes like wildlife conservation, climate change mitigation, afforestation, and waste management by supporting environmental NGOs.',
    },
    {
      label: 'Health',
      key: 'health',
      description:
        'Donate to these organizations to support medical treatments, research for cures, healthcare infrastructure development, and pandemic relief efforts.',
    },
    {
      label: 'Education',
      key: 'education',
      description:
        'Support initiatives such as providing scholarships, building schools, vocational training, education to the underprivileged, and digital education programs.',
    },
    {
      label: 'Child Welfare',
      key: 'childWelfare',
      description:
        'Your donations can aid in child adoption, orphanage support, child nutrition programs, and child rights advocacy.',
    },
    {
      label: 'Animal Welfare',
      key: 'animalWelfare',
      description:
        'Contribute to causes like animal rescue, wildlife rehabilitation, anti-poaching efforts, and promoting cruelty-free practices.',
    },
    {
      label: 'Disability',
      key: 'disability',
      description:
        'By donating, you can assist in providing assistive devices, accessibility infrastructure, rehabilitation, and vocational training for people with disabilities.',
    },
  ];

  return (
    <div>
        <Navbar/>
        <div className="p-10">
        {/* Toggle Section */}
            <div className="flex justify-center mb-8">
                <button
                className={`px-6 py-2 text-white rounded-l ${
                    investmentType === 'One-Time' ? 'bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => setInvestmentType('One-Time')}
                >
                One-Time
                </button>
                <button
                className="px-6 py-2 text-white rounded-r bg-gray-300 cursor-not-allowed"
                disabled
                >
                Monthly
                </button>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-3 gap-20 mb-6">
                {cardsData.map(({ label, key, description }) => (
                <div
                    key={key}
                    className="p-4 bg-white shadow-md rounded-md flex flex-col justify-between items-center"
                >
                    <h3 className="text-lg underline text-center font-semibold mb-6">{label}</h3>
                    <p className="text-sm text-gray-600 mb-4">{description}</p>
                    <div className="w-full flex items-center">
                        <span className="mr-2">{currency.symbol}</span>
                        <input
                            type="number"
                            min="0"
                            value={amounts[key]}
                            onChange={(e) => handleAmountChange(e, key)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter amount"
                        />
                    </div>
                </div>
                ))}
            </div>

            {/* Total Investment Amount */}
            <div className="flex justify-end items-center mb-4">
                <span className="text-lg font-semibold mr-4">Total Investment Amount:</span>
                <div className="flex items-center">
                <span className="mr-2">{currency.symbol}</span>
                <input
                    type="number"
                    value={totalAmount}
                    readOnly
                    className="p-2 border border-gray-300 rounded w-40 text-right"
                />
            </div>
            </div>

            {/* Pay Now Button */}
            <div className="flex justify-end">
                <button className="px-6 py-3 bg-primary text-white rounded transition hover:opacity-90">
                Pay Now
                </button>
            </div>
        </div>
    </div>
  );
};

export default Investment;