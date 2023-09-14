"use client";
import React, { useMemo, useState } from "react";
import { useTable, useFilters, usePagination, useSortBy } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "../Components/columns"; // Update the path to your columns file

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [filterInput, setFilterInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 },
    },

    useFilters,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    setFilter,
    pageOptions,
    state: { pageIndex, pageSize },
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = tableInstance;

  // const handleFilterChange = (e) => {
  //   const value = e.target.value || "";
  //   setFilter("first_name", value);
  //   setFilterInput(value);
  // };
  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    if (selectedFilter === "country") {
      setFilter("country", value);
      console.log(setFilter);
    } else if (selectedFilter === "Phone") {
      setFilter("Phone", value);
    } else if (selectedFilter === "first_name") {
      setFilter("first_name", value);
    } else if (selectedFilter === "last_name") {
      setFilter("last_name", value);
    } else {
      // Filter data in the selected column
      setFilter(selectedFilter, value);
    }
    setFilterInput(value);
  };
  return (
    <div>
      <div className="flex justify-end gap-5 w-full px-8 ">
        {/* <div class="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value="country"
              class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Country
            </label>
          </div> */}
        {/* <div class="flex items-center">
            <input
              id="checked-checkbox"
              type="checkbox"
              value="Phone"
              class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="checked-checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Phone
            </label>
          </div> */}
        <select
          className="relative text-gray-600 py-2 px-6"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="country">Country</option>
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="Phone">Phone</option>
        </select>
        <input
          className="relative text-gray-600 py-2 px-6"
          type="text"
          placeholder="Search..."
          value={filterInput}
          onChange={handleFilterChange}
        />
      </div>

      <table className="mt-8" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())} // Enable sorting for the column
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <div className="pagination flex justify-center gap-5">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <p className="bg-green-500 text-white p-2 rounded cursor-pointer">
            Previous
          </p>
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          className="bg-green-500 text-white p-2 rounded cursor-pointer"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
