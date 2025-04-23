interface MatchCardProps {
    homeTeamName: string;
    awayTeamName: string;
    startTime: number;
    manOfTheMatch: string;
  }
  
  export default function MatchCard({
    homeTeamName,
    awayTeamName,
    startTime,
    manOfTheMatch,
  }: MatchCardProps) {
    return (
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          {homeTeamName} vs {awayTeamName}
        </h2>
        <p className="text-center text-gray-600 mb-2">
          Date: {new Date(startTime * 1000).toLocaleString()}
        </p>
        <p className="text-center font-medium text-blue-600">
          Man of the Match: {manOfTheMatch}
        </p>
      </div>
    );
  }
  