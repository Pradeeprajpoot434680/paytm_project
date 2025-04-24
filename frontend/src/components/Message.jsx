import React from 'react';

const Message = ({ message, type = 'error' }) => {
   
    let messageClass;
    switch (type) {
        case 'success':
            messageClass = 'bg-green-200 text-green-800';
            break;
        case 'error':
            messageClass = 'bg-red-200 text-red-800';
            break;
        case 'info':
            messageClass = 'bg-blue-100 text-blue-800';
            break;
        default:
            messageClass = 'bg-gray-100 text-gray-800';
            break;
    }

    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-md w-auto max-w-md ${messageClass}`}>
            <h5 className="text-sm font-medium text-center">
                {message}
            </h5>
        </div>
    );
};

export default Message;
