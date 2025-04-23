import { useParams } from 'react-router-dom';

const MatchDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Match Details</h1>
      <p className="text-lg">Coming soon for Match ID: {id}</p>
    </div>
  );
};

export default MatchDetails;
