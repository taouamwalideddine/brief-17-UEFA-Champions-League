'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMatchesStore } from '../../store/matchesStore';
import LoadingSpinner from '../../components/LoadingSpinner';
import Image from "next/image";

export default function MatchDetailsPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const { getMatchById, fetchMatchDetails, loading, error } = useMatchesStore();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Try to get match from store first
      const matchFromStore = getMatchById(parseInt(id, 10));

      if (matchFromStore) {
        setMatch(matchFromStore);

        // Fetch additional details if needed
        const details = await fetchMatchDetails(parseInt(id, 10));
        if (details) {
          setMatch(prev => ({ ...prev, ...details }));
        }
      } else {
        // If match not in store, fetch it directly
        const details = await fetchMatchDetails(parseInt(id, 10));
        if (details) {
          setMatch(details);
        } else {
          // If match not found, show error
          setMatch(null);
        }
      }
    };

    fetchData();
  }, [id, getMatchById, fetchMatchDetails]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-fadeIn">
            <LoadingSpinner message="Loading match details..." size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-destructive/10 border border-destructive text-destructive px-6 py-4 rounded-lg shadow-sm mb-6 animate-slideInUp">
            <h1 className="text-xl font-bold mb-2">Error loading match details</h1>
            <p className="mb-4">{error}</p>
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all"
            >
              ← Back to matches
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-lg shadow-sm mb-6 animate-slideInUp">
            <h1 className="text-xl font-bold mb-2">Match not found</h1>
            <p className="mb-4">The requested match could not be found. It may have been removed or the ID is incorrect.</p>
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all"
            >
              ← Back to matches
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if the match is in the past
  const now = new Date();
  const matchTime = new Date(match.startTimestamp * 1000);
  const isPastMatch = matchTime < now;

  // Normalize status values from different API formats
  const normalizedStatus = 
    // Handle various "finished" status values
    match.status === 'finished' || match.status === 'ended' || match.status === 'completed' || 
    (isPastMatch && match.status !== 'inprogress' && match.status !== 'canceled') ? 'finished' :
    // Handle various "in progress" status values
    match.status === 'inprogress' || match.status === 'live' || match.status === 'ongoing' ? 'inprogress' :
    // Default to upcoming
    'upcoming';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-fadeIn">
          <button 
            onClick={handleBack}
            className="mb-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all group"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> Back to matches
          </button>
        </div>

        <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden animate-slideInUp">
          {/* Match header */}
          <div className="bg-primary text-primary-foreground p-8">
            <h1 className="text-2xl font-bold text-center mb-6 animate-fadeIn">
              {match.homeTeam?.name || 'Home Team'} vs {match.awayTeam?.name || 'Away Team'}
            </h1>
            <div className="flex justify-center items-center text-4xl font-bold animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <div className="text-center w-1/3 transition-all hover:scale-110">
                <p>{match.homeTeam?.name || 'Home Team'}</p>
              </div>
              <div className="text-center w-1/3">
                {normalizedStatus === 'finished' || normalizedStatus === 'inprogress' ? (
                  <p className={normalizedStatus === 'inprogress' ? 'animate-pulse' : ''}>
                    {match.homeScore?.current || 0} - {match.awayScore?.current || 0}
                    {normalizedStatus === 'inprogress' && <span className="ml-2 text-sm">LIVE</span>}
                  </p>
                ) : (
                  <p>vs</p>
                )}
              </div>
              <div className="text-center w-1/3 transition-all hover:scale-110">
                <p>{match.awayTeam?.name || 'Away Team'}</p>
              </div>
            </div>
          </div>

          {/* Match details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column */}
              <div className="animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Match Information</h2>
                <div className="space-y-3 mt-4">
                  <p className="flex justify-between items-center transition-all hover:bg-muted p-2 rounded-md">
                    <span className="font-medium text-muted-foreground">Date:</span> 
                    <span>{new Date(match.startTimestamp * 1000).toLocaleDateString()}</span>
                  </p>
                  <p className="flex justify-between items-center transition-all hover:bg-muted p-2 rounded-md">
                    <span className="font-medium text-muted-foreground">Time:</span> 
                    <span>{new Date(match.startTimestamp * 1000).toLocaleTimeString()}</span>
                  </p>
                  <p className="flex justify-between items-center transition-all hover:bg-muted p-2 rounded-md">
                    <span className="font-medium text-muted-foreground">Stadium:</span> 
                    <span>{match.venue?.name || 'TBD'}</span>
                  </p>
                  <p className="flex justify-between items-center transition-all hover:bg-muted p-2 rounded-md">
                    <span className="font-medium text-muted-foreground">Referee:</span> 
                    <span>{match.referee?.name || 'TBD'}</span>
                  </p>
                  <p className="flex justify-between items-center transition-all hover:bg-muted p-2 rounded-md">
                    <span className="font-medium text-muted-foreground">Status:</span> 
                    <span className={
                      normalizedStatus === 'inprogress' 
                        ? 'text-green-600 font-medium' 
                        : normalizedStatus === 'finished' 
                          ? 'text-blue-600 font-medium' 
                          : 'text-orange-600 font-medium'
                    }>
                      {normalizedStatus === 'finished' ? 'Completed' : normalizedStatus === 'inprogress' ? 'In Progress' : 'Upcoming'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="animate-slideInUp" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Man of the Match</h2>
                {match.manOfTheMatch ? (
                  <div className="flex items-center space-x-4 mt-4 p-4 bg-secondary/50 rounded-lg transition-all hover:bg-secondary">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-md overflow-hidden">
                      {match.manOfTheMatch.imageUrl ? (
                        <Image
                          src={match.manOfTheMatch.imageUrl} 
                          alt={match.manOfTheMatch.name} 
                          className="w-full h-full rounded-full object-cover transition-transform hover:scale-110"
                        />
                      ) : (
                        <span className="text-2xl">👤</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{match.manOfTheMatch?.name || 'Player'}</p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-muted-foreground italic">Not available</p>
                )}
              </div>
            </div>

            {/* Match events */}
            {match.events && match.events.length > 0 && (
              <div className="mt-10 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Match Events</h2>
                <div className="border rounded-lg overflow-hidden shadow-sm mt-4">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Player</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Team</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {match.events.map((event, index) => (
                        <tr key={index} className="transition-colors hover:bg-muted/50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{event.minute || '0'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{event.type || 'Unknown'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{event.player || 'Unknown'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{event.team || 'Unknown'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Match statistics */}
            {match.statistics && (
              <div className="mt-10 animate-slideInUp" style={{ animationDelay: '0.5s' }}>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Match Statistics</h2>
                <div className="space-y-6 mt-4">
                  {Object.entries(match.statistics).map(([key, value], index) => (
                    <div key={key} className="flex items-center group">
                      <div className="w-1/3 text-right pr-4 font-medium transition-all group-hover:text-primary">{value?.home || 0}</div>
                      <div className="w-1/3">
                        <div className="text-center text-sm text-muted-foreground mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden shadow-sm">
                          <div 
                            className="h-full bg-primary transition-all duration-1000" 
                            style={{ 
                              width: `${((value?.home || 0) / ((value?.home || 0) + (value?.away || 0) || 1)) * 100}%`,
                              float: 'left',
                              transitionDelay: `${index * 0.1}s`
                            }}
                          ></div>
                          <div 
                            className="h-full bg-destructive transition-all duration-1000" 
                            style={{ 
                              width: `${((value?.away || 0) / ((value?.home || 0) + (value?.away || 0) || 1)) * 100}%`,
                              float: 'right',
                              transitionDelay: `${index * 0.1}s`
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-1/3 pl-4 font-medium transition-all group-hover:text-destructive">{value?.away || 0}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
