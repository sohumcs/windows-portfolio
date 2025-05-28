
import React, { useState, useEffect } from 'react';
import { Desktop } from '../components/Desktop';
import { LoadingScreen } from '../components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate Windows boot sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Desktop />;
};

export default Index;
