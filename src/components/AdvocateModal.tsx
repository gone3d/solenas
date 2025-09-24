"use client";

import React from "react";
import UiButton from "./UiButton";
import { Advocate, AdvocateModalProps } from "../data";
import { formatPhoneNumber } from "../utils/utils";
import { Phone, X } from "lucide-react";

const AdvocateModal: React.FC<AdvocateModalProps> = ({
  advocate,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !advocate) return null;

  // Sort specialties alphabetically
  const sortedSpecialties = [...advocate.specialties].sort();

  // Generate placeholder avatar based on initials
  const initials = `${advocate.firstName.charAt(0)}${advocate.lastName.charAt(
    0
  )}`;

  // Generic bio content based on degree and experience
  const generateBio = (): string => {
    const degreeDescriptions = {
      MD: "medical doctor with extensive clinical experience",
      PhD: "healthcare professional with advanced research expertise",
      MSW: "licensed social worker with specialized healthcare training",
    };

    const experienceLevel =
      advocate.yearsOfExperience >= 10
        ? "seasoned"
        : advocate.yearsOfExperience >= 5
        ? "experienced"
        : "dedicated";

    const degreeDesc =
      degreeDescriptions[advocate.degree as keyof typeof degreeDescriptions] ||
      "healthcare professional";

    return `${advocate.firstName} is a ${experienceLevel} ${degreeDesc} based in ${advocate.city}. With ${advocate.yearsOfExperience} years of experience in healthcare advocacy, ${advocate.firstName} specializes in helping patients navigate complex healthcare systems and ensuring they receive the best possible care. ${advocate.firstName} is committed to providing personalized support and guidance to help patients make informed decisions about their health.`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-900 font-mollie-glaston">
            Advocate Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-start space-x-6 mb-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                {initials}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {advocate.firstName} {advocate.lastName}, {advocate.degree}
              </h3>
              <p className="text-gray-600 mb-2">{advocate.city}</p>
              <p className="text-sm text-gray-500 mb-3">
                {advocate.yearsOfExperience} Years of Experience
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {formatPhoneNumber(advocate.phoneNumber)}
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 font-mollie-glaston">
              About
            </h4>
            <p className="text-gray-700 leading-relaxed">{generateBio()}</p>
          </div>

          {/* Specialties Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 font-mollie-glaston">
              Specialties
            </h4>
            <div className="flex flex-wrap gap-2">
              {sortedSpecialties.map((specialty, index) => (
                <span
                  key={index}
                  className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Credentials Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 font-mollie-glaston">
              Credentials & Experience
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Degree:</span>
                  <span className="ml-2 text-gray-600">{advocate.degree}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Experience:</span>
                  <span className="ml-2 text-gray-600">
                    {advocate.yearsOfExperience} Years
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-600">{advocate.city}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Member Since:
                  </span>
                  <span className="ml-2 text-gray-600">
                    {advocate.createdAt
                      ? new Date(advocate.createdAt).getFullYear()
                      : "2023"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-green-900 mb-2 font-mollie-glaston">
              Ready to Connect?
            </h4>
            <p className="text-green-700 text-sm mb-4">
              Contact {advocate.firstName} to learn more about how they can help
              you navigate your healthcare journey.
            </p>
            <div className="flex justify-center">
              <UiButton
                buttonLabel="Schedule Consultation"
                buttonCallback={() =>
                  console.log("Schedule consultation clicked")
                }
                variant="highlight"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvocateModal;
