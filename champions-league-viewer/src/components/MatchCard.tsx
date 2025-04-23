import { Link } from 'react-router-dom';

interface MatchProps {
  match: {
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
}

const MatchCard = ({ match }: MatchProps) => {
  return (
    <div className="bg-blue-800 rounded-2xl shadow-md overflow-hidden">
      <div className="bg-blue-700 p-4 text-center font-semibold">
        UEFA Champions League - Quarterfinals
        <div className="text-sm mt-1">{match.date}</div>
      </div>
      <div className="p-6 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center">
            <div className="bg-pink-900 text-white w-10 h-10 rounded-full flex items-center justify-center mr-2">
              {match.homeLogo}
            </div>
            <div>{match.homeTeam}</div>
          </div>
          <div className="text-3xl font-bold">{match.homeScore} - {match.awayScore}</div>
          <div className="flex items-center">
            <div className="bg-indigo-900 text-white w-10 h-10 rounded-full flex items-center justify-center mr-2">
              {match.awayLogo}
            </div>
            <div>{match.awayTeam}</div>
          </div>
        </div>
        <div className="text-sm mb-2">Agg: {match.aggregateScore}</div>
        <div className="bg-green-500 rounded-full px-4 py-1 text-xs font-semibold mb-2">{match.status}</div>
        <div className="text-sm">Winner: {match.winner}</div>
        <div className="text-sm text-blue-300">Qualified: {match.qualified}</div>
      </div>
      <Link to={`/match/${match.id}`} className="block bg-blue-900 hover:bg-blue-800 text-center py-2 text-sm font-semibold">
        Click for match details
      </Link>
    </div>
  );
};

export default MatchCard;
