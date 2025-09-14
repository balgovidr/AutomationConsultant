'use client'

import CloseIcon from '@mui/icons-material/Close';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 h-screen max-h-screen">
      <div className="flex h-screen max-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
        <div className="relative flex flex-col bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-3/4 overflow-y-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <div className="flex p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;