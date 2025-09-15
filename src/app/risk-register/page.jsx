'use client'

import useLocalStorage from '@/hooks/useLocalStorage';
import React, { useState } from 'react';
import SlideAlert from '@/components/SlideAlert';
import { emptyRiskRow } from '@/constants/riskRegister';
import Instructions from '@/components/risk-register/Instructions';
import RiskMatrix from '@/components/risk-register/RiskMatrix';

export default function RiskRegister () {
    // Initialize with 10 empty rows
    const [risks, setRisks] = useLocalStorage('risks',
        Array.from({ length: 5 }, (_, index) => ({
            id: index + 1,
            ...emptyRiskRow
        }))
    );
    const [alert, setAlert] = useState({message: "", severity: ""});

    const handleInputChange = (index, field, value) => {
        const updatedRisks = [...risks];
        
        // Auto-calculate rating when likelihood or consequence changes
        if (field === 'likelihood' || field === 'consequence') {
            const likelihood = field === 'likelihood' ? parseInt(value) : updatedRisks[index].likelihood;
            const consequence = field === 'consequence' ? parseInt(value) : updatedRisks[index].consequence;
            updatedRisks[index].rating = likelihood * consequence;
        }

        // Auto-calculate mitigated rating when mitigated likelihood or mitigated consequence changes
        if (field === 'mitigatedLikelihood' || field === 'mitigatedConsequence') {
            if (updatedRisks[index].mitigation.trim() === '') {
                // No mitigation is provided. Don't let the user change the mitigation risk scores.
                // Show an error message.
                setAlert({message: "Please provide a mitigation strategy before setting mitigated risk scores.", severity: "error"});
                return;
            }

            // If mitigation is provided, set the mitigated risk scores.
            const mitigatedLikelihood = field === 'mitigatedLikelihood' ? parseInt(value) : updatedRisks[index].mitigatedLikelihood;
            const mitigatedConsequence = field === 'mitigatedConsequence' ? parseInt(value) : updatedRisks[index].mitigatedConsequence;
            updatedRisks[index].mitigatedRating = mitigatedLikelihood * mitigatedConsequence;
        }

        // Set the specific field value
        updatedRisks[index] = { ...updatedRisks[index], [field]: value };
        
        setRisks(updatedRisks);
    };

    // Function to get color class based on score.
    const getScoreColor = (value, max) => {
        const ratio = Math.ceil(value / max * 5);

        switch(ratio) {
            case 1: return 'bg-green-100 text-green-800';
            case 2: return 'bg-green-100 text-green-900';
            case 3: return 'bg-yellow-100 text-yellow-800';
            case 4: return 'bg-orange-100 text-orange-800';
            case 5: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const addNewRow = () => {
        const newRisk = {
            id: risks.length + 1,
            ...emptyRiskRow
        };

        setRisks([...risks, newRisk]);
    };

  return (
    <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-8 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Register</h1>
                    <p className="text-gray-600">Identify, assess, and manage design-related risks for your project.</p>
                </div>

                <div className='flex flex-col xl:flex-row gap-4'>
                    {/* Instructions */}
                    <Instructions />

                    {/* Risk Matrix */}
                    <RiskMatrix />
                </div>
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
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                    ID
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48">
                                    Risk Title
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                                    Risk Description
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                                    Likelihood
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                                    Consequence
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                                    Rating
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                    Mitigate By
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-38">
                                    Owner
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">
                                    Mitigation
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                                    Mitigated Likelihood
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                                    Mitigated Consequence
                                </th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                                    Mit. Rating
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {risks.map((risk, index) => (
                            <tr key={risk.id} className="hover:bg-gray-50">
                                {/* ID */}
                                <td className="px-2 py-1 whitespace-nowrap text-xs font-medium text-gray-900">
                                {risk.id}
                                </td>
                                
                                {/* Risk Title */}
                                <td className="px-2 py-1">
                                <textarea
                                    type="text"
                                    value={risk.title}
                                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                    placeholder="Enter risk title..."
                                    className="w-full min-h-10 px-2 border border-gray-300 align-middle resize-none field-sizing-content overflow-hidden text-wrap rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                />
                                </td>
                                
                                {/* Risk Description */}
                                <td className="px-2 py-1">
                                <textarea
                                    type="text"
                                    value={risk.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    placeholder="Describe the risk..."
                                    className="w-full min-h-10 px-2 border border-gray-300 rounded align-middle text-xs resize-none field-sizing-content overflow-hidden text-wrap focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                />
                                </td>
                                
                                {/* Likelihood */}
                                <td className="px-2 py-1">
                                <select
                                    value={risk.likelihood}
                                    onChange={(e) => handleInputChange(index, 'likelihood', e.target.value)}
                                    className={`w-full h-10 px-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${getScoreColor(risk.likelihood, 5)}`}
                                >
                                    <option value={1} className={getScoreColor(1, 5)}>1 - Very Low</option>
                                    <option value={2} className={getScoreColor(2, 5)}>2 - Low</option>
                                    <option value={3} className={getScoreColor(3, 5)}>3 - Medium</option>
                                    <option value={4} className={getScoreColor(4, 5)}>4 - High</option>
                                    <option value={5} className={getScoreColor(5, 5)}>5 - Very High</option>
                                </select>
                                </td>
                                
                                {/* Consequence */}
                                <td className="px-2 py-1">
                                <select
                                    value={risk.consequence}
                                    onChange={(e) => handleInputChange(index, 'consequence', e.target.value)}
                                    className={`w-full h-10 px-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${getScoreColor(risk.consequence, 5)}`}
                                >
                                    <option value={1}>1 - Negligible</option>
                                    <option value={2}>2 - Minor</option>
                                    <option value={3}>3 - Moderate</option>
                                    <option value={4}>4 - Major</option>
                                    <option value={5}>5 - Severe</option>
                                </select>
                                </td>
                                
                                {/* Rating */}
                                <td className="px-2 py-1">
                                <span className={`inline-flex items-center justify-center w-full h-8 px-2 rounded text-xs font-medium ${getScoreColor(risk.rating, 25)}`}>
                                    {risk.rating}
                                </span>
                                </td>

                                {/* Mitigate By */}
                                <td className="px-2 py-1">
                                <input
                                    type="date"
                                    value={risk.mitigateBy}
                                    onChange={(e) => handleInputChange(index, 'mitigateBy', e.target.value)}
                                    className="w-full h-10 px-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                />
                                </td>

                                {/* Owner */}
                                <td className="px-2 py-1">
                                <textarea
                                    type="text"
                                    value={risk.owner}
                                    onChange={(e) => handleInputChange(index, 'owner', e.target.value)}
                                    placeholder="Owner name..."
                                    className="w-full h-10 px-2 border border-gray-300 align-middle resize-none field-sizing-content overflow-hidden text-wrap rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                />
                                </td>

                                {/* Mitigation */}
                                <td className="px-2 py-1">
                                <textarea
                                    type="text"
                                    value={risk.mitigation}
                                    onChange={(e) => handleInputChange(index, 'mitigation', e.target.value)}
                                    placeholder="Mitigation strategy..."
                                    className="w-full h-10 px-2 border border-gray-300 align-middle resize-none field-sizing-content overflow-hidden text-wrap rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                />
                                </td>
                                
                                {/* Mitigated Likelihood */}
                                <td className="px-2 py-1">
                                <select
                                    value={risk.mitigatedLikelihood}
                                    onChange={(e) => handleInputChange(index, 'mitigatedLikelihood', e.target.value)}
                                    className={`w-full h-10 px-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${getScoreColor(risk.mitigatedLikelihood, 5)}`}
                                >
                                    <option value={1}>1 - Very Low</option>
                                    <option value={2}>2 - Low</option>
                                    <option value={3}>3 - Medium</option>
                                    <option value={4}>4 - High</option>
                                    <option value={5}>5 - Very High</option>
                                </select>
                                </td>
                                
                                {/* Mitigated Consequence */}
                                <td className="px-2 py-1">
                                <select
                                    value={risk.mitigatedConsequence}
                                    onChange={(e) => handleInputChange(index, 'mitigatedConsequence', e.target.value)}
                                    className={`w-full h-10 px-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${getScoreColor(risk.mitigatedConsequence, 5)}`}
                                >
                                    <option value={1}>1 - Negligible</option>
                                    <option value={2}>2 - Minor</option>
                                    <option value={3}>3 - Moderate</option>
                                    <option value={4}>4 - Major</option>
                                    <option value={5}>5 - Severe</option>
                                </select>
                                </td>
                                
                                {/* Mitigated Rating */}
                                <td className="px-2 py-1">
                                <span className={`inline-flex items-center justify-center w-full h-8 px-2 rounded text-xs font-medium ${getScoreColor(risk.mitigatedRating, 25)}`}>
                                    {risk.mitigatedRating}
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

        {/* Alert popup */}
        {alert.message && (
            <SlideAlert alertDetails={alert} setAlert={setAlert} />
        )}
    </div>
  );
};