import React from 'react';

interface PaginationProps {
  matchesPerPage: number;
  totalMatches: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ matchesPerPage, totalMatches, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalMatches / matchesPerPage);
  const pageNumbers = [];

  const pageWindow = 2;  
  const startPage = Math.max(1, currentPage - pageWindow);
  const endPage = Math.min(totalPages, currentPage + pageWindow);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6 space-x-2 items-center">
      {/* previous button */}
      {currentPage > 1 && (
        <button
          onClick={() => paginate(currentPage - 1)}
          className="w-8 h-8 rounded-full bg-slate-800 text-gray-300 hover:bg-blue-500 hover:text-white"
        >
          &lt;
        </button>
      )}

      {/* page numbers */}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`w-8 h-8 rounded-full ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-slate-800 text-gray-300 hover:bg-blue-500 hover:text-white'}`}
        >
          {number}
        </button>
      ))}

      {/* next button */}
      {currentPage < totalPages && (
        <button
          onClick={() => paginate(currentPage + 1)}
          className="w-8 h-8 rounded-full bg-slate-800 text-gray-300 hover:bg-blue-500 hover:text-white"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
