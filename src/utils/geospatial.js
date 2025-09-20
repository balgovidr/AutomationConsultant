export const getCategoryBadge = (category) => {
    const config = {
      project: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Project' },
      document: { bg: 'bg-green-100', text: 'text-green-800', label: 'Document' },
      drawing: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Drawing' },
      borehole: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Borehole' }
    };
    
    const { bg, text, label } = config[category] || { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
        {label}
      </span>
    );
};