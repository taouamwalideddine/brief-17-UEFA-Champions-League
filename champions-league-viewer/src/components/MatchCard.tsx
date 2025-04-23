interface PaginationProps {
    matchesPerPage: number;
    totalMatches: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
  }
  
  const Pagination = ({ matchesPerPage, totalMatches, paginate, currentPage }: PaginationProps) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalMatches / matchesPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center mt-8 space-x-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`w-10 h-10 rounded-full ${currentPage === number ? 'bg-blue-600' : 'bg-blue-800'} hover:bg-blue-600 text-white`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  