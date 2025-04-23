import React from 'react';

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
  };
}

const MatchCard: React.FC<{ match: MatchProps['match'] }> = ({ match }) => {
  return (
    <div className="bg-slate-800 text-white rounded-2xl p-6 shadow-lg w-full max-w-md flex flex-col items-center space-y-4">
      <h2 className="text-lg font-bold">{match.date}</h2>

      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-center">
          <img src={match.homeLogo} alt={match.homeTeam} className="w-12 h-12 object-cover rounded-full" />
          <span className="mt-2 text-sm">{match.homeTeam}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{match.homeScore} - {match.awayScore}</div>
          <div className="text-xs text-gray-400">Agg: {match.aggregateScore}</div>
        </div>

        <div className="flex flex-col items-center">
          <img src={match.awayLogo} alt={match.awayTeam} className="w-12 h-12 object-cover rounded-full" />
          <span className="mt-2 text-sm">{match.awayTeam}</span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-1">
        <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">{match.status}</span>
        <p className="text-sm">Winner: {match.winner}</p>
        <p className="text-xs text-blue-300">Qualified: {match.qualified}</p>
      </div>
    </div>
  );
};

export default MatchCard;
    