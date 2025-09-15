export default function RiskMatrix() {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment Matrix</h2>
            <div className="flex flex-col md:flex-row xl:flex-col gap-4">
                <div className="overflow-x-auto">
                    <table className="text-xs border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2 bg-gray-100 font-medium">Risk Rating</th>
                                <th className="border border-gray-300 p-2 bg-gray-100 font-medium text-center" colSpan="5">
                                Consequence Level
                                </th>
                            </tr>
                            <tr>
                                <th className="border border-gray-300 p-2 bg-gray-100 font-medium">Likelihood</th>
                                <th className="border border-gray-300 p-2 bg-green-100 text-green-800 font-medium">1 - Negligible</th>
                                <th className="border border-gray-300 p-2 bg-green-200 text-green-900 font-medium">2 - Minor</th>
                                <th className="border border-gray-300 p-2 bg-yellow-100 text-yellow-800 font-medium">3 - Moderate</th>
                                <th className="border border-gray-300 p-2 bg-orange-100 text-orange-800 font-medium">4 - Major</th>
                                <th className="border border-gray-300 p-2 bg-red-100 text-red-800 font-medium">5 - Severe</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2 bg-red-100 text-red-800 font-medium">5 - Very High</td>
                                <td className="border border-gray-300 p-2 bg-yellow-100 text-yellow-800 text-center font-bold">5</td>
                                <td className="border border-gray-300 p-2 bg-orange-100 text-orange-800 text-center font-bold">10</td>
                                <td className="border border-gray-300 p-2 bg-orange-100 text-orange-800 text-center font-bold">15</td>
                                <td className="border border-gray-300 p-2 bg-red-100 text-red-800 text-center font-bold">20</td>
                                <td className="border border-gray-300 p-2 bg-red-100 text-red-800 text-center font-bold">25</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 bg-orange-100 text-orange-800 font-medium">4 - High</td>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 text-center font-bold">4</td>
                                <td className="border border-gray-300 p-2 bg-yellow-100 text-yellow-800 text-center font-bold">8</td>
                                <td className="border border-gray-300 p-2 bg-orange-100 text-orange-800 text-center font-bold">12</td>
                                <td className="border border-gray-300 p-2 bg-orange-100 text-orange-800 text-center font-bold">16</td>
                                <td className="border border-gray-300 p-2 bg-red-100 text-red-800 text-center font-bold">20</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 bg-yellow-100 text-yellow-800 font-medium">3 - Medium</td>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 text-center font-bold">3</td>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 text-center font-bold">6</td>
                                <td className="border border-gray-300 p-2 bg-yellow-100 text-yellow-800 text-center font-bold">9</td>
                                <td className="border border-gray-300 p-2 bg-orange-100 text-orange-800 text-center font-bold">12</td>
                                <td className="border border-gray-300 p-2 bg-orange-100 text-orange-800 text-center font-bold">15</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 bg-green-200 text-green-900 font-medium">2 - Low</td>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 text-center font-bold">2</td>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 text-center font-bold">4</td>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 text-center font-bold">6</td>
                                <td className="border border-gray-300 p-2 bg-yellow-100 text-yellow-800 text-center font-bold">8</td>
                                <td className="border border-gray-300 p-2 bg-orange-100 text-orange-800 text-center font-bold">10</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 font-medium">1 - Very Low</td>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 text-center font-bold">1</td>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 text-center font-bold">2</td>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 text-center font-bold">3</td>
                                <td className="border border-gray-300 p-2 bg-green-100 text-green-800 text-center font-bold">4</td>
                                <td className="border border-gray-300 p-2 bg-yellow-100 text-yellow-800 text-center font-bold">5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:content-start gap-4 text-xs">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-100 border border-gray-300 mr-2"></div>
                        <span><strong>Low Risk (1-4):</strong> Acceptable, monitor</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-100 border border-gray-300 mr-2"></div>
                        <span><strong>Medium Risk (5-9):</strong> Requires attention</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-orange-100 border border-gray-300 mr-2"></div>
                        <span><strong>High Risk (10-16):</strong> Priority mitigation</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-100 border border-gray-300 mr-2"></div>
                        <span><strong>Critical Risk (17+):</strong> Immediate action required</span>
                    </div>
                </div>
            </div>
        </div>
    )
}