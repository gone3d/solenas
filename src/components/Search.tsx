"use client";

import React, { useState } from "react";
import UiButton from "./UiButton";
import { Advocate, SearchProps } from "../data";
import advocateService from "../services/advocateService";

const Search: React.FC<SearchProps> = ({ advocates, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocateService.searchAdvocates(
      advocates,
      newSearchTerm
    );
    onFilter(filteredAdvocates);
  };

  const onReset = () => {
    setSearchTerm("");
    onFilter(advocates);
  };

  return (
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
            value={searchTerm}
            placeholder="Search by name, city, degree, or specialty..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={onChange}
          />
        </div>
        <UiButton
          buttonLabel="Reset Search"
          buttonCallback={onReset}
          variant="outline"
          size="md"
        />
      </div>

      {searchTerm && (
        <div className="mt-4 text-sm text-gray-600">
          Searching for: <span className="font-medium">{searchTerm}</span>
        </div>
      )}
    </div>
  );
};

export default Search;
