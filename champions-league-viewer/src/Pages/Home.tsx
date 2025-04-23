import React, { useEffect, useState } from 'react';
import MatchCard from '../components/MatchCard';
import Pagination from '../components/Pagination';

interface Match {
  id: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeLogo: string;
  awayLogo: string;
  status: string;
  winner: string;
  aggregateScore: string;
  qualified: string;
}

const Home: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 2;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('https://api.sofascore.com/api/v1/sport/football/scheduled-events/2025-04-15');
        const data = await response.json();
        
        const formattedMatches: Match[] = data.events.map((event: any) => ({
            id: event.id,
            date: new Date(event.startTimestamp * 1000).toLocaleDateString(),
            homeTeam: event.homeTeam.name,
            awayTeam: event.awayTeam.name,
            homeScore: event.homeScore?.display ?? 0,
            awayScore: event.awayScore?.display ?? 0,
            homeLogo: `https://api.sofascore.app/api/v1/team/${event.homeTeam.id}/image`,
            awayLogo: `https://api.sofascore.app/api/v1/team/${event.awayTeam.id}/image`,
            status: event.status.type,
            winner: event.winnerCode === 1 ? event.homeTeam.name : event.awayTeam.name,
            aggregateScore: '4 - 5', // Mock for now
            qualified: event.homeTeam.name, // Mock for now
          }));
          

        setMatches(formattedMatches);
      } catch (error) {
        console.error('Failed to fetch matches', error);
      }
    };

    fetchMatches();
  }, []);

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-2">UEFA Champions League</h1>
      <h2 className="text-2xl font-semibold text-center mb-8">Quarter Finals 2024/2025</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {currentMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      <Pagination
        matchesPerPage={matchesPerPage}
        totalMatches={matches.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
