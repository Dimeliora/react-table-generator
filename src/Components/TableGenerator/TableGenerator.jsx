import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import PageSizeSelector from "./PageSizeSelector";
import Filter from "./Filter";
import Table from "./Table";
import Pagination from "./Pagination";

import s from "./TableGenerator.module.scss";

const PAGE_SIZES = [10, 15, 20, 30, 50];

const TableGenerator = ({ data }) => {
  const [itemsCountPerPage, setItemsCountPerPage] = useState(PAGE_SIZES[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortByColumn, setSortByColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTemplate, setSearchTemplate] = useState("");

  const handlePageSelect = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeSelect = useCallback((pageSize) => {
    setItemsCountPerPage(pageSize);
    setCurrentPage(0);
  }, []);

  const handleColumnSort = useCallback(
    (column) => {
      if (sortByColumn === column) {
        const direction = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(direction);
      } else {
        setSortByColumn(column);
        setSortDirection("asc");
      }
    },
    [sortByColumn, sortDirection]
  );

  const handleFilterChange = useCallback((template) => {
    setSearchTemplate(template);
    setCurrentPage(0);
  }, []);

  const filterItems = (items) => {
    const filterValue = searchTemplate.trim();

    if (filterValue === "") {
      return items;
    }

    return items.filter((item) =>
      Object.values(item).some((itemValue) =>
        String(itemValue).toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  };

  const getItemsPerPage = (data) => {
    const from = currentPage * itemsCountPerPage;
    const to = from + itemsCountPerPage;
    return data.slice(from, to);
  };

  const sortItemsByColumn = (items) =>
    _.orderBy(items, sortByColumn, sortDirection);

  const filteredItems = filterItems(data);
  const itemsPerPage = getItemsPerPage(filteredItems);
  const itemsToShow = sortItemsByColumn(itemsPerPage);

  const totalPages = Math.ceil(filteredItems.length / itemsCountPerPage);
  const isItemsToShow = itemsToShow.length > 0;

  return (
    <div className={s.tableGenerator}>
      <div className={s.tableGeneratorControl}>
        <PageSizeSelector
          pageSizes={PAGE_SIZES}
          currentPageSize={itemsCountPerPage}
          onPageSizeSelect={handlePageSizeSelect}
          disabled={!isItemsToShow}
        />
        <Filter onFilterChange={handleFilterChange} />
      </div>

      {isItemsToShow ? (
        <>
          <Table
            data={itemsToShow}
            classname={s.tableStyles}
            onColumnSort={handleColumnSort}
            sortByColumn={sortByColumn}
            sortDirection={sortDirection}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageSelect={handlePageSelect}
          />
        </>
      ) : (
        <div className={s.tableGeneratorNotification}>
          <h2>No items to show</h2>
        </div>
      )}
    </div>
  );
};

TableGenerator.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableGenerator;
