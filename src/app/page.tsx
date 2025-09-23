"use client";

import { useEffect, useState } from "react";
import UiButton from "../components/UiButton";
import AdvocateTable from "../components/AdvocateTable";
import AdvocateModal from "../components/AdvocateModal";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [selectedAdvocate, setSelectedAdvocate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  const handleShowModal = (advocate) => {
    setSelectedAdvocate(advocate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAdvocate(null);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-mollie-glaston">
          Solace Advocates
        </h1>

        <p className="text-lg text-gray-600 mb-4 font-mollie-glaston">
          Find healthcare advocates who can help you navigate your care
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Advocates
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, city, degree, or specialty..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={onChange}
            />
          </div>
          <UiButton
            buttonLabel="Reset Search"
            buttonCallback={onClick}
            variant="outline"
            size="md"
          />
        </div>

        {document.getElementById("search-term")?.innerHTML && (
          <div className="mt-4 text-sm text-gray-600">
            Searching for:{" "}
            <span className="font-medium" id="search-term"></span>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="h-[600px]">
        <AdvocateTable
          advocates={filteredAdvocates}
          className="h-full"
          onShowModal={handleShowModal}
        />
      </div>

      {/* Advocate Modal */}
      <AdvocateModal
        advocate={selectedAdvocate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
