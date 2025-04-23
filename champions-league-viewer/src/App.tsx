import { useEffect, useState } from "react";
import axios from "axios";

interface Team {
  name: string;
}

interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  startTime: number;
  manOfTheMatch?: string; // Optional for now
}

function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 2;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          "https://api.sofascore.com/api/v1/sport/football/scheduled-events/2025-04-15"
        );
        const events = response.data.events;

        const formattedMatches = events.map((event: any) => ({
          id: event.id,
          homeTeam: {
            name: event.homeTeam.name,
          },
          awayTeam: {
            name: event.awayTeam.name,
          },
          startTime: event.startTimestamp,
          manOfTheMatch: event.manOfTheMatch?.player?.name || "TBD",
        }));

        setMatches(formattedMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Champions League - Quarter Finals 2024/2025
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {currentMatches.map((match) => (
          <div key={match.id} className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold text-center mb-4">
              {match.homeTeam.name} vs {match.awayTeam.name}
            </h2>
            <p className="text-center text-gray-600 mb-2">
              Date: {new Date(match.startTime * 1000).toLocaleString()}
            </p>
            <p className="text-center font-medium text-blue-600">
              Man of the Match: {match.manOfTheMatch}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({
          length: Math.ceil(matches.length / matchesPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-blue-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
