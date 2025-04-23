import { useEffect, useState } from "react";
import { fetchMatches } from "../api/matches";
import MatchCard from "../components/MatchCard";
import Pagination from "../components/Pagination";

interface Team {
  name: string;
}

interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  startTime: number;
  manOfTheMatch: string;
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 2;

  useEffect(() => {
    const getMatches = async () => {
      try {
        const data = await fetchMatches();

        const formatted = data.map((event: any) => ({
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

        setMatches(formatted);
      } catch (error) {
        console.error("Error fetching matches", error);
      }
    };

    getMatches();
  }, []);

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  const totalPages = Math.ceil(matches.length / matchesPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Champions League - Quarter Finals 2024/2025
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {currentMatches.map((match) => (
          <MatchCard
            key={match.id}
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
            startTime={match.startTime}
            manOfTheMatch={match.manOfTheMatch}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
