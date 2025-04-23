// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
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

const Home = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 2;

  useEffect(() => {
    axios.get('https://api.sofascore.com/api/v1/sport/football/scheduled-events/2025-04-15')
      .then((res) => {
        const events = res.data.events;
        const formattedMatches = events.map((event: any) => ({
          id: event.id,
          date: new Date(event.startTimestamp * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          homeTeam: event.homeTeam.name,
          awayTeam: event.awayTeam.name,
          homeScore: event.homeScore.display,
          awayScore: event.awayScore.display,
          homeLogo: event.homeTeam.shortName, 
          awayLogo: event.awayTeam.shortName,
          status: event.status.description,
          winner: event.winnerCode === 1 ? event.homeTeam.name : (event.winnerCode === 2 ? event.awayTeam.name : 'Draw'),
          aggregateScore: event.aggregateWinnerCode !== null ? `${event.aggregateScore.home} - ${event.aggregateScore.away}` : '-',
          qualified: event.aggregateWinnerCode === 1 ? event.homeTeam.name : (event.aggregateWinnerCode === 2 ? event.awayTeam.name : 'N/A'),
        }));
        setMatches(formattedMatches);
      })
      .catch((err) => console.error(err));
  }, []);
  

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-4">UEFA Champions League</h1>
      <h2 className="text-2xl font-semibold text-center mb-8">Quarter Finals 2024/2025</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {currentMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
      <Pagination 
        matchesPerPage={matchesPerPage} 
        totalMatches={matches.length} 
        paginate={setCurrentPage} 
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
