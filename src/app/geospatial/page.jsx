'use client'

import React, { useState, useEffect } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DescriptionIcon from '@mui/icons-material/Description';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import LayersIcon from '@mui/icons-material/LayersOutlined';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@/components/Button';
import AddIcon from '@mui/icons-material/AddOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ItemsList from '@/components/geospatial/ItemsList';
import { availabilityCategories, defaultLayer } from '@/constants/geospatial';
import { getCategoryBadge } from '@/utils/geospatial';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Add } from '@mui/icons-material';
import MapView from '@/components/geospatial/MapView';
import AddNewItemForm from '@/components/geospatial/AddNewItemForm';
import { Modal } from '@mui/material';


export default function GISPlatformLayout() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState(() => {
    const defaultLayerVisibility = {}
    defaultLayer.map(layer => defaultLayerVisibility[layer.id] = layer.visibleByDefault);
    return defaultLayerVisibility;
  });
  const [allItems, setAllItems] = useLocalStorage('geospatialItems', {});
  const [filteredItems, setFilteredItems] = useState({});
  const [placing, setPlacing] = useState(false);
  const [pickedLocation, setPickedLocation] = useState([]);
  const [showItemForm, setShowItemForm] = useState(false);
  const [layerDefinitions, setLayerDefinitions] = useState(defaultLayer);

  // Sample data with clear categorization
  // const allItems = [
  //   // Projects
  //   {
  //     id: 'p1',
  //     category: 'all',
  //     name: "Bridge Foundation Study",
  //     location: "Downtown Bridge Site",
  //     date: "2024-03-15",
  //     engineer: "Sarah Chen",
  //     status: "Completed",
  //     type: "Geotechnical",
  //     coordinates: [51.5074, -0.1278],
  //     itemCount: 8,
  //     description: "Comprehensive geotechnical analysis for new bridge construction"
  //   },
  //   {
  //     id: 'p2',
  //     category: 'all',
  //     name: "High-Rise Building Analysis",
  //     location: "Commercial District",
  //     date: "2024-01-20",
  //     engineer: "Mike Johnson",
  //     status: "Active",
  //     type: "Structural",
  //     coordinates: [51.5155, -0.0922],
  //     itemCount: 12,
  //     description: "Structural assessment for 40-story commercial building"
  //   },
  //   // Documents
  //   {
  //     id: 'd1',
  //     category: 'all',
  //     name: "Soil Analysis Report",
  //     location: "Downtown Bridge Site",
  //     date: "2024-03-15",
  //     engineer: "Sarah Chen",
  //     projectRef: "Bridge Foundation Study",
  //     fileType: "PDF",
  //     size: "2.4 MB",
  //     coordinates: [51.5074, -0.1278],
  //     description: "Laboratory soil testing results and recommendations"
  //   },
  //   {
  //     id: 'd2',
  //     category: 'all',
  //     name: "Environmental Impact Assessment",
  //     location: "Commercial District", 
  //     date: "2024-02-10",
  //     engineer: "Lisa Park",
  //     projectRef: "High-Rise Building Analysis",
  //     fileType: "PDF",
  //     size: "5.8 MB",
  //     coordinates: [51.5155, -0.0922],
  //     description: "Environmental compliance report and mitigation measures"
  //   },
  //   // Drawings
  //   {
  //     id: 'dr1',
  //     category: 'all',
  //     name: "Site Survey Plan",
  //     location: "Downtown Bridge Site",
  //     date: "2024-03-10",
  //     engineer: "Tom Wilson",
  //     projectRef: "Bridge Foundation Study",
  //     fileType: "DWG",
  //     size: "1.8 MB",
  //     scale: "1:500",
  //     coordinates: [51.5074, -0.1278],
  //     description: "Topographic survey with existing utilities"
  //   },
  //   {
  //     id: 'dr2',
  //     category: 'all',
  //     name: "Foundation Details",
  //     location: "Commercial District",
  //     date: "2024-02-15",
  //     engineer: "Anna Rodriguez",
  //     projectRef: "High-Rise Building Analysis",
  //     fileType: "DWG",
  //     size: "3.2 MB",
  //     scale: "1:100",
  //     coordinates: [51.5155, -0.0922],
  //     description: "Detailed foundation design and reinforcement layout"
  //   },
  //   // Boreholes
  //   {
  //     id: 'b1',
  //     category: 'all',
  //     name: "BH-001",
  //     location: "Downtown Bridge Site",
  //     date: "2024-03-12",
  //     engineer: "Sarah Chen",
  //     projectRef: "Bridge Foundation Study",
  //     depth: "15.0m",
  //     coordinates: [51.5074, -0.1278],
  //     description: "Primary borehole at north pier location"
  //   },
  //   {
  //     id: 'b2',
  //     category: 'all',
  //     name: "BH-002", 
  //     location: "Downtown Bridge Site",
  //     date: "2024-03-13",
  //     engineer: "Sarah Chen",
  //     projectRef: "Bridge Foundation Study",
  //     depth: "18.5m",
  //     coordinates: [51.5076, -0.1275],
  //     description: "Secondary borehole at south pier location"
  //   }
  // ];

  useEffect(() => {
    const filteredItemsByLayer = {};
    Object.keys(layerVisibility).map(layerId => {
      if (layerVisibility[layerId]) {
        filteredItemsByLayer[layerId] = allItems[layerId];
      }
    })

    setFilteredItems(filteredItemsByLayer);
  }, [layerVisibility, allItems]);

  useEffect(() => {
    if (pickedLocation.length === 2) {
      setShowItemForm(true);
    }
  }, [pickedLocation]);

  const getItemIcon = (category, size = 20) => {
    switch(category) {
      case 'project': return <ApartmentIcon size={size} className="text-blue-600" />;
      case 'document': return <DescriptionIcon size={size} className="text-green-600" />;
      case 'drawing': return <ArchitectureIcon size={size} className="text-purple-600" />;
      case 'borehole': return <LayersIcon size={size} className="text-orange-600" />;
      default: return <FolderOpenIcon size={size} className="text-gray-600" />;
    }
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
            {/* <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-md"
            >
              <FilterAltIcon sx={{ fontSize: 20 }} />
              <span>Filters</span>
            </button> */}
            <Button onClick={() => setPlacing(true)} >
              <AddIcon sx={{ fontSize: 20 }}/>
              Add new item
            </Button>
            {placing && <span>Click a point on the map</span>}
          </div>
        </div>

        {/* Filter Panel */}
        {/* {showFilters && (
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
        )} */}

        {/* Category Tabs */}
        <div className="flex-shrink-0 border-b border-gray-400 bg-gray-50">
          <nav className="flex flex-row">
            {Object.keys(availabilityCategories).map(categoryId => {
              const categoryParams = availabilityCategories[categoryId];

              return (
              <button
                key={categoryId}
                onClick={() => setSelectedCategory(categoryId)}
                className={`flex items-center space-x-1 px-2 py-3 text-sm font-medium border-b-2 transition-colors flex-1 cursor-pointer justify-center ${
                  selectedCategory === categoryId
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                <categoryParams.icon sx={{ fontSize: 16 }} />
                <span>{categoryParams.label}</span>
              </button>
            )})}
          </nav>
        </div>

        {/* Items List */}
        <ItemsList filteredItems={filteredItems} selectedItem={selectedItem} setSelectedItem={setSelectedItem} layerVisibility={layerVisibility} setLayerVisibility={setLayerVisibility} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Map Container */}
        <div className={"flex-1 relative bg-gray-200 " + (placing ? 'cursor-crosshair' : '')}>
          <MapView placing={placing} setPlacing={setPlacing} pickedLocation={pickedLocation} setPickedLocation={setPickedLocation} setShowItemForm={setShowItemForm} />
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

      {showItemForm && (
        <Modal open={showItemForm} onClose={() => {setShowItemForm(false); setPickedLocation([])}}>
          <AddNewItemForm layerDefinitions={layerDefinitions} setShowItemForm={setShowItemForm} allItems={allItems} setAllItems={setAllItems} pickedLocation={pickedLocation} />
        </Modal>
      )}
    </div>
  );
}