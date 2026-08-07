export const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(
    seconds % 60
  );

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export const calculateProgress = (
  currentTime,
  duration
) => {
  if (!duration) return 0;

  return (currentTime / duration) * 100;
};