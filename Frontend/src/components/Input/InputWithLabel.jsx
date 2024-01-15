import React from 'react';

const InputWithLabel = ({ label, type = 'text', register, registerKey, errorMessage, defaultValue, disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div>
        <input
          type={type}
          defaultValue={defaultValue}
          disabled={disabled}
          className="disabled:bg-gray-200 disabled:cursor-not-allowed block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...(typeof register === 'function' && register(registerKey))}
        />
        <div className="text-red-500">{errorMessage}</div>
      </div>
    </div>
  );
};

export default InputWithLabel;
