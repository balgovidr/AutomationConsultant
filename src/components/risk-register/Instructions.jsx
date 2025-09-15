export default function Instructions() {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex-grow">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">How to Use This Risk Register</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-medium text-blue-800 mb-2">1. Risk Assessment</h3>
                    <ul className="text-sm text-blue-700 space-y-1 mb-4">
                        <li>• Enter a clear <strong>Risk Title</strong> and detailed <strong>Description</strong></li>
                        <li>• Rate <strong>Likelihood</strong> (1-5): How probable is this risk?</li>
                        <li>• Rate <strong>Consequence</strong> (1-5): How severe would the impact be?</li>
                        <li>• <strong>Risk Rating</strong> auto-calculates (Likelihood × Consequence)</li>
                    </ul>
                    
                    <h3 className="font-medium text-blue-800 mb-2">2. Risk Management</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Set <strong>Mitigate By</strong> date for target completion</li>
                        <li>• Assign an <strong>Owner</strong> responsible for the risk</li>
                        <li>• Define <strong>Mitigation</strong> strategy or action plan</li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="font-medium text-blue-800 mb-2">3. Post-Mitigation Assessment</h3>
                    <ul className="text-sm text-blue-700 space-y-1 mb-4">
                        <li>• By default, mitigated values match original risk scores</li>
                        <li>• Once mitigation is defined, adjust <strong>Mitigated Likelihood</strong> and <strong>Consequence</strong></li>
                        <li>• <strong>Mitigated Rating</strong> shows residual risk after mitigation</li>
                    </ul>
                    
                    <h3 className="font-medium text-blue-800 mb-2">4. Color Coding</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Likelihood and Consequence fields are color-coded by severity</li>
                        <li>• Risk ratings uses the Risk Assessment Matrix below for priority assessment</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}