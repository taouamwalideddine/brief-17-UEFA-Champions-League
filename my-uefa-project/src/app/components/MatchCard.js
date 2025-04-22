'use client';

import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

/**
 * MatchCard component for displaying match information
 * @param {Object} match - Match data
 * @returns {JSX.Element} - MatchCard component
 */
export default function MatchCard({ match }) {
  if (!match) return null;

  const { id, homeTeam, awayTeam, homeScore, awayScore, status, startTimestamp, venue } = match;

  // Format date and time
  const matchDate = new Date(startTimestamp * 1000);
  const formattedDate = matchDate.toLocaleDateString();
  const formattedTime = matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Check if the match is in the past
  const now = new Date();
  const matchTime = new Date(startTimestamp * 1000);
  const isPastMatch = matchTime < now;

  // Normalize status values from different API formats
  const normalizedStatus = 
    // Handle various "finished" status values
    status === 'finished' || status === 'ended' || status === 'completed' || 
    (isPastMatch && status !== 'inprogress' && status !== 'canceled') ? 'finished' :
    // Handle various "in progress" status values
    status === 'inprogress' || status === 'live' || status === 'ongoing' ? 'inprogress' :
    // Default to upcoming
    'upcoming';

  // Determine score display based on normalized status
  const scoreDisplay = normalizedStatus === 'finished' || normalizedStatus === 'inprogress'
    ? `${homeScore.current} - ${awayScore.current}${normalizedStatus === 'inprogress' ? ' (Live)' : ''}`
    : 'Upcoming';

  // Determine status color based on normalized status
  const statusColor = normalizedStatus === 'inprogress' 
    ? 'text-green-600' 
    : normalizedStatus === 'finished' 
      ? 'text-blue-600' 
      : 'text-orange-600';

  return (
    <Link href={`/matches/${id}`} className="block transform transition-transform duration-300 hover:scale-[1.02]">
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-lg">{homeTeam.name}</span>
              <span className="text-xl font-light opacity-70">vs</span>
              <span className="font-semibold text-lg">{awayTeam.name}</span>
            </div>
            <div className={`text-lg font-bold ${statusColor}`}>{scoreDisplay}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="flex justify-between">
              <span>Date:</span> 
              <span className="font-medium">{formattedDate}</span>
            </p>
            <p className="flex justify-between">
              <span>Time:</span> 
              <span className="font-medium">{formattedTime}</span>
            </p>
            <p className="flex justify-between">
              <span>Stadium:</span> 
              <span className="font-medium">{venue?.name || 'TBD'}</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="pt-2 border-t text-xs text-muted-foreground">
          <div className="w-full flex justify-end">
            <span className={`${statusColor} font-medium`}>
              {normalizedStatus === 'inprogress' ? 'Live' : normalizedStatus === 'finished' ? 'Completed' : 'Scheduled'}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
