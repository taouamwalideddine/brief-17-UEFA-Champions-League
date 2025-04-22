'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * DateFilter component for filtering matches by date
 * @param {Object} props - Component props
 * @param {string} props.selectedDate - Currently selected date in YYYY-MM-DD format
 * @param {Function} props.onDateChange - Function to call when date changes
 * @returns {JSX.Element} - DateFilter component
 */
export default function DateFilter({ selectedDate, onDateChange }) {
  const [dateInput, setDateInput] = useState(selectedDate);
  
  // Convert YYYY-MM-DD to a more readable format
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Handle date change
  const handleDateChange = (e) => {
    setDateInput(e.target.value);
  };
  
  // Apply the date filter
  const applyFilter = () => {
    onDateChange(dateInput);
  };
  
  // Navigate to previous day
  const goToPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    const newDate = date.toISOString().split('T')[0];
    setDateInput(newDate);
    onDateChange(newDate);
  };
  
  // Navigate to next day
  const goToNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    const newDate = date.toISOString().split('T')[0];
    setDateInput(newDate);
    onDateChange(newDate);
  };
  
  return (
    <div className="mb-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-card rounded-lg shadow-sm border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-5 w-5" />
          <span>Match Date:</span>
        </div>
        
        <div className="flex items-center gap-2 flex-1">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToPreviousDay}
            aria-label="Previous day"
            className="group"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Button>
          
          <div className="flex-1 flex items-center gap-2">
            <input
              type="date"
              value={dateInput}
              onChange={handleDateChange}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={applyFilter}
              className="whitespace-nowrap"
            >
              Apply Filter
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToNextDay}
            aria-label="Next day"
            className="group"
          >
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="text-sm font-medium">
          {formatDisplayDate(selectedDate)}
        </div>
      </div>
    </div>
  );
}