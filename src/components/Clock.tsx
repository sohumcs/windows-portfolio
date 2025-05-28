
import React, { useState, useEffect } from 'react';

interface ClockProps {
  isDark: boolean;
}

export const Clock: React.FC<ClockProps> = ({ isDark }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-white text-sm font-medium">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};
