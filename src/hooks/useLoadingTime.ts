import { useState, useEffect } from "react";

export const useLoadingTime = () => {
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  const startTracking = () => {
    setLoadingStartTime(Date.now());
  };

  const stopTracking = () => {
    setLoadingStartTime(null);
  };

  const getActualLoadingTime = () => {
    return loadingStartTime ? Date.now() - loadingStartTime : 0;
  };

  return {
    startTracking,
    stopTracking,
    getActualLoadingTime,
  };
};
