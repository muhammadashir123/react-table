"use client";
import React, { useMemo, useState } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "../Components/columns"; // Update the path to your columns file

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [filterInput, setFilterInput] = useState("");
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

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("first_name", value);
    setFilterInput(value);
  };
  return (
    <div>
      <div className="flex justify-end gap-5 w-full px-8 ">
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
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
