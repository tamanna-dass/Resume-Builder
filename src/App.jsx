import React, { useState, useEffect } from 'react';
import Builder from './pages/Builder';

function App() {
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isExpired) {
    return (
      <div className="timeout-overlay">
        <p>Resume submission time has expired.</p>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>Resume Builder</h1>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <span>Time Remaining: {formatTime(timeLeft)}</span>
          <span className="last-edited" id="last-edited"></span>
        </div>
      </nav>
      <Builder />
    </div>
  );
}

export default App;
