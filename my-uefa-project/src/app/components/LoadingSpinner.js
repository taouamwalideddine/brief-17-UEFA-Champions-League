'use client';

import { Spinner } from '@/components/ui/spinner';

/**
 * LoadingSpinner component for displaying loading states
 * @param {Object} props - Component props
 * @param {string} props.message - Optional loading message
 * @param {string} props.size - Size of the spinner (sm, md, lg)
 * @returns {JSX.Element} - LoadingSpinner component
 */
export default function LoadingSpinner({ message = 'Loading...', size = 'md' }) {
  // Map component size to shadcn size
  const spinnerSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';

  return (
    <div className="flex justify-center items-center min-h-[200px] animate-fadeIn">
      <div className="text-center">
        {message && (
          <h2 className="text-xl font-semibold mb-6 animate-pulse">
            {message}
          </h2>
        )}
        <div className="relative">
          <Spinner size={spinnerSize} className="mx-auto" />
          <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-primary/20"></div>
        </div>
      </div>
    </div>
  );
}
