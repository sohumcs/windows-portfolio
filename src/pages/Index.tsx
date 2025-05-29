
import React, { useState, useEffect } from 'react';
import { Desktop } from '../components/Desktop';
import { LoadingScreen } from '../components/LoadingScreen';
import { LoginScreen } from '../components/LoginScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <Desktop />;
};

export default Index;
