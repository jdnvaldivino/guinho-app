import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
        checked ? 'bg-bpass-yellow' : 'bg-gray-400'
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      ></span>
    </button>
  );
};

export default ToggleSwitch;
