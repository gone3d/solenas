"use client";

import React from 'react';
import { UiButtonProps } from '../data/interfaces';

const UiButton: React.FC<UiButtonProps> = ({
  buttonLabel,
  buttonCallback,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-green-700 text-white hover:bg-green-800 focus:ring-green-500 disabled:bg-gray-300 disabled:text-gray-500',
    secondary: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 disabled:bg-gray-300 disabled:text-gray-500',
    outline: 'border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white focus:ring-green-500 disabled:border-gray-300 disabled:text-gray-300',
    highlight: ''
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantStyles = variant === 'highlight' ? {
    color: '#000',
    backgroundColor: '#d7a13b',
    backgroundImage: 'linear-gradient(45deg, #deb260, #d39009)',
    border: 'none',
    borderRadius: '6px',
    transition: 'background-image 0.2s ease'
  } : {};

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'highlight') {
      e.currentTarget.style.backgroundImage = 'linear-gradient(45deg, #3f937c, #d4e2dd4d 100%, #deb260)';
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'highlight') {
      e.currentTarget.style.backgroundImage = 'linear-gradient(45deg, #deb260, #d39009)';
    }
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  return (
    <button
      className={classes}
      style={variantStyles}
      onClick={buttonCallback}
      disabled={disabled}
      type="button"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {buttonLabel}
    </button>
  );
};

export default UiButton;