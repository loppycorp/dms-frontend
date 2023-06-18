import React from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function Items({ currentItems }: { currentItems: number[] }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item}>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

export function Pagination({
  itemsPerPage,
  totalItems,
  onPageChange,
  currentPageNumber,
  className,
}: {
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (event: { selected: number }) => void;
  currentPageNumber?: any;
  className?: string;
}) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className={`${className}`}>
      <ReactPaginate
        breakLabel="..."
        previousLabel={<ChevronLeftIcon className="w-5 h-5" />}
        nextLabel={<ChevronRightIcon className="w-5 h-5" />}
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        initialPage={
          currentPageNumber ? parseInt(currentPageNumber) - 1 : undefined
        }
        className="react-paginate"
      />
    </div>
  );
}
