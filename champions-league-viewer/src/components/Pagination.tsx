import React from 'react';

interface PaginationProps {
  matchesPerPage: number;
  totalMatches: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ matchesPerPage, totalMatches, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMatches / matchesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`w-8 h-8 rounded-full ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-slate-800 text-gray-300'}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
