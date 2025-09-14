'use client'

import React, { useState } from 'react';

const RiskRegister = () => {
  // Initialize with 10 empty rows
  const [risks, setRisks] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: '',
      description: '',
      likelihood: 1,
      consequence: 1,
      rating: 1
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updatedRisks = [...risks];
    updatedRisks[index] = { ...updatedRisks[index], [field]: value };
    
    // Auto-calculate rating when likelihood or consequence changes
    if (field === 'likelihood' || field === 'consequence') {
      const likelihood = field === 'likelihood' ? parseInt(value) : updatedRisks[index].likelihood;
      const consequence = field === 'consequence' ? parseInt(value) : updatedRisks[index].consequence;
      updatedRisks[index].rating = likelihood * consequence;
    }
    
    setRisks(updatedRisks);
  };

  const getRatingColor = (rating) => {
    if (rating <= 4) return 'bg-green-100 text-green-800';
    if (rating <= 9) return 'bg-yellow-100 text-yellow-800';
    if (rating <= 16) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const addNewRow = () => {
    const newRisk = {
      id: risks.length + 1,
      title: '',
      description: '',
      likelihood: 1,
      consequence: 1,
      rating: 1
    };
    setRisks([...risks, newRisk]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Register</h1>
          <p className="text-gray-600">Identify, assess, and manage design-related risks for your project.</p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Total Risks: {risks.length}</span>
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-100 rounded mr-1"></div>
                <span>Low (1-4)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-100 rounded mr-1"></div>
                <span>Medium (5-9)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-100 rounded mr-1"></div>
                <span>High (10-16)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-100 rounded mr-1"></div>
                <span>Critical (17+)</span>
              </div>
            </div>
          </div>
          <button
            onClick={addNewRow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Add New Risk
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48">
                    Risk Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                    Risk Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    Likelihood
                    <div className="text-xs font-normal text-gray-400">(1-5)</div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    Consequence
                    <div className="text-xs font-normal text-gray-400">(1-5)</div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {risks.map((risk, index) => (
                  <tr key={risk.id} className="hover:bg-gray-50">
                    {/* ID */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {risk.id}
                    </td>
                    
                    {/* Risk Title */}
                    <td className="px-4 py-4">
                      <input
                        type="text"
                        value={risk.title}
                        onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                        placeholder="Enter risk title..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    
                    {/* Risk Description */}
                    <td className="px-4 py-4">
                      <textarea
                        value={risk.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                        placeholder="Describe the risk in detail..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </td>
                    
                    {/* Likelihood */}
                    <td className="px-4 py-4">
                      <select
                        value={risk.likelihood}
                        onChange={(e) => handleInputChange(index, 'likelihood', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={1}>1 - Very Low</option>
                        <option value={2}>2 - Low</option>
                        <option value={3}>3 - Medium</option>
                        <option value={4}>4 - High</option>
                        <option value={5}>5 - Very High</option>
                      </select>
                    </td>
                    
                    {/* Consequence */}
                    <td className="px-4 py-4">
                      <select
                        value={risk.consequence}
                        onChange={(e) => handleInputChange(index, 'consequence', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={1}>1 - Negligible</option>
                        <option value={2}>2 - Minor</option>
                        <option value={3}>3 - Moderate</option>
                        <option value={4}>4 - Major</option>
                        <option value={5}>5 - Severe</option>
                      </select>
                    </td>
                    
                    {/* Rating */}
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRatingColor(risk.rating)}`}>
                        {risk.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Risk Summary: {risks.filter(r => r.rating <= 4).length} Low, {risks.filter(r => r.rating >= 5 && r.rating <= 9).length} Medium, {risks.filter(r => r.rating >= 10 && r.rating <= 16).length} High, {risks.filter(r => r.rating >= 17).length} Critical
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskRegister;