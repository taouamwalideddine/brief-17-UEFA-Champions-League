'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination component for navigating between pages
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page index (0-based)
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Function to call when page changes
 * @returns {JSX.Element} - Pagination component
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8 animate-fadeIn">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        variant="outline"
        size="sm"
        className="group transition-all duration-300"
        aria-label="Previous page"
      >
        <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Previous
      </Button>

      <span className="flex items-center text-sm bg-secondary px-4 py-2 rounded-md">
        Page <span className="font-bold mx-1">{currentPage + 1}</span> of <span className="font-bold mx-1">{totalPages}</span>
      </span>

      <Button
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
        variant="outline"
        size="sm"
        className="group transition-all duration-300"
        aria-label="Next page"
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}
