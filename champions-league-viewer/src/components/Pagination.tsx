interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
  }: PaginationProps) {
    return (
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-blue-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  }
  