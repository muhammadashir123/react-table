"use client";
import React, { useMemo, useState } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "../Components/columns"; // Update the path to your columns file

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [filterInput, setFilterInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all_columns");
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 },
    },
    useFilters,
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
    if (selectedFilter === "all_columns") {
      // If "All Columns" is selected, filter data in all columns
      setFilter("first_name", value);
      setFilter("last_name", value);
      setFilter("country", value);
      setFilter("Phone", value);
    } else {
      // Filter data in the selected column
      setFilter(selectedFilter, value);
    }
    setFilterInput(value);
  };
  return (
    <div>
      <div className="flex justify-end gap-5 w-full px-8 ">
        <select
          className="relative text-gray-600 py-2 px-6"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="all_columns">All Columns</option>
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
                <th key={index} {...column.getHeaderProps()}>
                  {column.render("Header")}
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
