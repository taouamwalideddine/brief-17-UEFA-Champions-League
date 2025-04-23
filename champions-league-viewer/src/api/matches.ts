import axios from "axios";

export const fetchMatches = async () => {
  const response = await axios.get(
    "https://api.sofascore.com/api/v1/sport/football/scheduled-events/2025-04-15"
  );
  return response.data.events;
};
