"use client";

import React from 'react';
import UiButton from './UiButton';

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt?: string;
}

interface AdvocateTableItemProps {
  advocate: Advocate;
  onShowModal: (advocate: Advocate) => void;
}

const AdvocateTableItem: React.FC<AdvocateTableItemProps> = ({ advocate, onShowModal }) => {
  // Format phone number to (xxx) xxx-xxxx
  const formatPhoneNumber = (phone: number): string => {
    const phoneStr = phone.toString();
    if (phoneStr.length === 10) {
      return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
    }
    return phoneStr; // Return as-is if not 10 digits
  };

  // Sort specialties alphabetically
  const sortedSpecialties = [...advocate.specialties].sort();

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm w-32 truncate">{advocate.firstName}</td>
      <td className="px-4 py-3 text-sm w-32 truncate">{advocate.lastName}</td>
      <td className="px-4 py-3 text-sm w-24 truncate">{advocate.city}</td>
      <td className="px-4 py-3 text-sm font-medium w-20 truncate">{advocate.degree}</td>
      <td className="px-4 py-3 text-sm w-72">
        <div className="max-w-full">
          {sortedSpecialties.map((specialty, index) => (
            <span
              key={index}
              className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
            >
              {specialty}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-center w-24">{advocate.yearsOfExperience} Years</td>
      <td className="px-4 py-3 text-sm w-32 truncate">{formatPhoneNumber(advocate.phoneNumber)}</td>
      <td className="px-4 py-3 text-sm w-28">
        <UiButton
          buttonLabel="ABOUT"
          buttonCallback={() => onShowModal(advocate)}
          variant="highlight"
          size="sm"
        />
      </td>
    </tr>
  );
};

export default AdvocateTableItem;