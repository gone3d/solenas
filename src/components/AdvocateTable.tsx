"use client";

import React from "react";
import AdvocateTableItem from "./AdvocateTableItem";
import { Advocate, AdvocateTableProps } from "../data";

const AdvocateTable: React.FC<AdvocateTableProps> = ({
  advocates,
  className = "",
  onShowModal,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      {/* Table container with fixed header and scrollable body */}
      <div className="flex flex-col h-full">
        {/* Fixed header */}
        <div className="border-b border-gray-200 bg-gray-50">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-28" />
              <col className="w-28" />
              <col className="w-36" />
              <col className="w-16" />
              <col className="w-64" />
              <col className="w-20" />
              <col className="w-28" />
              <col className="w-24" />
            </colgroup>
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Degree
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialties
                </th>
                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable body - takes up all available space */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-28" />
              <col className="w-28" />
              <col className="w-36" />
              <col className="w-16" />
              <col className="w-64" />
              <col className="w-20" />
              <col className="w-28" />
              <col className="w-24" />
            </colgroup>
            <tbody className="bg-white divide-y divide-gray-200">
              {advocates.length > 0 ? (
                advocates.map((advocate) => (
                  <AdvocateTableItem
                    key={advocate.id}
                    advocate={advocate}
                    onShowModal={onShowModal}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No advocates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Results count footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
          <p className="text-xs text-gray-600">
            Showing {advocates.length} advocate
            {advocates.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvocateTable;
