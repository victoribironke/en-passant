export const getPlayerGamesArchives = async (username: string) => {
  try {
    const response = await fetch(`https://api.chess.com/pub/player/${username}/games/archives`);

    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }

    const data = await response.json();
    return { data: data.archives, error: null };
  } catch (error) {
    console.log("Error fetching games:", error);
    return { data: null, error: "An error occurred while fetching games." };
  }
};

export const getGameDetails = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch game details");
    }

    const data = await response.json();
    return { data: data.games, error: null };
  } catch (error) {
    console.log("Error fetching game details:", error);
    return { data: null, error: "An error occurred while fetching game details." };
  }
};
