/**
 * API service for fetching football match data from SofaScore
 */

// Base URL for SofaScore API
const API_BASE_URL = 'https://api.sofascore.com/api/v1';

/**
 * Fetches scheduled football events for a specific date
 * @param {string} date - Date in YYYY-MM-DD format (defaults to 2025-04-15 for Champions League quarter finals)
 * @returns {Promise<Array>} - Array of match data
 */
export const fetchMatches = async (date = '2025-04-15') => {
  try {
    // Make the actual API call
    const response = await fetch(`${API_BASE_URL}/sport/football/scheduled-events/${date}`);
    if (!response.ok) throw new Error('Failed to fetch matches');
    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw new Error('Failed to fetch matches: ' + error.message);
  }
};

/**
 * Fetches detailed information for a specific match
 * @param {number} matchId - The ID of the match
 * @returns {Promise<Object>} - Detailed match data
 */
export const fetchMatchDetails = async (matchId) => {
  try {
    // Make the actual API call
    const response = await fetch(`${API_BASE_URL}/event/${matchId}`);
    if (!response.ok) throw new Error('Failed to fetch match details');
    const data = await response.json();

    // Check if the API returned a valid match
    if (!data || !data.event) {
      console.warn('Match not found in API response');
      return null;
    }

    // Create a data object with the API response
    const matchData = { ...data.event };

    // Try to fetch additional data like lineups and incidents
    try {
      const lineupResponse = await fetch(`${API_BASE_URL}/event/${matchId}/lineups`);
      if (lineupResponse.ok) {
        const lineupData = await lineupResponse.json();
        matchData.lineups = lineupData;
      }
    } catch (lineupError) {
      console.warn('Failed to fetch lineups:', lineupError);
    }

    try {
      const incidentsResponse = await fetch(`${API_BASE_URL}/event/${matchId}/incidents`);
      if (incidentsResponse.ok) {
        const incidentsData = await incidentsResponse.json();
        matchData.incidents = incidentsData;
      }
    } catch (incidentsError) {
      console.warn('Failed to fetch incidents:', incidentsError);
    }

    // Determine man of the match based on available data
    matchData.manOfTheMatch = determineManOfTheMatch(matchData);

    return matchData;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw new Error('Failed to fetch match details: ' + error.message);
  }
};

/**
 * Determines the man of the match based on available data
 * @param {Object} matchData - Match data from the API
 * @returns {Object|null} - Man of the match data or null if not available
 */
const determineManOfTheMatch = (matchData) => {
  // If the match is not finished, return null
  if (matchData.status?.type !== 'finished' && 
      matchData.status?.description !== 'Finished' && 
      matchData.status?.code !== 100) {
    return null;
  }

  // Try to find the player with the most goals
  const goalScorers = {};
  const playerTeams = {};

  // Check if we have incidents data
  if (matchData.incidents && Array.isArray(matchData.incidents.incidents)) {
    matchData.incidents.incidents.forEach(incident => {
      if (incident.incidentType === 'goal' || incident.incidentType === 'ownGoal') {
        const playerId = incident.player?.id;
        if (playerId) {
          goalScorers[playerId] = (goalScorers[playerId] || 0) + 1;
          playerTeams[playerId] = {
            name: incident.player?.name || 'Unknown Player',
            team: incident.team?.name || 'Unknown Team',
            imageUrl: `https://api.sofascore.app/api/v1/player/${playerId}/image`
          };
        }
      }
    });
  }

  // If no goal scorers found, check if we have events data
  if (Object.keys(goalScorers).length === 0 && matchData.events && Array.isArray(matchData.events)) {
    matchData.events.forEach(event => {
      if (event.type === 'Goal') {
        const playerName = event.player;
        if (playerName) {
          // Since we don't have player IDs, use names as keys
          goalScorers[playerName] = (goalScorers[playerName] || 0) + 1;
          playerTeams[playerName] = {
            name: playerName,
            team: event.team || 'Unknown Team'
          };
        }
      }
    });
  }

  // Find the player with the most goals
  let bestPlayer = null;
  let maxGoals = 0;

  Object.keys(goalScorers).forEach(playerId => {
    if (goalScorers[playerId] > maxGoals) {
      maxGoals = goalScorers[playerId];
      bestPlayer = playerTeams[playerId];
    }
  });

  // If we found a best player, return their data
  if (bestPlayer) {
    return bestPlayer;
  }

  // If no goal scorers found, return null
  return null;
};

// Mock data functions have been removed as we're now using real API data only
