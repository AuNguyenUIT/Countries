/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "./style.scss";

Pagination.propTypes = {
  totalRecords:PropTypes.number,
  pageLimit:PropTypes.number,
  pageNeighbours:PropTypes.number,
  showPage:PropTypes.number,onPageChanged:PropTypes.func
};
Pagination.propTypesDefault = {
  totalRecords: null,
  pageLimit: 20,
  pageNeighbours: 0,
  showPage: 1,
  onPageChanged: null
};
const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

function Pagination({ totalRecords, pageLimit, pageNeighbours,onPageChanged,showPage }) {
  pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
  totalRecords = typeof totalRecords === "number" ? totalRecords : 0;
  pageNeighbours =
    typeof pageNeighbours === "number"
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;
  let totalPages = Math.ceil(totalRecords / pageLimit);
 let [currentPage, setCurrentPage]=useState(1);


  useEffect(() => {
    gotoPage(1);
  }, []);
  const gotoPage = (page) => {
    //  setCurrentPage( Math.max(0, Math.min(page, totalPages)))
    setCurrentPage(page);
    // const paginationData = {
    //   currentPage,
    //   totalPages: totalPages,
    //   pageLimit: pageLimit,
    //   totalRecords: totalRecords,
    // };
    // setCurrentPage({ currentPage })
    onPageChanged(page);
  
  };



  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };
 


  const handleMoveLeft = evt => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };
 
  const handleMoveRight = evt => {
    evt.preventDefault();
   gotoPage(currentPage + pageNeighbours * 2 + 1);
  };



  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  if (!totalRecords) return null;
  if (totalPages === 0) return null;
  const pages = fetchPageNumbers();

  return (
    <div>
      <div className="info">
        <h2 className="total-countries">{totalRecords} Countries</h2>
        <h2>|</h2>
        <h2 className="current-page">{showPage}/{totalPages}</h2>
      </div>
      <nav aria-label="Countries Pagination">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index} className="page-item">
                  <a
                    className="page-link"
                    href="#!"
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index} className="page-item">
                  <a
                    className="page-link"
                    href="#!"
                    aria-label="Next"
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              );

            return (
              <li
                key={index}
                className={`page-item${showPage === page ? " active" : ""}`}
              >
                <a
                  className="page-link"
                  href="#!"
                  onClick={(e) => handleClick(page, e)}
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

    </div>

  );
}

export default Pagination;
