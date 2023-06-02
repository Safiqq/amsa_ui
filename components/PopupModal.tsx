import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

const PopupModal = ({ type, message, onClose, day }: { type: String, message: String, onClose: () => void, day: number }) => {
  const icon = (type === 'success') ? <CheckCircleIcon className="w-10 h-10" /> : ((type === 'error') ? <XCircleIcon className="w-10 h-10" /> : "");
  const WA_GROUP_URLS = ["CaOaJwT3G8ODAUXj8epfaS", "FuutRLa9UV9EbKxOBlgz3y", "FNUaYChMQbI1B49Cumjcsf"];

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${type === 'success' ? 'text-green-500' : 'text-red-500'} sm:mx-0 sm:h-10 sm:w-10`}>
              {icon}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{(type === 'success') ? 'Success' : ((type === 'error') ? 'Error' : '')}</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
                {type === "success" && message.includes("Registrasi berhasil") && <p className='text-sm text-gray-500'>Link WA: <a href={`https://chat.whatsapp.com/${WA_GROUP_URLS[day]}`} className='cursor-pointer'>https://chat.whatsapp.com/${WA_GROUP_URLS[day]}</a></p>}
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-base font-medium text-white hover:${type === 'success' ? 'bg-green-700' : 'bg-red-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${type === 'success' ? 'ring-green-500' : 'ring-red-500'} sm:ml-3 sm:w-auto sm:text-sm`}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PopupModal.propTypes = {
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopupModal;
