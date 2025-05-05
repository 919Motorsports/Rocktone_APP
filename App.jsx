
    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { AnimatePresence } from 'framer-motion';
    import LoginPage from '@/pages/LoginPage';
    import TriviaPage from '@/pages/TriviaPage';
    import ScorePage from '@/pages/ScorePage';
    import LeaderboardPage from '@/pages/LeaderboardPage';
    import AdminPage from '@/pages/AdminPage'; // Placeholder admin page
    import { Toaster } from '@/components/ui/toaster';
    import { usePlayerData } from '@/hooks/usePlayerData';
    import VideoBackground from '@/components/layout/VideoBackground';


    function App() {
        const PlayerDataProvider = ({ children }) => {
            const playerData = usePlayerData(); // Initialize the hook
            // You might want to wrap this in a context provider if needed in deeply nested components
            // For now, passing it down or letting pages call the hook directly is fine.
            return React.cloneElement(children, { playerData });
        };


      return (
          <>
            <VideoBackground />
              <Router>
                 {/* We need a way to provide the player data context if we use React Context */}
                 {/* For now, pages will call usePlayerData() directly */}
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/trivia" element={<TriviaPage />} />
                    <Route path="/score" element={<ScorePage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/admin-backstage" element={<AdminPage />} /> {/* Unsecured Admin Route */}
                    {/* Add other routes as needed */}
                  </Routes>
                </AnimatePresence>
              </Router>
             <Toaster />
          </>
      );
    }

    export default App;
  