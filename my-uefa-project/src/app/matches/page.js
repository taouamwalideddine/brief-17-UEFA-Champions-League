'use client';

import { useEffect, useState } from 'react';
import { useMatchesStore } from '../store/matchesStore';
import MatchCard from '../components/MatchCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import DateFilter from '../components/DateFilter';

export default function MatchesPage() {
  const { matches, loading, error, fetchMatches, selectedDate, setSelectedDate } = useMatchesStore();
  const [currentPage, setCurrentPage] = useState(0);
  const matchesPerPage = 2;

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches, selectedDate]);

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(0); // Reset to first page when date changes
  };

  // Calculate pagination
  const totalPages = Math.ceil((matches?.length || 0) / matchesPerPage);
  const paginatedMatches = matches?.slice(
    currentPage * matchesPerPage,
    (currentPage + 1) * matchesPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center animate-fadeIn">UEFA Champions League Quarter Finals</h1>
          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <LoadingSpinner message="Loading matches..." size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center animate-fadeIn">UEFA Champions League Quarter Finals</h1>
          <div className="bg-destructive/10 border border-destructive text-destructive px-6 py-4 rounded-lg shadow-sm animate-slideInUp" role="alert">
            <strong className="font-bold text-lg block mb-2">Error Occurred</strong>
            <span className="block">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center animate-fadeIn">UEFA Champions League Quarter Finals</h1>

        <DateFilter 
          selectedDate={selectedDate} 
          onDateChange={handleDateChange} 
        />

        {matches?.length === 0 ? (
          <p className="text-center animate-fadeIn">No matches found for this date.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 mb-8">
              {paginatedMatches?.map((match, index) => (
                <div key={match.id} className="animate-slideInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <MatchCard match={match} />
                </div>
              ))}
            </div>

            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </>
        )}
      </div>
    </div>
  );
}
