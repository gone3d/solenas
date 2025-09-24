"use client";

import { useEffect, useState } from "react";
import Search from "../components/Search";
import AdvocateTable from "../components/AdvocateTable";
import AdvocateModal from "../components/AdvocateModal";
import advocateService from "../services/advocateService";
import { Advocate } from "../data";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [selectedAdvocate, setSelectedAdvocate] = useState<Advocate | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const advocatesData = await advocateService.getAdvocates();
        setAdvocates(advocatesData);
        setFilteredAdvocates(advocatesData);
      } catch (error) {
        console.error("Failed to fetch advocates:", error);
      }
    };

    fetchAdvocates();
  }, []);

  const handleFilter = (filteredAdvocates: Advocate[]) => {
    setFilteredAdvocates(filteredAdvocates);
  };

  const handleShowModal = (advocate: Advocate) => {
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
      <Search advocates={advocates} onFilter={handleFilter} />

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
