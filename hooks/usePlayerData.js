
    import React, { useState, useEffect, useCallback } from 'react';

    const PLAYER_DATA_KEY = 'rockTriviaPlayers';

    export const usePlayerData = () => {
      const [players, setPlayers] = useState([]);
      const [currentUser, setCurrentUser] = useState(null);

      useEffect(() => {
        try {
          const storedData = localStorage.getItem(PLAYER_DATA_KEY);
          if (storedData) {
            setPlayers(JSON.parse(storedData));
          }
        } catch (error) {
          console.error("Failed to load player data from localStorage:", error);
          setPlayers([]); // Reset to empty array on error
        }
      }, []);

      const loginUser = useCallback((name, email) => {
        if (!name || !email) {
            console.error("Name and email are required to login.");
            return { success: false, message: "Name and email are required." };
        }

        const userData = { name, email, id: Date.now().toString() }; // Simple unique ID
        setCurrentUser(userData);
        // Do not save to leaderboard yet, only on game completion
        console.log("User logged in:", userData.name);
         // Generate discount code (example)
        const discountCode = `ROCKON15-${userData.id.slice(-4)}`; // Simple example
        return { success: true, user: userData, discountCode };
      }, []);

      const savePlayerScore = useCallback((user, score) => {
        if (!user || typeof score !== 'number') {
            console.error("User data and score are required to save.");
            return;
        }

        const completionTime = new Date().toISOString();
        const newPlayerEntry = { ...user, score, completionTime };

        setPlayers(prevPlayers => {
            const updatedPlayers = [...prevPlayers, newPlayerEntry]
              .sort((a, b) => {
                // Sort by score descending, then by time ascending
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return new Date(a.completionTime) - new Date(b.completionTime);
              });

            try {
              localStorage.setItem(PLAYER_DATA_KEY, JSON.stringify(updatedPlayers));
            } catch (error) {
              console.error("Failed to save player data to localStorage:", error);
              // Optionally handle storage error (e.g., quota exceeded)
            }
            return updatedPlayers;
        });
         console.log("Score saved for:", user.name, score);
      }, []);

      const getLeaderboard = useCallback((limit = 3) => {
        return players.slice(0, limit);
      }, [players]);

      const getAllPlayers = useCallback(() => {
          // This would be for the admin panel - requires authentication in a real app
          // For now, just returns all data from localStorage
          return players;
      }, [players]);


      return {
        players,
        currentUser,
        loginUser,
        savePlayerScore,
        getLeaderboard,
        getAllPlayers, // For potential admin use
      };
    };
  