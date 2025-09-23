'use client'

import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import { availabilityCategories, defaultLayer } from '@/constants/geospatial';
import { getCategoryBadge } from '@/utils/geospatial';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ItemsList({filteredItems, selectedItem, setSelectedItem, layerVisibility, setLayerVisibility}) {
    return (
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y">
            {defaultLayer.map(layer => (
              <Accordion key={layer.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                    <div className='flex flex-row justify-between w-full'>
                        <span>{layer.name}</span>
                        <input type="checkbox" checked={layerVisibility[layer.id]} onChange={() => {
                            setLayerVisibility(prev => ({
                                ...prev,
                                [layer.id]: !prev[layer.id]
                            }))
                        }} />
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {filteredItems[layer.id] && filteredItems[layer.id].map((item) => {
                        const categoryParams = availabilityCategories[item.attributes.availability] || { label: 'Unknown', icon: PersonIcon };

                        return (
                        <div
                            key={layer.id + item.attributes.id}
                            onClick={() => setSelectedItem({layer: layer.id, id: item.attributes.id})}
                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${(selectedItem?.id === item.attributes.id && selectedItem?.layer === layer.id) ? 'bg-blue-50 border-r-2 border-blue-500' : ''}`}
                        >
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <categoryParams.icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    {item.attributes.boreholeRef && 
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="font-medium text-gray-900 truncate">{item.attributes.boreholeRef}</h3>
                                        {getCategoryBadge(layer.id)}
                                    </div>}
                                    
                                    {item.attributes.description && <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.attributes.description}</p>}
                                    
                                    <div className="space-y-1">
                                        {item.attributes.date && <div className="flex items-center text-xs text-gray-500">
                                            <CalendarTodayIcon sx={{ fontSize: 12 }} className="mr-1 flex-shrink-0" />
                                            <span>{item.attributes.date}</span>
                                        </div>}
                                        {item.attributes.createdBy && <div className="flex items-center text-xs text-gray-500">
                                            <PersonIcon sx={{ fontSize: 12 }} className="mr-1 flex-shrink-0" />
                                            <span>{item.attributes.createdBy}</span>
                                        </div>}
                                        
                                        {/* Category-specific info */}
                                        {item.attributes.category === 'project' && item.itemCount && (
                                            <div className="text-xs text-blue-600">
                                            {item.attributes.itemCount} associated items
                                            </div>
                                        )}
                                        {(item.attributes.category === 'document' || item.attributes.category === 'drawing') && (
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{item.attributes.fileType} • {item.attributes.size}</span>
                                            {item.attributes.scale && <span>Scale: {item.attributes.scale}</span>}
                                            </div>
                                        )}
                                        {item.attributes.category === 'borehole' && item.attributes.depth && (
                                            <div className="text-xs text-orange-600">
                                            Depth: {item.attributes.depth}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        )})}
                </AccordionDetails>
            </Accordion>
            ))}
            
          </div>
        </div>
    )
}