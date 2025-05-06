
  import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from '@/pages/LoginPage';
import TriviaPage from '@/pages/TriviaPage';
import ScorePage from '@/pages/ScorePage';
import LeaderboardPage from '@/pages/LeaderboardPage';
import AdminPage from '@/pages/AdminPage';
import { Toaster } from '@/components/ui/toaster';
import { usePlayerData } from '@/hooks/usePlayerData';
import VideoBackground from '@/components/layout/VideoBackground';

function App() {
    const PlayerDataProvider = ({ children }) => {
        const playerData = usePlayerData();
        return React.cloneElement(children, { playerData });
    };

    return (
        <>
            <VideoBackground />

            {/* Spotify Embed */}
            <div className="w-full flex justify-center z-10 relative pt-2 px-4">
                <iframe
                    style={{ borderRadius: '12px' }}
                    src="https://open.spotify.com/embed/playlist/3EPykyYP5wG5xsOLIxROZS?utm_source=generator"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            </div>

            <Router>
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/trivia" element={<TriviaPage />} />
                        <Route path="/score" element={<ScorePage />} />
                        <Route path="/leaderboard" element={<LeaderboardPage />} />
                        <Route path="/admin-backstage" element={<AdminPage />} />
                    </Routes>
                </AnimatePresence>
            </Router>

            <Toaster />
        </>
    );
}

export default App;
  
