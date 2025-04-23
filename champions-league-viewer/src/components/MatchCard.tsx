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

const MatchCard: React.FC<MatchProps> = ({ match }) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-4 shadow-md w-full max-w-md">
      <h2 className="text-md font-bold text-center">{match.date}</h2>
      <div className="flex items-center justify-between my-4">
        <div className="flex flex-col items-center">
          <div className="text-sm font-bold">{match.homeTeam}</div>
          <div className="text-xs">{match.homeLogo}</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">{match.homeScore} - {match.awayScore}</div>
          <div className="text-xs text-gray-400">Agg: {match.aggregateScore}</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-sm font-bold">{match.awayTeam}</div>
          <div className="text-xs">{match.awayLogo}</div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 mb-2">{match.status}</span>
        <p className="text-sm">Winner: {match.winner}</p>
        <p className="text-xs text-blue-300">Qualified: {match.qualified}</p>
      </div>
    </div>
  );
};

export default MatchCard;
