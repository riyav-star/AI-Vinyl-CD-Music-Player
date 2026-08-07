const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

export const askAIDJ = async (message) => {
  const response = await fetch(
    `${API_URL}/api/agent/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message
      })
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to communicate with AI DJ"
    );
  }

  return response.json();
};

export const getSongs = async () => {
  const response = await fetch(
    `${API_URL}/api/music`
  );

  if (!response.ok) {
    throw new Error("Failed to load songs");
  }

  return response.json();
};

export const createPlaylist = async (
  mood,
  preferences
) => {
  const response = await fetch(
    `${API_URL}/api/playlist`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mood,
        preferences
      })
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create playlist"
    );
  }

  return response.json();
};