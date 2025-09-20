'use client'

import React, { useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DescriptionIcon from '@mui/icons-material/Description';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import LayersIcon from '@mui/icons-material/Layers';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PlaceIcon from '@mui/icons-material/Place';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';
import "leaflet/dist/leaflet.css";
import MapView from '@/components/geospatial/MapView';

export default function GISPlatformLayout() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data with clear categorization
  const allItems = [
    // Projects
    {
      id: 'p1',
      category: 'project',
      name: "Bridge Foundation Study",
      location: "Downtown Bridge Site",
      date: "2024-03-15",
      engineer: "Sarah Chen",
      status: "Completed",
      type: "Geotechnical",
      coordinates: [51.5074, -0.1278],
      itemCount: 8,
      description: "Comprehensive geotechnical analysis for new bridge construction"
    },
    {
      id: 'p2',
      category: 'project',
      name: "High-Rise Building Analysis",
      location: "Commercial District",
      date: "2024-01-20",
      engineer: "Mike Johnson",
      status: "Active",
      type: "Structural",
      coordinates: [51.5155, -0.0922],
      itemCount: 12,
      description: "Structural assessment for 40-story commercial building"
    },
    // Documents
    {
      id: 'd1',
      category: 'document',
      name: "Soil Analysis Report",
      location: "Downtown Bridge Site",
      date: "2024-03-15",
      engineer: "Sarah Chen",
      projectRef: "Bridge Foundation Study",
      fileType: "PDF",
      size: "2.4 MB",
      coordinates: [51.5074, -0.1278],
      description: "Laboratory soil testing results and recommendations"
    },
    {
      id: 'd2',
      category: 'document',
      name: "Environmental Impact Assessment",
      location: "Commercial District", 
      date: "2024-02-10",
      engineer: "Lisa Park",
      projectRef: "High-Rise Building Analysis",
      fileType: "PDF",
      size: "5.8 MB",
      coordinates: [51.5155, -0.0922],
      description: "Environmental compliance report and mitigation measures"
    },
    // Drawings
    {
      id: 'dr1',
      category: 'drawing',
      name: "Site Survey Plan",
      location: "Downtown Bridge Site",
      date: "2024-03-10",
      engineer: "Tom Wilson",
      projectRef: "Bridge Foundation Study",
      fileType: "DWG",
      size: "1.8 MB",
      scale: "1:500",
      coordinates: [51.5074, -0.1278],
      description: "Topographic survey with existing utilities"
    },
    {
      id: 'dr2',
      category: 'drawing',
      name: "Foundation Details",
      location: "Commercial District",
      date: "2024-02-15",
      engineer: "Anna Rodriguez",
      projectRef: "High-Rise Building Analysis",
      fileType: "DWG",
      size: "3.2 MB",
      scale: "1:100",
      coordinates: [51.5155, -0.0922],
      description: "Detailed foundation design and reinforcement layout"
    },
    // Boreholes
    {
      id: 'b1',
      category: 'borehole',
      name: "BH-001",
      location: "Downtown Bridge Site",
      date: "2024-03-12",
      engineer: "Sarah Chen",
      projectRef: "Bridge Foundation Study",
      depth: "15.0m",
      coordinates: [51.5074, -0.1278],
      description: "Primary borehole at north pier location"
    },
    {
      id: 'b2',
      category: 'borehole',
      name: "BH-002", 
      location: "Downtown Bridge Site",
      date: "2024-03-13",
      engineer: "Sarah Chen",
      projectRef: "Bridge Foundation Study",
      depth: "18.5m",
      coordinates: [51.5076, -0.1275],
      description: "Secondary borehole at south pier location"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Items', icon: FolderOpenIcon, color: 'gray' },
    { id: 'project', label: 'Projects', icon: ApartmentIcon, color: 'blue' },
    { id: 'document', label: 'Documents', icon: DescriptionIcon, color: 'green' },
    { id: 'drawing', label: 'Drawings', icon: ArchitectureIcon, color: 'purple' },
    { id: 'borehole', label: 'Boreholes', icon: LayersIcon, color: 'orange' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.category === selectedCategory);

  const getItemIcon = (category, size = 20) => {
    switch(category) {
      case 'project': return <ApartmentIcon size={size} className="text-blue-600" />;
      case 'document': return <DescriptionIcon size={size} className="text-green-600" />;
      case 'drawing': return <ArchitectureIcon size={size} className="text-purple-600" />;
      case 'borehole': return <LayersIcon size={size} className="text-orange-600" />;
      default: return <FolderOpenIcon size={size} className="text-gray-600" />;
    }
  };

  const getCategoryBadge = (category) => {
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

  return (
    <div className="h-screen flex flex-1 bg-gray-50">
      {/* Sidebar */}
      <div className="w-96 bg-white flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-400">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search across all items..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <FilterAltIcon size={16} />
              <span>Filters</span>
            </button>
            <span className="text-sm text-gray-500">{filteredItems.length} items</span>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 bg-gray-50 border-b border-gray-400">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select className="w-full border rounded px-3 py-1 text-sm">
                  <option>All Dates</option>
                  <option>Last 30 days</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Engineer</label>
                <select className="w-full border rounded px-3 py-1 text-sm">
                  <option>All Engineers</option>
                  <option>Sarah Chen</option>
                  <option>Mike Johnson</option>
                  <option>Lisa Park</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" placeholder="Filter by location..." className="w-full border rounded px-3 py-1 text-sm" />
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex-shrink-0 border-b border-gray-400 bg-gray-50">
          <nav className="flex flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                  selectedCategory === category.id
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                <category.icon size={16} />
                <span>{category.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Category Summary */}
        <div className="p-4 bg-blue-50 border-b border-gray-400">
          <div className="text-sm">
            <div className="font-medium text-gray-900 mb-2">
              Viewing: {categories.find(c => c.id === selectedCategory)?.label || 'All Items'}
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              {categories.slice(1).map((category) => {
                const count = allItems.filter(item => item.category === category.id).length;
                return (
                  <div key={category.id} className="flex items-center space-x-1">
                    <category.icon size={12} />
                    <span>{count} {category.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedItem?.id === item.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getItemIcon(item.category, 18)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      {getCategoryBadge(item.category)}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <PlaceIcon size={12} className="mr-1 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarTodayIcon sx={{ fontSize: 12 }} className="mr-1 flex-shrink-0" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <PersonIcon sx={{ fontSize: 12 }} className="mr-1 flex-shrink-0" />
                        <span>{item.engineer}</span>
                      </div>
                      
                      {/* Category-specific info */}
                      {item.category === 'project' && item.itemCount && (
                        <div className="text-xs text-blue-600">
                          {item.itemCount} associated items
                        </div>
                      )}
                      {(item.category === 'document' || item.category === 'drawing') && (
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{item.fileType} • {item.size}</span>
                          {item.scale && <span>Scale: {item.scale}</span>}
                        </div>
                      )}
                      {item.category === 'borehole' && (
                        <div className="text-xs text-orange-600">
                          Depth: {item.depth}
                        </div>
                      )}
                      {item.projectRef && (
                        <div className="text-xs text-gray-500">
                          Project: {item.projectRef}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Map Container */}
        <div className="flex-1 relative bg-gray-200">
          <MapView />
          
          {/* Map Controls */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-2">
            <div className="space-y-2">
              <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
                Fit All Items
              </button>
              <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
                Toggle Layers
              </button>
              <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
                Satellite View
              </button>
            </div>
          </div>

          {/* Improved Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
            <h4 className="font-medium text-gray-900 mb-3">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <ApartmentIcon size={16} className="text-blue-600" />
                <span className="text-sm text-gray-700">Project Sites</span>
              </div>
              <div className="flex items-center space-x-2">
                <LayersIcon size={16} className="text-orange-600" />
                <span className="text-sm text-gray-700">Borehole Locations</span>
              </div>
              <div className="flex items-center space-x-2">
                <DescriptionIcon size={16} className="text-green-600" />
                <span className="text-sm text-gray-700">Document Locations</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArchitectureIcon size={16} className="text-purple-600" />
                <span className="text-sm text-gray-700">Drawing Coverage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel - Item Details */}
        {selectedItem && (
          <div className="h-64 bg-white border-t">
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {getItemIcon(selectedItem.category, 24)}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedItem.name}</h2>
                    <p className="text-sm text-gray-600">{selectedItem.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <VisibilityIcon sx={{ fontSize: 16 }} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <DownloadIcon sx={{ fontSize: 16 }} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <EditIcon sx={{ fontSize: 16 }} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Type:</span> {getCategoryBadge(selectedItem.category)}</div>
                    <div><span className="text-gray-600">Location:</span> {selectedItem.location}</div>
                    <div><span className="text-gray-600">Date:</span> {selectedItem.date}</div>
                    <div><span className="text-gray-600">Engineer:</span> {selectedItem.engineer}</div>
                    {selectedItem.projectRef && (
                      <div><span className="text-gray-600">Project:</span> {selectedItem.projectRef}</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Technical Details</h3>
                  <div className="space-y-2 text-sm">
                    {selectedItem.fileType && (
                      <div><span className="text-gray-600">File Type:</span> {selectedItem.fileType}</div>
                    )}
                    {selectedItem.size && (
                      <div><span className="text-gray-600">File Size:</span> {selectedItem.size}</div>
                    )}
                    {selectedItem.scale && (
                      <div><span className="text-gray-600">Scale:</span> {selectedItem.scale}</div>
                    )}
                    {selectedItem.depth && (
                      <div><span className="text-gray-600">Depth:</span> {selectedItem.depth}</div>
                    )}
                    {selectedItem.status && (
                      <div><span className="text-gray-600">Status:</span> {selectedItem.status}</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Actions</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-800">
                      View on Map
                    </button>
                    <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-800">
                      Open File
                    </button>
                    <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-800">
                      Show Related Items
                    </button>
                    <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-800">
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}